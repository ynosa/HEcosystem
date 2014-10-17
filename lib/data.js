/**
/**
 * Created by ynosa on 14.04.14.
 */

define(['npm:underscore','npm:d3','npm:galaxy','HEcosystem/es6','Resources/hecosystem.json!json'], function (underscore,d3,galaxy,es6,jsonData) {
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
        linkTypes,
        classificationOptions,
        nodesDictionary,
        _ = underscore;

    var getNodeClassificationOptions = function (node) {
        "use strict";

    }

    var generateGravity = function (data, groupLevels) {

        var getNodeClassificationAttribute = function (node, classificationAttribute) {
            var classificationValue = (node["classification"] || {})[classificationAttribute];
            if (_.isUndefined(classificationValue)) {
                return "undefined";
            } else if (_.isArray(classificationValue) && classificationValue.length > 0) {
                return classificationValue[0];
            } else {
                return classificationValue;
            }
        };
        var getGravityObjectForGroups = function (parentNode, nodes, groupLevelsIndex) {
            var groupingMassNodes, gravityObjectsForChildGroups, gravityLinks, joinedNodesAndLinks;

            var classificationAttribute = groupLevels[groupLevelsIndex];
            if (!classificationAttribute) {
                return {nodes: [], links: _(nodes).map(function (node) {
                    return {
                        id: "link-" + parentNode.id + "_" + node.id,
                        source: parentNode,
                        target: node,
                        level: groupLevelsIndex,
                        gravity: true
                    }
                })};
            }

            groupingMassNodes = _(nodes).chain().groupBy(function (node) {
                return getNodeClassificationAttribute(node, classificationAttribute);
            }).pairs().map(function (pair) {
                    return  {id: parentNode.id + "_" + pair[0], gravity: true, level: groupLevelsIndex + 1, children: pair[1]}
                }).value();

            gravityLinks = _(groupingMassNodes).map(function (node) {
                return {
                    id: "link-" + parentNode.id + "_" + node.id,
                    source: parentNode,
                    target: node,
                    level: groupLevelsIndex,
                    gravity: true
                };
            });

            gravityObjectsForChildGroups = _(groupingMassNodes).map(function (groupingNode) {
                return getGravityObjectForGroups(groupingNode, groupingNode.children, groupLevelsIndex + 1);
            });


//            _(gravityObjectsForChildGroups).invoke(function(object){ g})
            joinedNodesAndLinks = _(gravityObjectsForChildGroups).reduce(function (acc, nodesAndLinksObject) {
                console.log(acc);
                return {nodes: _.union(acc.nodes, nodesAndLinksObject.nodes), links: _.union(acc.links, nodesAndLinksObject.links)};
            }, {nodes: [], links: []});

            return {nodes: _.union(groupingMassNodes, joinedNodesAndLinks.nodes), links: _.union(gravityLinks, joinedNodesAndLinks.links)};
        };

        if (!groupLevels || (_.isArray(groupLevels) && groupLevels.length == 0))
        {
            return {mainNode: null, nodes: [], links: [] };
        }

        var mainNode = {id: "gravity-main", level: 0, gravity: true};
        var childrenNodesAndLinks = getGravityObjectForGroups(mainNode, data, 0);

        mainNode.children = childrenNodesAndLinks.nodes;

        return {mainNode: mainNode, nodes: childrenNodesAndLinks.nodes, links: childrenNodesAndLinks.links};
    };
    console.log("Start NodeEx");
    nodesEx = _.chain(jsonData.nodes).map(function (node) {
        var techClass = (node["classification"] || {})["technology"];
        var nodeGroup =  node.group || (_.isArray(techClass)?techClass[0]:techClass) || "undefined";
        var groupObj = _(jsonData.groups).find(function (group) {return group.id === nodeGroup;}) || {};
        var svgClass = node.svgClass || groupObj.svgClass || "";
        return _.extend(node, {svgClass: svgClass, group : nodeGroup});
    }).value();

    linkTypes = _.chain(jsonData.links).map(function (link) {
        return {type : link.type};
    }).uniq(function (link){return link.type}).map(function (nodeLinkType){
            var linkTypeObj = _(jsonData.linkGroups).find(function (linkType){ return linkType.type == nodeLinkType.type});
            return _.extend(nodeLinkType,linkTypeObj);
        })
      .value();

    classificationOptions = _.chain(jsonData.nodes).map(function(node){return _.pairs(node["classification"] || {});})
                                                   .flatten(true)
                                                   .map(function (pair) {
                                                        var options = _.isArray(pair[1])?pair[1]:[pair[1]];
                                                        return _(options).map(function (option) {return {classification: pair[0],option: option};
                                                   })})
                  .flatten(true)
        .uniq(function (classificationOption) {
          return classificationOption.classification + classificationOption.option;
        }).reduce(function (agg,link) {
           agg[link.classification] = _.union(agg[link.classification]||[],link.option);
           return agg;
        },{}).value();


    nodesDictionary = _.object(_(jsonData.nodes).map(function (node) {
        return [node.id, node]
    }));

    linksEx = _.chain(jsonData.links).map(function (link) {
        var linkTypeObj = _(linkTypes).find(function (linkType) {return linkType.type === link.type;}) ||{};
        var svgClass = link.svgClass || linkTypeObj.svgClass||"";
        return _.extend({},link, {
            source: nodesDictionary[link.source],
            target: nodesDictionary[link.target],
            source_id: link.source,
            target_id: link.target,
            id: "link-id-" + link.source + "-" +link.target,
            svgClass: svgClass
        });
    }).value();


    console.log("exiting module data.js");

    var getData = function(query) {

        var data =
        {
            nodeGroups: classificationOptions,
            nodes: nodesEx,
            links: linksEx,
            linkGroups: linkTypes
        };

        if(query)
        {
            var nodeClassObj = _(query.getFilters()).chain().pairs().filter(function(groupPair){
                return groupPair[0].substr(0, query.nodeGroupPrefix.length) == query.nodeGroupPrefix;
            }).map(function(groupPair){ return [groupPair[0].substr(query.nodeGroupPrefix.length,1000),groupPair[1]]}).object().value();

            var linkGroupObj = _(query.getFilters()).chain().pairs().filter(function(groupPair){
                return groupPair[0].substr(0, query.linkGroupPrefix.length) == query.linkGroupPrefix;

            }).map(function(groupPair){ return [groupPair[0].substr(query.linkGroupPrefix.length,1000),groupPair[1]]}).object().value();

            data =  {
                nodeGroups: _(data.nodeGroups).filter(function (group){ return nodeClassObj[group.id];}),
                nodes: _(data.nodes).filter(function (node) { return node.classification.pairs }),
                links: _(data.links).filter(function (link) { return nodeClassObj[link.source.group] && nodeClassObj[link.target.group];})
                                 .filter(function (link) { return linkGroupObj[link.type];}),
                linkGroups: _(data.linkGroups).filter(function (linkGroup) {return linkGroupObj[linkGroup.type];}),
                grouping: generateGravity(data.nodes,query.getGroupings())
            }
        }

        return data;
    }

    return {
        getData: getData
    }
});
