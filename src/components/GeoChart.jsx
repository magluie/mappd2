import React,{useState, useRef, useEffect} from 'react';
import {select, geoPath, geoMercator, min, max,scaleLinear } from 'd3';
import useResizeObserver from "use-resize-observer";
import data from './data/county';

function GeoChart({data, property}){
    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);
    const [selectedCounty, setSelectedCounty] = useState(null)
    
    //will be called initially and on every data cahnge
    useEffect(()=>{
        const svg = select(svgRef.current);

        const minProp = min(data.features, feature => feature.properties[property])
        const maxProp = max(data.features, feature => feature.properties[property])
        console.warn(minProp,maxProp);

        const colorScale = scaleLinear()
        .domain([minProp, maxProp])
        .range(['green','grey']);


        //use resized dimensions
        //but fall back to get boundingclientreact, if no dimensions yet
        const {width, height}=
            dimensions || wrapperRef.current.getBoundingClientReact();
        
        //projects geo-coordinates on a 2d plane
        const projection = geoMercator()
            .fitSize([width,height],selectedCounty || data)
            .precision(100);

        //take geojson data and transform into the d attribute of a path element
        const pathGenerator = geoPath().projection(projection);

        svg
        .selectAll('.county')
        .data(data.features)
        .join('path')
        .on('click', feature=>{
            setSelectedCounty(selectedCounty ===feature? null:feature )
        })
        .attr('class','county')
        .transition()
        .duration(1000)
        .attr('fill', feature => colorScale(feature.properties[property]))
        .attr('d',features => pathGenerator(features));


        //render text
        svg
        .selectAll('.label')
        .data([selectedCounty])
        .join('text')
        .attr('class','label')
        .text(
            feature =>
            feature && 
            feature.properties.name + ': '+ feature.properties[property].toLocaleString()

        )
        .attr('x',10)
        .attr('y',25);

    },[data,dimensions,property]);

    

    return (
        <div ref={wrapperRef} style={{marginBottom:"2rem"}}>
            <svg ref = {svgRef}></svg>
        </div>
    );
}

export default GeoChart;