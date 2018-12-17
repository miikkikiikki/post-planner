import React, { Component } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import './Calendar.scss'

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    moment.locale('en');
  }

  handleChange(date) {
    this.props.onChange(date)
  }

  render() {
    return (
      <DatePicker
        selected={this.props.value}
        onChange={this.handleChange}

        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        dateFormat="MMMM d, yyyy h:mm aa"
        timeCaption="time"
        popperPlacement="top-end"
        popperModifiers={{
          offset: {
            enabled: true,
            offset: '5px, 10px'
          },
          preventOverflow: {
            enabled: true,
            escapeWithReference: false,
            boundariesElement: 'viewport'
          }
        }}
      />
    );
  }
}

export default Calendar;