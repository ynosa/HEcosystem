{
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
            "svgClass": "gmr"
        }
    ]
}