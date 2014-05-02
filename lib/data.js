/**
/**
 * Created by ynosa on 14.04.14.
 */

define(['npm:underscore','npm:d3','npm:galaxy','HEcosystem/es6','HEcosystem/hecosystem.json!json'], function (underscore,d3,galaxy,es6,jsonData) {
//define(['npm:underscore', 'HEcosystem/hecosystem.json!'], function (underscore, data) {
    console.log("entering module data.js");
    var a=new es6.q();
//
//    var b=(x) -> x;


//    var json = galaxy.star(d3.json);
//
//
//    var r = yield json("hecosystem.json");
    //d3.json("hecosystem.json",function(json)
    //    {console.log(json)
    //    });


    var nodesEx,
        linkGroups,
        linksEx,
        nodesDictionary,
        _ = underscore;

    nodesEx = _(jsonData.nodes).map(function (node) {
        return _.extend(node,
            {svgClass: (_(jsonData.groups)
                .find(function (group) {
                    return group.id === node.group;
                }) || {svgClass: ""}).svgClass})
    });

    linkGroups = _.chain(jsonData.links).map(function (relationship) {
        return {type : relationship.type};
    }).uniq(function (obj){return obj.type}).value();

    nodesDictionary = _.object(_(jsonData.nodes).map(function (node) {
        return [node.id, node]
    }));

    linksEx = _.chain(jsonData.links).map(function (link,i) {
        return _.extend(link, {source: nodesDictionary[link.source],
            target: nodesDictionary[link.target],
            id: "link-id-" + i
        });
    }).value();


    console.log("exiting module data.js");

    var getData = function(filter) {

        var data =
        {
            nodeGroups: jsonData.groups,
            nodes: nodesEx,
            links: linksEx,
            linkGroups: linkGroups
        };

        if(filter)
        {
            var nodeGroupsObj = _(filter.getFilters()).chain().pairs().filter(function(groupPair){
                return groupPair[0].substr(0, filter.nodeGroupPrefix.length) == filter.nodeGroupPrefix;
            }).map(function(groupPair){ return [groupPair[0].substr(filter.nodeGroupPrefix.length,1000),groupPair[1]]}).object().value();

            var linkGroupObj = _(filter.getFilters()).chain().pairs().filter(function(groupPair){
                return groupPair[0].substr(0, filter.linkGroupPrefix.length) == filter.linkGroupPrefix;

            }).map(function(groupPair){ return [groupPair[0].substr(filter.linkGroupPrefix.length,1000),groupPair[1]]}).object().value();

            data =  {
                nodeGroups: _(data.nodeGroups).filter(function (group){ return nodeGroupsObj[group.id];}),
                nodes: _(data.nodes).filter(function (node) { return nodeGroupsObj[node.group]; }),
                links: _(data.links).filter(function (link) { return nodeGroupsObj[link.source.group] && nodeGroupsObj[link.target.group];})
                                 .filter(function (link) { return linkGroupObj[link.type];}),
                linkGroups: _(data.linkGroups).filter(function (linkGroup) {return linkGroupObj[linkGroup.type];})
            }
        }

        return data;
    }

    return {
        getData: getData
    }
});
