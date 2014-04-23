/**
/**
 * Created by ynosa on 14.04.14.
 */

define(['npm:underscore' ], function (underscore) {
//define(['npm:underscore', 'HEcosystem/hecosystem.json!'], function (underscore, data) {
    console.log("entering module data.js");

    var data = {
        "groups": [
            {
                "id": "mr",
                "name": "Map/reduce frameworks",
                "svgClass": "mr"
            },
            {
                "id": "fs",
                "name": "File systems",
                "svgClass": "fs"
            },
            {
                "id": "db-rw",
                "name": "Random rw databases",
                "svgClass": "db-r"
            },
            {
                "id": "db-sql",
                "name": "Databases with SQL-semantics",
                "svgClass": "db-sql"
            },
            {
                "id": "deploy",
                "name": "Fast cluster deployment",
                "svgClass": "deploy"
            },
            {
                "id": "framework",
                "name": "M/R wrappers",
                "svgClass": "deploy"
            },
            {
                "id": "workflow",
                "name": "Workflow engines",
                "svgClass": "workflow"
            },
            {
                "id": "workflow",
                "name": "Workflow engines",
                "svgClass": "workflow"
            },
            {
                "id": "serialization",
                "name": "Serialization frameworks",
                "svgClass": "serialization"
            },
            {
                "id": "coordination",
                "name": "Distributed coordination",
                "svgClass": "coordination"
            },
            {
                "id": "integration",
                "name": "Data ingesting",
                "svgClass": "coordination"
            },
            {
                "id": "mining",
                "name": "Data mining",
                "svgClass": "mining"
            }

        ],


        "nodes": [
            {
                "id": "mr",
                "name": "Map Reduce",
                "group": "mr"
            },
            {
                "id": "hbase",
                "name": "HBase",
                "group": "db-rw"
            },
            {
                "id": "pig",
                "name": "pig",
                "group": "framework"
            },
            {
                "id": "hdfs",
                "name": "HDFS",
                "group": "fs"
            },
            {
                "id": "hive",
                "name": "Hive",
                "group": "db-sql"
            },
            {
                "id": "whirr",
                "name": "Whirr",
                "group": "deploy"
            },
            {
                "id": "sqoop",
                "name": "Sqoop",
                "group": "integration"
            },
            {
                "id": "flume",
                "name": "Flume",
                "group": "integration"
            },
            {
                "id": "mahout",
                "name": "Mahout",
                "group": "mining"
            },
            {
                "id": "oozie",
                "name": "Oozie",
                "group": "workflow"
            },
            {
                "id": "cascading",
                "name": "Cascading",
                "group": "framework"
            },
            {
                "id": "avro",
                "name": "Avro",
                "group": "serialization"
            },
            {
                "id": "zookeeper",
                "name": "Zookeeper",
                "group": "coordination"
            }
        ],


        "links": [
            {
                "source": "mr",
                "target": "hdfs",
                "type": "reads from/writes to",
                "svgClass": "rw"
            },
            {
                "source": "mr",
                "target": "hbase",
                "type": "reads from/writes to",
                "svgClass": "rw"
            },
            {
                "source": "mr",
                "target": "avro",
                "type": "serializes/deserializes",
                "svgClass": "rw"
            },
            {
                "source": "hbase",
                "target": "hdfs",
                "type": "reads from/writes to",
                "svgClass": "stores"
            },
            {
                "source": "hbase",
                "target": "zookeeper",
                "type": "coordinates",
                "svgClass": "coord"
            },
            {
                "source": "pig",
                "target": "mr",
                "type": "generates M/R jobs",
                "svgClass": "gmr"
            },
            {
                "source": "pig",
                "target": "avro",
                "type": "serializes/deserializes",
                "svgClass": "serialize"
            },
            {
                "source": "hive",
                "target": "hdfs",
                "type": "reads from/writes to",
                "svgClass": "rw"
            },
            {
                "source": "hive",
                "target": "hbase",
                "type": "reads from/writes to",
                "svgClass": "rw"
            },
            {
                "source": "hive",
                "target": "mr",
                "type": "generates M/R jobs",
                "svgClass": "gmr"
            },
            {
                "source": "hive",
                "target": "zookeeper",
                "type": "coordinates",
                "svgClass": "coord"
            }
        ]
    };

    var nodesEx,
        linkGroups,
        linksEx,
        nodesDictionary,
        _ = underscore;

    nodesEx = _(data.nodes).map(function (node) {
        return _.extend(node,
            {svgClass: (_(data.groups)
                .find(function (group) {
                    return group.id === node.group;
                }) || {svgClass: ""}).svgClass})
    });

    linkGroups = _.chain(data.links).map(function (relationship) {
        return {type : relationship.type};
    }).uniq(function (obj){return obj.type}).value();

    nodesDictionary = _.object(_(data.nodes).map(function (node) {
        return [node.id, node]
    }));

    linksEx = _.chain(data.links).map(function (link,i) {
        return _.extend(link, {source: nodesDictionary[link.source],
            target: nodesDictionary[link.target],
            id: "link-id-" + i
        });
    }).value();


    console.log("exiting module data.js");

    var getData = function(filter) {



        if(filter)
        {
            var nodeGroupsObj = _(filter.getFilters()).chain().pairs().filter(function(groupPair){
                return groupPair[0].substr(0, filter.nodeGroupPrefix.length) == filter.nodeGroupPrefix;
            }).map(function(groupPair){ return [groupPair[0].substr(filter.nodeGroupPrefix.length,1000),groupPair[1]]}).object().value();

            var linkGroupObj = _(filter.getFilters()).chain().pairs().filter(function(groupPair){
                return groupPair[0].substr(0, filter.linkGroupPrefix.length) == filter.linkGroupPrefix;

            }).map(function(groupPair){ return [groupPair[0].substr(filter.linkGroupPrefix.length,1000),groupPair[1]]}).object().value();

            return {
                nodeGroups: _(data.groups).filter(function (group){ return nodeGroupsObj[group.id];}),
                nodes: _(nodesEx).filter(function (node) { return nodeGroupsObj[node.group]; }),
                links: _(linksEx).filter(function (link) { return nodeGroupsObj[link.source.group] && nodeGroupsObj[link.target.group];})
                                 .filter(function (link) { return linkGroupObj[link.type];}),
                linkGroups: _(data.linkGroups).filter(function (linkGroup) {return linkGroupObj[linkGroup.type];})
            }
        }
        else
        {
            return {
                nodeGroups: data.groups,
                nodes: nodesEx,
                links: linksEx,
                linkGroups: linkGroups
            };
        }
    }

    return {
        getData: getData
    }
});
