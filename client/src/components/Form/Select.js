import React from "react";

export const Select = (props) => {
  return (
    <div className="form-group">
      <label for={props.selectName}>{props.selectLabel}</label>
      <select className="form-control" name={props.selectName} id={props.selectName}>
        {props.selectData.map(user =>
          <option value={user.id}>{user.firstName} {user.lastName}</option>
        )}
      </select>
    </div>
  )
};