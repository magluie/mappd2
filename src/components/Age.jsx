import React, {Component} from 'react';
import {Bar, Line} from 'react-chartjs-2';
import '../index.css';


class Age extends Component{

    render () {
        const {counties} = this.props;

        // if (counties.length === 0) return <div>
        //     <h2>Please select a county</h2>
        // </div>;

        const data ={
            // labels:counties.map((county) =>county.name),
            labels: ['20-29','30-39','40-49','50-54','55-59','60-64','65-69','70-74','75-79','80-84','85+'],
            
            datasets:[
                {
                    label:'PD Cases',
                
                    data: 
                    [
                        counties.map((county) => county.twenty),
                        counties.map((county) => county.thirty),
                        counties.map((county) => county.forty),
                        counties.map((county) => county.fifty1),
                        counties.map((county) => county.fifty2),
                        counties.map((county) => county.sixty1),
                        counties.map((county) => county.sixty2),
                        counties.map((county) => county.seventy1),
                        counties.map((county) => county.seventy2),
                        counties.map((county) => county.eighty1),
                        counties.map((county) => county.eighty2),
                    ],
                    backgroundColor:color2,
                },
                // {
                //     data: counties.map((county) => county.male),
                //     backgroundColor:colors,
                // },
            ],
    }
        
        return (
            <div>
                <Line
                data={data} 
                // width={100} height={200} 
                options = {{
                    title:{
                        display:true,
                        text:'Cases In Age Breakdown',
                        // fontStyle:
                        fontSize:26
                    
                      },
                      scales:{
                          yAxes:[{
                              display:true,
                              ticks:{
                                //   suggestedMax:400,
                                // maxTicksLimit:11,
                                max:400,
                                min:0,
                                stepSize:50,
                              }
                          }]
                      }
                     
                
                }}
                />
            </div>
        );
    }
}
export default Age;

let color2 = [
    "pink",
    "green",
    "white",
    "darkgreen",
    "blue",
    "yellow",
    "red",
    "black",
    "purple",
    "lightyellow",
    "lightgreen",
];


