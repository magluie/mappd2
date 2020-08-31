// import React, {Component} from 'react';
// import { AutoComplete, ComboBox, DropDownList, MultiSelect } from '@progress/kendo-react-dropdowns';
// import ReactDOM from 'react-dom';

// class Plaintext extends React.Component {
//     counties = [
//         {  Total :'Cork 1768 '},
//         {  Total :'Carlow 382 '},

//     ];
//     state = {
//         // Since the reference of the initial value is not from the 'sports' collection,
//         // 'dataItemKey' have to be set.
//         value:   {  Total :'Cork 1768 '}
//     };

//     handleChange = (event) => {
//         this.setState({
//             value: event.target.value
//         });
//     }

//     render() {
//         return (
//             <div>
//                 <div className="example-config">
//                     Your County: {JSON.stringify(this.state.value)}
                   
//                 </div>
//                 <ComboBox
//                     data={this.counties}
//                     textField="text"
//                     dataItemKey="id"
//                     value={this.state.value}
//                     onChange={this.handleChange}
//                 />
//             </div>
//         );
//     }
// }


// export default Plaintext;


import React from 'react';
import ReactDOM from 'react-dom';

import { DropDownList } from '@progress/kendo-react-dropdowns';

class Plaintext extends React.Component {
    counties = [ "Cork: 1726","Carlow: 210" ];
    state = {
        value: "Cork: 1726"
    };

    handleChange = (event) => {
        this.setState({
            value: event.target.value
        
        });
    }

    render() {
        return (
            <div>
                <div className="plaintext">
                     {this.state.value}
                </div>
                <DropDownList className='plaintext'
                    data={this.counties}
                    value={this.state.value}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}


export default Plaintext;

