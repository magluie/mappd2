import Loading from './Loading';
import axios from 'axios';
import CountyTable from "./CountyTable";
import Age from './Age';
import Gender from './Gender';
import '../index.css';
import Advicebox from "./Advicebox";
import React, {Component, useRef, useEffect} from 'react';
import { Map, GeoJSON, Marker, Popup } from 'react-leaflet';
import mapData from './../data/counties.json';
import {geolocated} from 'react-geolocated';
import 'leaflet/dist/leaflet.css';
import './MyMap.css'
import { layerGroup, geoJSON, popup } from 'leaflet';
import MyMap from './MyMap';
import handleOnRowSelected from './func';



class Pd extends Component {

    state = {  
        counties:[],
        allCountyTotal:0,
        service:[],
        selectedCounties:[],
    };

    url = 'https://raw.githubusercontent.com/magluie/mappd/master/agegender.csv';
    
   
    // async-function is ; await only can be used in async function cannot be used single
    // async return a Promise object, await is waiting for this promise's return value and then run it
    // await is waiting for Promise object so it should be a Promise object behind but no need to write then() it will get return value directly
    // e.g. async function test() {}
    // console.log(test())   // printout Promise { undefined }
    // e.g. async function test() {
    //     let result = await new Promise((resolve, reject) => {
    //       setTimeout(() => {
    //         resolve('success')
    //       })
    //     })
    //     console.log(result)
    //   }
    //   test()
    async componentDidMount () {
        const response = await axios.get(this.url);
        const rows = response.data.split("\n");
        console.log(rows[0].split(","));

        const counties = [];
        const service = [];


        let allCountyTotal = 0;

        for( let i = 1; i < rows.length; i++) {
            const row = rows[i].split(",");
            const countyName = row[0];
            const atwenty = Number(row[1]);
            const athirty = Number(row[2]);
            const afourty = Number(row[3]);
            const afifty1 = Number(row[4]);
            const afifty2 = Number(row[5]);
            const asixty1 = Number(row[6]);
            const asixty2 = Number(row[7]);
            const aseventy1 = Number(row[8]);
            const aseventy2 = Number(row[9]);
            const aeighty1 = Number(row[10]);
            const aeighty2 = Number(row[11]);
            const malenum = Number(row[12]);
            const femalenum = Number(row[13]);
            const total = Number(row[14]);
            const serviceName = row[15]
            // .replace(/"/g, "");delete“
            //as the number should not be string
            // console.log(countyName);
            console.log(aeighty1);
          

            if(countyName !== "" && serviceName !== "") {
               
                counties.push({
                    name:countyName,
                    total: total,
                    female: femalenum,
                    male: malenum,
                    twenty: atwenty,
                    thirty: athirty,
                    fourty: afourty,
                    fifty1: afifty1,
                    fifty2: afifty2,
                    sixty1: asixty1,
                    sixty2: asixty2,
                    seventy1:aseventy1,
                    seventy2: aseventy2,
                    eighty1: aeighty1,
                    eighty2:aeighty2,
                
                    service: serviceName,

                });
            }
                //  else {
                //     counties.push({
                //         // name:countyName,
                //         total: total,
                //  });
                    
                allCountyTotal += total;
            // }
            
        }

        //make the loading show a bit so set the await time
        await new Promise((s) => setTimeout(s,500));

        this.setState({
            counties:counties,
            allCountyTotal:allCountyTotal,
            service:service,
        });
    }

    //https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    handleOnRowSelected =(countyToUpdate) =>{
        const counties =[...this.state.counties];
        const countyIndex = counties.findIndex(
            (c) => c.name === countyToUpdate.name,
            (c) => c.female === countyToUpdate.female,
            (c) => c.male === countyToUpdate.male,
            (c) => c.twenty=== countyToUpdate.twenty,
            (c) => c.thirty === countyToUpdate.thirty,
            (c) => c.fourty === countyToUpdate.fourty,
            (c) => c.fifty1 === countyToUpdate.fifty1,
            (c) => c.fifty2 === countyToUpdate.fifty2,
            (c) => c.sixty1 === countyToUpdate.sixty1,
            (c) => c.sixty2 === countyToUpdate.sixty2,
            (c) => c.seventy1 === countyToUpdate.seventy1,
            (c) => c.seventy2 === countyToUpdate.seventy2,
            (c) => c.eighty1 === countyToUpdate.eighty1,
            (c) => c.eighty2 === countyToUpdate.eighty2,
        );
        const county = {
            name: countyToUpdate.name,
            total: countyToUpdate.total,
            service: countyToUpdate.service,
            female: countyToUpdate.female,
            male: countyToUpdate.male,
            twenty: countyToUpdate.twenty,
            thirty: countyToUpdate.thirty,
            fourty: countyToUpdate.fourty,
            fifty1: countyToUpdate.fifty1,
            fifty2: countyToUpdate.fifty2,
            sixty1: countyToUpdate.sixty1,
            sixty2: countyToUpdate.sixty2,
            seventy1:countyToUpdate.seventy1,
            seventy2: countyToUpdate.seventy2,
            eighty1: countyToUpdate.eighty1,
            eighty2:countyToUpdate.eighty2,

            //get the oppisit value
            selected: !countyToUpdate.selected,
        };
       
        
        //replace the selected county inside the countyindex
        counties[countyIndex] = county;
        this.setState({counties, selectedCounties: counties.filter((c) =>c.selected),
        });
    };

    sortByTotal =(countyA, countyB) =>{
        if(countyB.total > countyA.total) return 1;
        else if (countyB.total <countyA.total) return -1;
        else return 0;
    };

    handleOnSortByTotal = (event) =>{
        this.handleOnSort(event, this.sortByTotal);
    };

    sortByCountyName =(countyA, countyB) =>{
        if(countyA.name > countyB.name) return 1;
        else if (countyA.name <countyB.name) return -1;
        else return 0;
    };

    handleOnSortByCountyName = (event) =>{
       this.handleOnSort(event, this.sortByCountyName);
    };

    handleOnSort = (event,sortBy) =>{
        event.preventDefault();
        const counties = [...this.state.counties]
        counties.sort(sortBy);
        //the spread Operator included everthing in that array, by give [] dress it into a new array
        //and sort it by function sorbytotal
        this.setState({counties});
    };

    


    render() {
        const { counties, allCountyTotal, selectedCounties}=this.state;
        // const [data, setData] = useState ([]);
        
        //     useEffect(() => {
        //         csv('agegender.csv').then(data =>{
        //             setData(data);
        //         });
        //     },[]);
        
        //     console.log(data);

        return (           
            <div>
                {/* {allCountyTotal === 0? <Loading /> :  */}
                <div>
    {/* <h1 counties={selectedCounties} style={{textAlign:'left'}}>{this.counties} : {this.numberWithCommas(allCountyTotal)}</h1> */}
                    {/* <div><MyMap onClick= {this.handleOnRowSelected}/></div> */}
                    
                    <MyMap />

                    <div className='gender'>
                    <Gender counties={selectedCounties}/></div>
                    <div className='charts'>
                     <Age className = 'age' counties={selectedCounties} /></div>
                             
                    <CountyTable 
                counties = {counties} 
                onSortByTotal = {this.handleOnSortByTotal} 
                onSortByCountyName = {this.handleOnSortByCountyName} 
                onRowSelected = {this.handleOnRowSelected}
                /> 

                    <Advicebox />
                   
                
                </div>
                
            </div>
        );
    }
}

export default Pd;