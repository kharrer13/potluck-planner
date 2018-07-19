import React from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'react-datepicker';
import { Input } from '../../node_modules/@material-ui/core';

const NewPotluckForm = () => (
  <div>
    <Input
      id="potluckTitle"
      placeholder="Potluck Title"
    />
    <br />
    <Input
      id='potluckLocation'
      placeholder='Potluck Location'
    /><br />
  </div>
);

export default NewPotluckForm;