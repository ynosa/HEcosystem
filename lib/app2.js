define(['npm:d3', 'github:alexei/sprintf.js'], function (d3, spr) {
    console.log("entering module app2.js");
    var vis,
        svg,
        node,
        link,
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
        dataHulls,
        treeLinks;


    hullPathGenerator = function (hullObj) {
        return "M" + d3.geom.hull(hullObj.nodes.map(function(i) { return [i.x, i.y]; })).join("L") + "Z";
    };

    var tick = function (e) {
        console.log("tick");

        hull.attr("d", hullPathGenerator);
        link.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        node.attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; });

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
        d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
    };

    var dragended = function (d) {
        d3.select(this).classed("dragging", false);
    };

    var onZoom = function () {
        //console.log("here", d3.event.translate, d3.event.scale);
        vis.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")");
    };

    var flatten = function (root) {
        var nodes = [], i = 0;

        function recurse(node) {
            if (node.children) node.children.forEach(recurse);
            if (!node.id) node.id = ++i;
            nodes.push(node);
        }

        recurse(root);
        return nodes;
    };

    var click = function () {
        if (d3.event.defaultPrevented) return; // ignore drag
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }

        updateNodes();
    };

    var flattenSubtree = function(node) {
        if(!node.children) return [node];

        return _.chain(node.children)
            .map(flattenSubtree)
            .flatten()
            .union([node])
            .value();
    };

    var start = function (data) {
        console.log('Starting: initiating force layout');
        groupFill = d3.scale.category20();

//        svg = d3.select("#drawing-area")
//            .append("svg:svg")
//            .attr("width", w)
//            .attr("height", h)
//            .attr("pointer-events", "all");
//
//        svg.append("defs").selectAll("marker")
//            .data(["arrow"])
//            .enter()
//            .append("marker")
//            .attr("id", function (d) {
//                return d;
//            })
//            .attr("viewBox", "0 -5 10 10")
//            .attr("refX", 15)
//            .attr("refY", 0)
//            .attr("markerWidth", 3)
//            .attr("markerHeight", 3)
//            .attr("orient", "auto")
//            .append("path")
//            .attr("d", "M0,-5L10,0L0,5");
//
//        vis = svg.append('svg:g')
//            .attr("width", w)
//            .attr("height", h)
//            .attr("pointer-events", "all")
//            .call(d3.behavior.zoom().on("zoom", onZoom))
//            .append('svg:g');
//
//        vis.append('svg:rect')
//            .attr('width', w)
//            .attr('height', h)
//            .attr('fill', 'rgba(1,1,1,0)');

        var svg = d3.select("body").append("svg")
            .attr("width", w)
            .attr("height", h);

        link = svg.selectAll(".link");
        node = svg.selectAll(".node");
        hull = svg.selectAll(".hull");

        force = d3.layout.force()
            .gravity(.05)
            .charge(-120)
            .linkDistance(60)
            .size([w, h]);

        force.on("tick", tick);

        drag = force.drag()
            .origin(function (d) { return d; })
            .on("dragstart", dragstarted)
            .on("drag", dragged)
            .on("dragend", dragended);

        updateNodes(data);
    };

    var updateNodes = function (data) {
        console.log("updateNodes");
        if (data) {
            dataNodes = flatten(data.nodes);
        }

        treeLinks = d3.layout.tree().links(dataNodes);

        dataHulls = _.chain(dataNodes)
            .filter(function(node){ return node.children; })
            .map(function(rootNode, index) {
                return {
                    id: "hull-" + rootNode.id,
                    nodes: flatten(rootNode),
                    colorGroup: index
                };
            })
            .value();

        force.nodes(dataNodes)
            .links(treeLinks)
            .start();

        // Update links.
        link = link.data(treeLinks, function (d) {
            return d.target.id;
        });
        link.exit().remove();

        link.enter()
            .insert("line", ".node")
            .attr("class", "link");

        // Update nodes.
        node = node.data(dataNodes, function (d) { return d.id; });
        node.exit().remove();
        var nodeEnter = node.enter().append("g")
            //.on("click", click)
            .call(force.drag);
        nodeEnter.append("circle")
            .attr("r", 10);
        nodeEnter.append("text")
            .attr("dy", ".35em")
            .text(function (d) { return d.name; });

//        hullGroups = _(data.grouping.nodes).chain().map(function (node, i) {
//            return _({}).extend(node, {id : "hull-" + node.id, colorGroup: i})
//        }).sortBy(function (node) {
//            return node.level
//        }).reverse().value();

        hull = hull.data(dataHulls, function (d) { return d.id; });
        hull.exit().remove();

        var hullEnter = hull.enter();

        hullEnter.append("path")
            .attr("d", hullPathGenerator)
            .attr("id", function(d){return d.id;})
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

//        link = vis.selectAll("line")
//            .data(data.links, function (obj) {
//                return obj.id;
//            });
//
//        link.enter().append("line")
//            .attr("marker-end","url(#arrow)")
//            .attr("class", function (link) {
//                return "link " + link.svgClass;
//            });
//
//        linkText = link.append("text")
//            .text(function (d) {
//                return d.type;
//            });
//
//        node = vis.selectAll("g.node")
//            .data(data.nodes, function (obj) {
//                return obj.id;
//            });
//
//        node.enter().append("svg:g")
//            .attr("class", function (node) {
//                return "node " + node.svgClass;
//            })
//            .attr("transform", function (d) {
//                return "translate(" + d.x + "," + d.y + ")";
//            })
//            .call(force.drag);
//
//        node.append("svg:circle")
//            .attr("r", function (d) {
//                if (d.size > 0) {
//                    return 10 + (d.size * 2);
//                }
//                else {
//                    return 10;
//                }
//            });
//
//        node.append("svg:text")
//            .attr("text-anchor", "middle")
//            .attr("fill", "white")
//            .style("pointer-events", "none")
//            .attr("font-size", function (d) {
//                if (d.color == '#b94431') {
//                    return 10 + (d.size * 2) + 'px';
//                } else {
//                    return "9px";
//                }
//            })
//            .attr("font-weight", function (d) {
//                if (d.color == '#b94431') {
//                    return "bold";
//                } else {
//                    return "100";
//                }
//            })
//            .text(function (d) {
//                return d.name;
//            });
    };

    console.log("exiting module app2.js");
    return {
        start: start,
        updateNodes: updateNodes
    };
});