define(['npm:d3','github:alexei/sprintf.js'], function (d3,spr) {
    console.log("entering module app2.js");
    var vis,
        node,
        link,
        force,
        drag,
        linkText,
        w = 960,
        h = 700,
        groups,
        groupFill,
        groupPathGenerator

    groupPathGenerator = function (d) {
        return "M" + d3.geom.hull(d.values.map(function (i) {return [i.x, i.y];}))
            .join("L")
            + "Z";
    };

    var tick = function (e) {
        vis.selectAll("path")
            .data(groups)
            .attr("d", groupPathGenerator)
            .enter()
            .append("path")
            .style("fill", groupFill)
            .style("stroke", groupFill)
            .style("stroke-width", 40)
            .style("stroke-linejoin", "round")
            .style("opacity", .2)
            .attr("pointer-events", "none")

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

        linkText
            .attr("transform", function (link) {
                return spr.sprintf("rotate(%f) translate(%f,%f)",Math.atan2(link.source.y + link.target.y, link.source.x - link.target.x),(link.target.x+link.source.x)/2,(link.target.y+link.source.y)/2);
            })


        // Push different nodes in different directions for clustering.
        var k = 6 * e.alpha;
        node.forEach(function(o, i) {
            // update x and y based on o.group
            o.x += i & 2 ? k : -k;
            o.y += i & 1 ? k : -k;
        });

        node.attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });

    };

    var dragstarted = function (d) {
        console.log("trace 1");
        d3.event.sourceEvent.stopPropagation();

        d3.select(this).classed("dragging", true);
        force.start();
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
        groups = d3.nest().key(function(d) { return d.group; }).entries(data.nodes);


        console.log('Starting: initiating force layout');

        vis = d3.select("#drawing-area")
            .append("svg:svg")
            .attr("width", w)
            .attr("height", h)
            .attr("pointer-events", "all")
            .append('svg:g')
            .call(d3.behavior.zoom().on("zoom", onZoom))
            .append('svg:g');


        vis.append('svg:rect')
            .attr('width', w)
            .attr('height', h)
            .attr('fill', 'rgba(1,1,1,0)');

        force = d3.layout.force()
            .friction(0.8)
            .linkDistance(300)
            .linkStrength(0.1)
            .gravity(0.05)
            .charge(-500)
            .chargeDistance(500)
            .linkDistance(60)
            .theta(0)
            .size([w, h]);

        drag = d3.behavior.drag()
            .origin(function (d) {
                return d;
            })
            .on("dragstart", dragstarted)
            .on("drag", dragged)
            .on("dragend", dragended);



//        force
//            .nodes(data.nodes)
//            .links(data.links)
//            .on("tick", tick);
//
//        force.start();

        updateNodes(data);
    };

    var updateNodes = function (data) {

        force
            .nodes(data.nodes)
            .links(data.links)
            .on("tick", tick);

        link = vis.selectAll("line")
            .data(data.links, function (obj) {
                return obj.id;
            });

        link.enter().append("line")
            .attr("stroke-width", "6")
            .attr("class", function (link) {
                return "link " + link.svgClass;
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
            .call(drag);

        node.append("svg:circle")
            .attr("r", function (d) {
                if (d.size > 0) {
                    return 10 + (d.size * 2);
                }
                else {
                    return 10;
                }
            });
//            .on("mouseover", function () {
//                d3.select(this).style("fill", "#999");
//            })
//            .on("mouseout", function (d) {
//                if (d.style == 'filled') {
//                    d3.select(this).style("fill", d.color);
//                }
//                else {
//                    d3.select(this).style("stroke", d.color);
//                    d3.select(this).style("fill", "black");
//                }
//            });

        linkText = link.append("text")
            .text(function (d) {
                return d.type;
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

        node.append("title")
            .text(function (d) {
                return d.URI;
            });

        node.exit().remove();
        link.exit().remove();

        force.start();
    };

    console.log("exiting module app2.js");
    return {
        start: start,
        updateNodes: updateNodes
    };
});