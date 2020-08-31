import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Carlowgender from './components/Carlowgender';
import Carlowage from './components/Carlowage';
import Corkgender from './components/Corkgender';
import Corkage from './components/Corkwage';
import {Bar, Doughnut} from 'react-chartjs-2';

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: props.chartData,
      chartType: props.chartType
    }
}
    componentWillReceiveProps(nextProps) {
        if (nextProps.chartType !== this.state.chartType) {
          this.setState({chartType: nextProps.chartType})
        }
      }

  render () {
    let chartToBeDisplayed = null;
    switch(this.state.chartType) {
      case 'Carlow':
        chartToBeDisplayed = <Carlowage chartData={this.state.chartData} />;
        chartToBeDisplayed = <Carlowgender chartData={this.state.chartData} />;
        break;
      case 'Cork':
        chartToBeDisplayed = <Corkage chartData={this.state.chartData} />;
        chartToBeDisplayed = <Corkgender chartData={this.state.chartData} />;
        break;
  
      default:
        console.log('Something went wrong...');
    }
    return (
      <div>
        {chartToBeDisplayed}
      </div>
    );
  }
}

Chart.propTypes = {
    chartData: PropTypes.object,
    chartType: PropTypes.string,
  };




export default Chart;