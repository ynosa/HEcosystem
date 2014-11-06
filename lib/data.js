define(['npm:underscore', 'npm:d3', 'HEcosystem/hecosystem.json!json'], function (underscore, d3, jsonData) {
    console.log("entering module data.js");
    var nodesEx,
        linkGroups,
        linksEx,
        nodesDictionary,
        getClassifierPossibleValues,
        _ = underscore,
    //  TODO: use library with deep copy functionality
        __ = {deepObjectExtend: function (target, source) {
            for (var prop in source)
                if (prop in target)
                    __.deepObjectExtend(target[prop], source[prop]);
                else
                    target[prop] = source[prop];
            return target;
        }};

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

        if (!groupLevels || (_.isArray(groupLevels) && groupLevels.length == 0)) {
            return {mainNode: null, nodes: [], links: [] };
        }

        var mainNode = {id: "gravity-main", level: 0, gravity: true};
        var childrenNodesAndLinks = getGravityObjectForGroups(mainNode, data, 0);

        mainNode.children = childrenNodesAndLinks.nodes;

        return {mainNode: mainNode, nodes: childrenNodesAndLinks.nodes, links: childrenNodesAndLinks.links};
    };

    var defaultNodeClassification = (function (classifiers) {
        "use strict";
        return _.chain(classifiers)
            .map(function (classifier) {
                return [classifier["classifier-id"], "other"];
            })
            .object()
            .value();
    })(jsonData.classifiers);

    var defaultNode = {
        "node-id": "default-node-id",
        "name": "default-name",
        "description": "default-description",
        "url": "default-url",
        "img": "default-img-uri",
        "classification": defaultNodeClassification
    };

    nodesEx = _(jsonData.nodes).map(function (node) {
        return _.extend({}, defaultNode, node);
    });

    linkGroups = _.chain(jsonData.links).map(function (relationship) {
        return {type: relationship.type};
    }).uniq(function (obj) {
        return obj.type
    }).value();

    nodesDictionary = _.object(_(jsonData.nodes).map(function (node) {
        return [node.id, node]
    }));

    linksEx = _.chain(jsonData.links).map(function (link, i) {
        return _.extend({}, link, {source: nodesDictionary[link.source],
            target: nodesDictionary[link.target],
            id: "link-id-" + i
        });
    }).value();

    getClassifierPossibleValues = function (classifier) {
        "use strict";
        return _.chain(nodesEx)
            .map(function (node) {
                return node.classification[classifier];
            })
            .uniq()
            .value();
    };

    console.log("exiting module data.js");

    var getData = function (query) {

        var sourceData = {
            nodes: nodesEx,
            links: linksEx,
            linkGroups: linkGroups,
            classifiers: jsonData.classifiers
        };

        var data = JSON.parse(JSON.stringify(sourceData));
        data.getClassifierPossibleValues = getClassifierPossibleValues;


        if (query) {
            var classify = function (elements, groupingCriterias) {
                var head = _(groupingCriterias).head(),
                    tail = _(groupingCriterias).rest();

                if (!head) return elements;

                return _.chain(elements).groupBy(function (e) {
                    return e.classification[head];
                }).map(function (values, groupName) {
                    return {
                        name: groupName,
                        children: classify(values, tail)
                    };
                }).value();
            };

            var nodesGroupedTree = {name: "default", children: classify(data.nodes, query.getGroupings())};

            return _.extend({}, data, {nodes: nodesGroupedTree});


//            var nodeGroupsObj = _(query.getFilters()).chain().pairs().filter(function(groupPair){
//                return groupPair[0].substr(0, query.nodeGroupPrefix.length) == query.nodeGroupPrefix;
//            }).map(function(groupPair){ return [groupPair[0].substr(query.nodeGroupPrefix.length,1000),groupPair[1]]}).object().value();
//
//            var linkGroupObj = _(query.getFilters()).chain().pairs().filter(function(groupPair){
//                return groupPair[0].substr(0, query.linkGroupPrefix.length) == query.linkGroupPrefix;
//            }).map(function(groupPair){ return [groupPair[0].substr(query.linkGroupPrefix.length,1000),groupPair[1]]}).object().value();

//            data = {
//                nodeGroups: _(data.nodeGroups).filter(function (group) {
//                    return nodeGroupsObj[group.id];
//                }),
//                nodes: _(data.nodes).filter(function (node) {
//                    return nodeGroupsObj[node.group];
//                }),
//                links: _(data.links).filter(function (link) {
//                    return nodeGroupsObj[link.source.group] && nodeGroupsObj[link.target.group];
//                })
//                    .filter(function (link) {
//                        return linkGroupObj[link.type];
//                    }),
//                linkGroups: _(data.linkGroups).filter(function (linkGroup) {
//                    return linkGroupObj[linkGroup.type];
//                }),
//                grouping: generateGravity(data.nodes, query.getGroupings())
//            }
        }

        return _.extend({}, data);
    }

    return {
        getData: getData
    }
});
