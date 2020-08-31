import React, { Component, useState, useEffect} from 'react';
import { Doughnut } from 'react-chartjs-2';
import '../index.css';

class Gender extends Component {

    render () {
        const {counties} = this.props;
        
        // if (counties.length === 0) return <div>
        //     <h2>Please select a county</h2>
        // </div>;

        const data ={
            // labels:counties.map((county) =>county.name),
            labels: ['Female cases','Male cases'],
            
            datasets:[
                {
                    data: 
                    [counties.map((county) => county.female),
                    counties.map((county) => county.male),
                    ],
                    backgroundColor:colors,
                },
                // {
                //     data: counties.map((county) => county.male),
                //     backgroundColor:colors,
                // },
            ],
    };
        
        return (
            <div>
                <Doughnut 
                data={data} 
               
                options = {{
                    title:{
                        display:true,
                        text:'Cases In Gender Breakdown',
                        // fontStyle:
                        fontSize:26
                    
                      },
                }}
                ></Doughnut>
            </div>
        );
    }
}
export default Gender;

let colors = [
    'purple',
    'blue'

];