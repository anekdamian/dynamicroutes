import React from "react";

const Input = props => {
  //console.log(props.value);
  return (
    <div className="form-group">
      <input
        className={props.className}
        id={props.name}
        name={props.name}
        type={props.inputtype}
        value={props.value}
        onChange={props.handlechange}
        placeholder={props.placeholder}
        {...props}
      />
    </div>
  );
};

export default Input;