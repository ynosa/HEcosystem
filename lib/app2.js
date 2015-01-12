define(['npm:d3'], function (d3) {
    console.log("entering module app2.js");
    var vis,
        svg,
        node,
        link,
        groupingTreeLink,
        hull,
        force,
        drag,
        linkText,
        w = 960,
        h = 700,
        hullGroups,
        groupFill,
        hullPathGenerator,
        dataNodes,
        dataLinks,
        dataHulls,
        treeLinks;


    hullPathGenerator = function (hullObj) {
        var coordPairs = hullObj.nodes.map(function (i) {
            return [i.x, i.y];
        });

        // in case there is less then 3 nodes in the path
        var i = 1;
        while(coordPairs.length < 3){
            // fill the result with copies of the first element, slightly modifying coordinates
            coordPairs.push([coordPairs[0][0] + i, coordPairs[0][1]]);
            i++;
        }

        return "M" + d3.geom.hull(coordPairs).join("L") + "Z";
    };

    var applyLinkCoords = function (link) {

        var getTargetX = function(linkObj) {
            var targetRadius = 10;
            var dx = linkObj.target.x - linkObj.source.x;
            var dy = linkObj.target.y - linkObj.source.y;

            var len = Math.sqrt(dx * dx + dy * dy);
            var targetPointerX = linkObj.target.x - targetRadius * dx / len;
            var targetPointerY = linkObj.target.y - targetRadius * dy / len;

            return targetPointerX;
        };

        var getTargetY = function(linkObj) {
            var targetRadius = 10;
            var dx = linkObj.target.x - linkObj.source.x;
            var dy = linkObj.target.y - linkObj.source.y;

            var len = Math.sqrt(dx * dx + dy * dy);
            var targetPointerX = linkObj.target.x - targetRadius * dx / len;
            var targetPointerY = linkObj.target.y - targetRadius * dy / len;

            return targetPointerY;
        };

        return link
            .attr("x1", function (d) {
                return d.source.x;
            })
            .attr("y1", function (d) {
                return d.source.y;
            })
            .attr("x2", getTargetX)
            .attr("y2", getTargetY);
    };

    var tick = function (e) {
        console.log("tick");

        hull.attr("d", hullPathGenerator);
        applyLinkCoords(groupingTreeLink);
        applyLinkCoords(link);

        node.attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        });

//        linkText
//            .attr("transform", function (link) {
//                return spr.sprintf("rotate(%f) translate(%f,%f)", Math.atan2(link.source.y + link.target.y, link.source.x - link.target.x), (link.target.x + link.source.x) / 2, (link.target.y + link.source.y) / 2);
//            })

//        node.attr("cx", function (d) {
//            return d.x;
//        })
//            .attr("cy", function (d) {
//                return d.y;
//            });

    };

    var dragstarted = function (d) {
        console.log("trace 1");
        d3.event.sourceEvent.stopPropagation();

        d3.select(this).classed("dragging", true);

    };

    var dragged = function (d) {
        d3.select(this)
            .attr("cx", d.x = d3.event.x)
            .attr("cy", d.y = d3.event.y);
    };

    var dragended = function (d) {
        d3.select(this).classed("dragging", false);
    };

    var onZoom = function () {
        //console.log("here", d3.event.translate, d3.event.scale);
        svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")");
    };

    var flatten = function (root) {
        var nodes = [], i = 0;

        function recurse(node, recurceName, depthLevel) {
            if (node.children) node.children.forEach(function (child) {
                recurse(child, recurceName + (node["node-id"] || node.name) + ".", depthLevel + 1)
            });
            if (!node.id) node.id = recurceName + (node["node-id"] || node.name);
            node.depth = depthLevel;
            nodes.push(node);
        }

        recurse(root, "", 0);
        return nodes;
    };

    var getLinks = function (nodes, linkTypes) {
        return _.chain(nodes)
            .map(function (node) {
                var links = node.links || [];
                return _.chain(links)
                    .map(function (link) {
                        return {
                            source: node,
                            targets: _(nodes).filter(function (n) {
                                return link["node-id"] === n["node-id"];
                            }),
                            "link-id": link["link-id"]
                        };
                    })
                    .map(function (link) {
                        return _(link.targets).map(function (targetNode) {
                            return {
                                source: link.source,
                                target: targetNode,
                                "link-id": link["link-id"]
                            }
                        })
                    })
                    .flatten()
                    .value();
            })
            .flatten()
            .map(function(link) {
                var linkType = _(linkTypes).find(function(_type){
                    return _type["link-id"] === link["link-id"];
                });
                if(linkType) {
                    return _.extend({}, linkType, link);
                }
                else return null;
            })
            .compact()
            .value();
    };

    var flattenSubtree = function (node) {
        if (!node.children) return [node];

        return _.chain(node.children)
            .map(flattenSubtree)
            .flatten()
            .union([node])
            .value();
    };

    var start = function (data) {
        console.log('Starting: initiating force layout');
        groupFill = d3.scale.category20();
        var zoomBehavior = d3.behavior.zoom()
            .on("zoom", onZoom);

        svg = d3.select("#drawing-area")
            .attr("width", w)
            .attr("height", h)
            .call(zoomBehavior)
            .append("g");


        groupingTreeLink = svg.selectAll(".grouping-link");
        link = svg.selectAll(".link");
        node = svg.selectAll(".node");
        hull = svg.selectAll(".hull");

        force = d3.layout.force()
            .gravity(.1)
            .charge(-12000)
            //.linkDistance(60)
            .size([w, h]);

        force.on("tick", tick);

        drag = force.drag()
            .origin(function (d) {
                return d;
            })
            .on("dragstart", dragstarted)
            .on("drag", dragged)
            .on("dragend", dragended);

        updateNodes(data);
    };

    var updateNodes = function (data) {
        console.log("updateNodes");
        if (data) {
            dataNodes = flatten(data.nodes);
            dataLinks = getLinks(dataNodes, data.links);
        }

        treeLinks = d3.layout.tree().links(dataNodes);

        dataHulls = _.chain(dataNodes)
//            .filter(function (node) {
//                return node.children;
//            })
            .map(function (rootNode, index) {
                return {
                    id: "hull-" + rootNode.id,
                    nodes: flatten(rootNode),
                    colorGroup: index
                };
            })
            .value();

        force.nodes(dataNodes)
            .links(treeLinks)
            .linkDistance(function(link){
                return (10 - link.target.depth) * 20;
            })
            .start();

        // Update tree links.
        groupingTreeLink = groupingTreeLink.data(treeLinks, function (d) {
            return d.target.id;
        });
        groupingTreeLink.exit().remove();

        groupingTreeLink.enter()
            .insert("line", ".node")
            .attr("class", "grouping-link");

        // Update links.
        link = link.data(dataLinks, function (d) {
            return d.source.id + d["link-id"] + d.target.id;
        });
        link.exit().remove();

        link.enter()
            .insert("line", ".node")
            .attr("class", "link");

        // Update nodes.
        node = node.data(dataNodes, function (d) {
            return d.id;
        });
        node.exit().remove();
        var nodeEnter = node.enter()
            .append("g")
            .attr("class", function (d) {
                return (d.children) ? "grouping-node" : "node";
            });
            //.on("click", click)


        nodeEnter.filter(function(d){
            return !d.children;
        }).call(force.drag);

        nodeEnter.filter(function(d){
            return d.img;
        }).append("image")
            .attr("xlink:href", function(d){
                return d.img;
            })
            .attr("x", -10)
            .attr("y", -10)
            .attr("width", 20)
            .attr("height", 20)
            .style("opacity", 0.5);

        nodeEnter.filter(function(d){
            return !d.img && !d.children;;
        }).append("circle")
            .attr("r", 10);

        nodeEnter.append("text")
            .attr("dy", ".35em")
            .text(function (d) {
                return d.name;
            });
        nodeEnter.append("title")
            .text(function(d) {
                return d.description || '';
            });




//        hullGroups = _(data.grouping.nodes).chain().map(function (node, i) {
//            return _({}).extend(node, {id : "hull-" + node.id, colorGroup: i})
//        }).sortBy(function (node) {
//            return node.level
//        }).reverse().value();

        hull = hull.data(dataHulls, function (d) {
            return d.id;
        });
        hull.exit().remove();

        var hullEnter = hull.enter();

        hullEnter.append("path")
            .attr("d", hullPathGenerator)
            .attr("id", function (d) {
                return d.id;
            })
            .style("fill", function (d) {
                return groupFill(d.colorGroup);
            })
            .style("stroke", function (d) {
                return groupFill(d.colorGroup);
            })
            .style("stroke-width", function (d) {
                return 60;
            })
            .style("stroke-linejoin", "round")
            .style("opacity", .2)
            .attr("pointer-events", "none");
    };

    console.log("exiting module app2.js");
    return {
        start: start,
        updateNodes: updateNodes
    };
});