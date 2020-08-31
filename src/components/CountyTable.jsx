import React, {Component} from 'react';

class CountyTable extends Component {
    // why state = {} is unnecessary?
    render () {
            const {counties, onSortByTotal, onSortByCountyName, onRowSelected} = this.props;
        return (
        // https://getbootstrap.com/docs/4.5/content/tables/
        <table className='table'>
            <thead className='thead-dark'>
                <tr>
                    <th>
                    <a href = '/' onClick ={onSortByCountyName}>County</a>
                    </th>
                    <th>
                    <a href = '/' onClick ={onSortByTotal}>Total</a>
                    </th>
                    <th>Health Service for PD patients</th>
                </tr>
            </thead>

            <tbody>
                {
                    counties.map((county )=> {
                        const style = {
                            backgroundColor: 'lightYellow',
                            
                            
                        };
                        return(
                            <tr key={county.name} 
                            style={county.selected ? style : null}
                            onClick={() => onRowSelected(county)}>
                                <td>{county.name}</td>
                                <td>{county.total}</td>
                                <td>{county.service}</td>
                            </tr>

                        );
                    })}
            </tbody>
        </table>
        );
    }
}

export default CountyTable;