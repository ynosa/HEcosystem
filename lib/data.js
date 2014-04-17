/**
 * Created by ynosa on 14.04.14.
 */

define(['npm:underscore'], function (underscore) {
    var groups,
        nodes,
        nodesEx,
        links,
        linksGroups,
        linksEx,
        nodesDictionary,
        _ = underscore;

    groups = [
        { id: "mr", name: "Map/reduce frameworks", svgClass: "mr"},
        { id: "fs", name: "File systems", svgClass: "fs"}
    ];

    nodes = [
        {id: "node1", name: "node1", group: "mr"},
        {id: "node2", name: "node1", group: "mr"},
        {id: "node3", name: "node1", group: "fs"}
    ];

    links = [
        {source: "node1", target: "node2", type: "uses", svgClass: "uses"},
        {source: "node1", target: "node3", type: "stores", svgClass: "stores"}
    ];

    nodesEx = _(nodes).map(function (node) {
        return _.extend(node,
            {svgClass: _(groups)
                .find(function (group) {
                    return group.id === node.group;
                }).id})
    });

    linksGroups = _.chain(links).map(function (relationship) {
        return relationship.type
    }).uniq().value();

    nodesDictionary = _.object(_(nodes).map(function (node) {
        return [node.id, node]
    }));

    linksEx = _.chain(links).map(function (link) {
        return _.extend(link, {source: nodesDictionary[link.source],
            target: nodesDictionary[link.target]
        });
    }).value();


    return {
        nodeGroups: groups,
        nodes: nodesEx,
        links: linksEx,
        linksGroups: linksGroups
    };

});
