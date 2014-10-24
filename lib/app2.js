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
        dataNodes;


    hullPathGenerator = function (groupNode) {
        var hullPoints = groupNode.children;
//        if (hullPoints.length == 1)
//        {
//            hullPoints = _.union(hullPoints[0],hullPoints[0],hullPoints[0]);
//        }
        if (hullPoints.length == 2) {
            hullPoints = _.union(hullPoints, {x: (hullPoints[0].x + hullPoints[1].x) / 2, y: (hullPoints[0].y + hullPoints[1].y) / 2});
        }
        console.log(hullPoints);

        return "M " + d3.geom.hull(hullPoints.map(function (childNode) {
                return childNode.x + " " + childNode.y + " ";
            }))
            .join("L ")
            + "Z";
    };

    var tick = function (e) {
        console.log("tick");

        hull.attr("d", hullPathGenerator);
        link
            .attr("x1", function (d) {
                return d.source.x;
            })
            .attr("y1", function (d) {
                return d.source.y;
            })
            .attr("x2", function (d) {
                return d.target.x;
            })
            .attr("y2", function (d) {
                return d.target.y;
            });

        node
            .attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            });

//        linkText
//            .attr("transform", function (link) {
//                return spr.sprintf("rotate(%f) translate(%f,%f)", Math.atan2(link.source.y + link.target.y, link.source.x - link.target.x), (link.target.x + link.source.x) / 2, (link.target.y + link.source.y) / 2);
//            })

        node.attr("cx", function (d) {
            return d.x;
        })
            .attr("cy", function (d) {
                return d.y;
            });

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

    var start = function (data) {
        groupFill = d3.scale.category20();


        console.log('Starting: initiating force layout');
        svg = d3.select("#drawing-area")
            .append("svg:svg")
            .attr("width", w)
            .attr("height", h)
            .attr("pointer-events", "all");

        svg.append("defs").selectAll("marker")
            .data(["arrow"])
            .enter().append("marker")
            .attr("id", function(d) { return d; })
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 15)
            .attr("refY", 0)
            .attr("markerWidth",3)
            .attr("markerHeight",3)
            .attr("orient", "auto")
            .append("path")
            .attr("d", "M0,-5L10,0L0,5");

        vis = svg.append('svg:g')
            .attr("width", w)
            .attr("height", h)
            .attr("pointer-events", "all")
            .call(d3.behavior.zoom().on("zoom", onZoom))
            .append('svg:g');

        vis.append('svg:rect')
            .attr('width', w)
            .attr('height', h)
            .attr('fill', 'rgba(1,1,1,0)');

        force = d3.layout.force()
            .gravity(.05)
            .charge(-200)
            .linkDistance(60)
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

        dataNodes = _.union(data.nodes, data.grouping.nodes);

        hullGroups = _(data.grouping.nodes).chain().map(function (node, i) {
            return _({}).extend(node, {id : "hull-"+node.id, colorGroup: i})
        }).sortBy(function (node) {
            return node.level
        }).reverse().value();

        hull = vis.selectAll("path")
            .data(hullGroups, function (obj) {return obj.id;})
            .attr("d", hullPathGenerator)
            .enter()
            .append("path")
            .attr("id",function(d){return d.id;})
            .style("fill", function (d) {
                return groupFill(d.colorGroup);
            })
            .style("stroke", function (d) {
                return groupFill(d.colorGroup);
            })
            .style("stroke-width", function (d) {
                return 80 - d.level * 20;
            })
            .style("stroke-linejoin", "round")
            .style("opacity", .2)
            .attr("pointer-events", "none")

        link = vis.selectAll("line")
            .data(data.links, function (obj) {
                return obj.id;
            });

        link.enter().append("line")
            .attr("marker-end","url(#arrow)")
            .attr("class", function (link) {
                return "link " + link.svgClass;
            });

        linkText = link.append("text")
            .text(function (d) {
                return d.type;
            });

        node = vis.selectAll("g.node")
            .data(data.nodes, function (obj) {
                return obj.id;
            });

        node.enter().append("svg:g")
            .attr("class", function (node) {
                return "node " + node.svgClass;
            })
            .attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            })
            .call(force.drag);

        node.append("svg:circle")
            .attr("r", function (d) {
                if (d.size > 0) {
                    return 10 + (d.size * 2);
                }
                else {
                    return 10;
                }
            });

        node.append("svg:text")
            .attr("text-anchor", "middle")
            .attr("fill", "white")
            .style("pointer-events", "none")
            .attr("font-size", function (d) {
                if (d.color == '#b94431') {
                    return 10 + (d.size * 2) + 'px';
                } else {
                    return "9px";
                }
            })
            .attr("font-weight", function (d) {
                if (d.color == '#b94431') {
                    return "bold";
                } else {
                    return "100";
                }
            })
            .text(function (d) {
                return d.name;
            });

        force.nodes(dataNodes)
            .links(data.grouping.links)
            .start();

    };

    console.log("exiting module app2.js");
    return {
        start: start,
        updateNodes: updateNodes
    };
});