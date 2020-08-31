import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  static defaultProps = {
    visuals: ['Carlow', 'Cork']
  }

  handleChange(event) {
    //logging for testing
    console.log('testing value in Dropdown.js: ', event.target.value);
    this.props.onVisualChange(event.target.value);
  }

  render() {
    let visualOptions = this.props.visuals.map(visual => {
      return <option key={visual} value={visual}>{visual}</option>
    });
    return (
      <div className="dropdown">
        <label>Select Your County</label><br />
          <select id="counties"  value={this.props.value} onChange={this.handleChange}>
            {visualOptions}
          </select>
      </div>
    );
  }
}

Dropdown.propTypes = {
  onVisualChange: PropTypes.func,
  visuals: PropTypes.array,
  value: PropTypes.string
};

export default Dropdown;