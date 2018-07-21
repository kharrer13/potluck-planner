import React from "react";

export const Select = (props) => {
  return (
    <div className="form-group">
      <label htmlFor={props.selectName}>{props.selectLabel}</label>
      <select
        className="form-control"
        name={props.selectName}
        id={props.selectName}
        onChange={props.onChange}
      >
        {props.selectData.map(element =>
          <option value={element.id} key={element.id}>{element[props.selectKey]}</option>
        )}
      </select>
    </div>
  )
};