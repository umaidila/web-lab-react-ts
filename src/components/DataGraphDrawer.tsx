import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { DataGraphDrawerProps } from "../props/DataGraphDrawerProps";

const DataGraphDrawer: React.FC<DataGraphDrawerProps> = ({
  data,
  selectedProducts,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const marginX = 50;
  const marginY = 50;
  const height = 400;
  const width = 800;

  useEffect(() => {
    if (!data || data.length === 0) {
        return;
      }
  
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();
  
      const g = svg
        .attr("width", width + marginX * 2)
        .attr("height", height + marginY * 2)
        .append("g")
        .attr("transform", `translate(${marginX}, ${marginY})`);
  
      const colors = d3.scaleOrdinal(d3.schemeCategory10);
  
      const graphData: any[] = [];
      data.forEach(item => {
        Object.keys(item.prices).forEach(product => {
          graphData.push({
            date: item.day,
            name: product,
            value: item.prices[product]
          });
        });
      });
  
      const scaleX = d3
        .scaleTime()
        .domain(d3.extent(graphData, d => d.date) as [Date, Date])
        .range([0, width]);
  
      const scaleY = d3
        .scaleLinear()
        .domain([0, d3.max(graphData, d => d.value) as number])
        .range([height, 0]);
  
      const axisX = d3.axisBottom(scaleX);
      const axisY = d3.axisLeft(scaleY);
  
      g.append("g").attr("transform", `translate(0, ${height})`).call(axisX);
      g.append("g").call(axisY);
  
      selectedProducts.forEach((product, i) => {
        const lineData = graphData.filter(d => d.name === product.backName);
        const line = d3
          .line()
          .x(d => scaleX((d as any).date))
          .y(d => scaleY((d as any).value));
  
        g
          .append("path")
          .datum(lineData)
          .attr("fill", "none")
          .attr("stroke", colors(i.toString()))
          .attr("stroke-width", 1.5)
          .attr("d", line);
  
      });
  
      const legend = g
        .selectAll(".legend")
        .data(selectedProducts)
        .enter()
        .append("g")
        .attr("class", "legend")
        .attr("transform", (d, i) => `translate(${width - 100}, ${20 + i * 20})`);
  
      legend
        .append("rect")
        .attr("x", 0)
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", (d, i) => colors(i.toString()));
  
      legend
        .append("text")
        .attr("x", -10)
        .attr("y", 10)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(d => d.frontName);
    }, [data, selectedProducts]);
  
    return <svg ref={svgRef}></svg>;
  };
  
  export default DataGraphDrawer;