import React, {Component, useRef, useEffect} from 'react';
import { Map, GeoJSON, Marker, Popup } from 'react-leaflet';
import mapData from './../data/counties.json';
import {geolocated} from 'react-geolocated';
import 'leaflet/dist/leaflet.css';
import './MyMap.css'
import { layerGroup, geoJSON, popup } from 'leaflet';
import axios from 'axios';
import handleOnRowSelected from './func';
import { func } from 'prop-types';

const DEFAULT_LONGITUDE = 51.903614;
const DEFAULT_LATITUDE = -8.468399;


const mapstyle = {
    height: '600px',
    width: '500px',
    background:0,
    marginLeft: '50%',
    marginTop: '3%',
    marginBottom: '0.005%'
};

const contystyle = {
    fillColor:'darkgreen',
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7
}
// const handleOnRowSelected = ({handleOnRowSelected, chandleOnRowSelected})=>{
//     <div>
//         {handleOnRowSelected.map(({county})=><div key= {county}> {county}</div>)}
//     </div>
// };



class  MyMap extends React.Component{
    // constructor(props) {
    //     super(props);
    //     // this.handleOnRowSelected = this.handleOnRowSelected.bind(this);
    //     this.chandleOnRowSelected = this.chandleOnRowSelected.bind(this);
    // }

    // chandleOnRowSelected = () => {
    //     const {onClick} = this.props;
    //     onClick();
    // };

 

    //functions for map
    highLightCounty = (event) =>{
        event.target.setStyle({
            weight:5,
            color:'white',
            fillColor:'yellow',
            fillOpacity:0.6
         });
    };
    //resethighlight county style
    resetCountyColor = (event) => {
        event.target.setStyle({
            fillColor:'darkgreen',
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        });
    };

    // callHandleOnRowSelected = (event) =>{
    //     this.handleOnRowSelected()
    // };
    
    // functions for features of the map
    onEachCounty = (county, layer) => {
    const countyName = county.properties.NAME_TAG;
    console.log(countyName);
    layer.bindPopup(countyName);

    layer.on({
        mouseover: this.highLightCounty,
        mouseout: this.resetCountyColor,
        // click: this.handleOnRowSelected,
        //except this, others in map all using geojson file as data
        //this is the table's function wish to call it at same time, achieve the connection
        });
    };
    
    
    

    render() {
        
        const {county,counties, onSortByTotal, onSortByCountyName, onRowSelected} = this.props;
        const longitude = this.props.coords ? this.props.coords.longitude : DEFAULT_LONGITUDE;
        const latitude = this.props.coords ? this.props.coords.latitude : DEFAULT_LATITUDE;
        return (
            <div>
                <h1>Mapping Parkinson's Disease in Ireland</h1>
                <h4>UCC Parkinson's Disease Research Cluster</h4>
                <h5>Last Update: 28th August 2020</h5>

            <div className="sharebuttons">
            <a href="mailto:?Subject=Simple Share Buttons&amp;Body=I%20saw%20this%20and%20thought%20of%20you!%20 https://simplesharebuttons.com">
            <img src="https://simplesharebuttons.com/images/somacro/email.png" alt="Email" />
            </a>

            <a href="http://www.facebook.com/sharer.php?u=https://simplesharebuttons.com" target="_blank">
            <img src="https://simplesharebuttons.com/images/somacro/facebook.png" alt="Facebook" />
            </a>

            <a href="https://plus.google.com/share?url=https://simplesharebuttons.com" target="_blank">
            <img src="https://simplesharebuttons.com/images/somacro/google.png" alt="Google" />
            </a>

            <a href="http://www.linkedin.com/shareArticle?mini=true&amp;url=https://simplesharebuttons.com" target="_blank">
            <img src="https://simplesharebuttons.com/images/somacro/linkedin.png" alt="LinkedIn" />
            </a>

            <a href="http://www.tumblr.com/share/link?url=https://simplesharebuttons.com&amp;title=Simple Share Buttons" target="_blank">
            <img src="https://simplesharebuttons.com/images/somacro/tumblr.png" alt="Tumblr" />
            </a>

            <a href="https://twitter.com/share?url=https://simplesharebuttons.com&amp;text=Simple%20Share%20Buttons&amp;hashtags=simplesharebuttons" target="_blank">
            <img src="https://simplesharebuttons.com/images/somacro/twitter.png" alt="Twitter" />
            </a>
            </div>

                
                <Map style={mapstyle} 
                zoom = {6.2} 
                center={[latitude,longitude]}
                maxZoom={10}
                attributionControl={true}
                zoomControl={true}
                doubleClickZoom={true}
                scrollWheelZoom={true}
                dragging={true}
                animate={true}
                easeLinearity={0.35}>
                    
                    <GeoJSON 
                style={contystyle} 
                data = {mapData.features}
                onEachFeature = {this.onEachCounty} 
                />

                {
                    !this.props.coords?
                    <div className="loading">Loading</div>
                    :
                    <Marker 
                    url = {'./data/userlocation.png'}
                    position = {[latitude,longitude]}
                    >
                    <Popup>You are here!</Popup>
                    </Marker>

                }

                </Map>

        </div>
        );
    }

}

 
export default geolocated({
    positionOptions:{
        enableHighAccuracy:false
    },
    userDecisionTimeout:10000
})(MyMap);
// export default MyMap;