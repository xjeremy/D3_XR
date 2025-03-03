// js/svgRenderer.js
// Uses D3.js to render the graph in a 2D SVG fallback.
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

export class SVGGraphRenderer {
  constructor(root) {
    this.root = root;
    this.init();
  }

  init() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.svg = d3.select("body").append("svg")
      .attr("width", this.width)
      .attr("height", this.height)
      .style("background-color", "#000");

    // Create a group for the graph and center it.
    this.g = this.svg.append("g")
      .attr("transform", `translate(${this.width / 2}, ${this.height / 2})`);

    this.drawLinks();
    this.drawNodes();
    this.initZoom();
  }

  drawLinks() {
    // Draw links as SVG lines.
    this.g.selectAll("line.link")
      .data(this.root.links())
      .enter()
      .append("line")
      .attr("class", "link")
      .attr("stroke", "#888")
      .attr("stroke-width", 1.5)
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);
  }

  drawNodes() {
    // Draw nodes as SVG circles.
    this.g.selectAll("circle.node")
      .data(this.root.descendants())
      .enter()
      .append("circle")
      .attr("class", "node")
      .attr("r", 5)
      .attr("fill", "#00ffcc")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .on("click", (event, d) => {
        console.log("Node clicked:", d.data.name);
        // Highlight the node on click.
        d3.select(event.currentTarget)
          .attr("fill", "#ffcc00");
      });
  }

  initZoom() {
    const zoomed = (event) => {
      this.g.attr("transform", event.transform);
    };
    this.svg.call(d3.zoom().on("zoom", zoomed));
  }
}
