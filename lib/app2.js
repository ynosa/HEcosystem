define(['npm:d3', 'HEcosystem/data'], function (d3, data) {
    var vis,
        node,
        link,
        force,
        drag,
        linkText,
        w = 960,
        h = 700;

    var tick = function () {
        node
            .attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            });

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

        linkText
            .attr("transform", function(link) {
            console.log(link);
            return "rotate(" + Math.atan2(link.source.y - link.target.y, link.source.x - link.target.x) + ")";
        })
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

    var dragended = function(d) {
        d3.select(this).classed("dragging", false);
    };

    var redraw = function () {
        //console.log("here", d3.event.translate, d3.event.scale);
        vis.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")");
    };

    var start = function () {
        console.log('2');
        vis = d3.select("#drawing-area")
            .append("svg:svg")
            .attr("width", w)
            .attr("height", h)
            .attr("pointer-events", "all")
            .append('svg:g')
            .call(d3.behavior.zoom().on("zoom", redraw))
            .append('svg:g');

        vis.append('svg:rect')
            .attr('width', w)
            .attr('height', h)
            .attr('fill', 'rgba(1,1,1,0)');

        //vis.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")");
        force = d3.layout.force()
                .gravity(.05)
                .charge(-200)
                .linkDistance(60)
                .size([w, h]);


        drag = d3.behavior.drag()
            .origin(function(d) { return d; })
            .on("dragstart", dragstarted)
            .on("drag", dragged)
            .on("dragend", dragended);

        link = vis.selectAll("line")
            .data(data.links)
            .enter().append("line")
            .attr("stroke-width", "6")
            .attr("class", function (link) {
                return "link " + link.svgClass;
            });

        node = vis.selectAll("g.node")
            .data(data.nodes)
            .enter().append("svg:g")
            .attr("class", function (node) {
                return "node " + node.svgClass;
            }).call(drag);

        node.append("svg:circle")
            .attr("r", function (d) {
                if (d.size > 0) {
                    return 10 + (d.size * 2);
                }
                else {
                    return 10;
                }
            })
            .on("mouseover", function () {
                d3.select(this).style("fill", "#999");
            })
            .on("mouseout", function (d) {
                if (d.style == 'filled') {
                    d3.select(this).style("fill", d.color);
                }
                else {
                    d3.select(this).style("stroke", d.color);
                    d3.select(this).style("fill", "black");
                }
            });

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

        force
            .nodes(data.nodes)
            .links(data.links)
            .on("tick", tick)
            .start();
    };

    return {
        start: start
    };
});