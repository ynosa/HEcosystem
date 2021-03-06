define(['npm:underscore', 'npm:d3', 'HEcosystem/hecosystem.json!json'], function (underscore, d3, jsonData) {
    console.log("entering module data.js");
    var nodesEx,
        linkGroups,
        linksEx,
        nodesDictionary,
        getClassifierPossibleValues,
        _ = underscore;

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
        "classification": defaultNodeClassification
    };

    nodesEx = _(jsonData.nodes).map(function (node) {
        // no deep copy support in underscore
        var classification =  _.extend({}, defaultNodeClassification, node.classification);
        return _.extend({}, defaultNode, node, {classification: classification});
    });

    nodesDictionary = _.object(_(jsonData.nodes).map(function (node) {
        return [node.id, node];
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
            .flatten()
            .uniq()
            .value();
    };

    optimizeSingleChildGroupingNodes = function(node, parent) {
        if(!node.children || node.children.length === 0)
            return;

        if(node.children.length === 1) {
            // remove this node from parents list
            // add the single child to the parent's list of nodes
            parent.children = parent.children.map(function(child) {
                if(child !== node)
                    return node;
                else
                    return node.children[0];
            });
        }
    };

    var getData = function (query) {
        var sourceData = {
            nodes: nodesEx,
            links: linksEx,
            classifiers: jsonData.classifiers
        };

        var data = JSON.parse(JSON.stringify(sourceData));
        data.getClassifierPossibleValues = getClassifierPossibleValues;

        if (query) {
            var getNodeClasses_ = function (node) {
                return _(node.classification).chain()
                    .map(function (value, key) {
                        return _.chain([value])
                            .flatten()
                            .map(function(v) {
                                return "" + key + v;
                            })
                            .value();
                    })
                    .flatten();
            };
            var getFilteredNodes = function (nodes, nodesFilters) {
                return _.chain(nodes)
                    .filter(function (node) {
                        return getNodeClasses_(node)
                            .every(function (classKey) {
                                return !!nodesFilters[classKey];
                            })
                            .value();
                    }).value();
            };
            var filteredNodes = getFilteredNodes(data.nodes, query.getFilters());
            data.nodes = filteredNodes;
        }

        if (query) {
            var classify = function (elements, groupingCriterias) {
                var head = _(groupingCriterias).head(),
                    tail = _(groupingCriterias).rest();

                if (!head) return elements;

                return _.chain(elements)
                    .map(function (node) {
                        var classifications;
                        if (!node.classification[head])
                            classifications = ["Other"];
                        else
                            classifications = [].concat(node.classification[head]);
                        return _(classifications).map(function (classValue) {
                            var returnNode = JSON.parse(JSON.stringify(node));
                            returnNode.classification[head] = classValue;
                            return returnNode;
                        });
                    })
                    .flatten()
                    .groupBy(function (e) {
                        return e.classification[head];
                    }).map(function (values, groupName) {
                        return {
                            name: groupName,
                            children: classify(values, tail)
                        };
                    }).value();
            };
            var nodesGroupedTree = { name: "default", children: classify(data.nodes, query.getGroupings()) };
            data.nodes = nodesGroupedTree;
        }

        if (query) {
            var getFilteredLinks = function (links, linkFilters, linkPrefix) {
                return _.chain(links)
                    .filter(function (link) {
                        return linkFilters[linkPrefix + link["link-id"]];
                    }).value();
            };
            var filteredLinks = getFilteredLinks(data.links, query.getFilters(), query.linkPrefix);
            data.links = filteredLinks;
        }

        //data.nodes = optimizeSingleChildGroupingNodes(data.nodes);

        return _.extend({}, data);
    };

    console.log("exiting module data.js");

    return {
        getData: getData
    }
});
