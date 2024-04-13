import React from "react";

//INTERNAL IMPORT
import "./Toggle.css";

const Toggle = ({ label }) => {

  return (
    <div className="Toggle">
      <div className="Toggle_switch_box">
        <input
          type="checkbox"
          className="Toggle_checkbox"
          name={label}
          id={label}
        />
        <label className="Toggle_label" htmlFor={label}>
          <span className="Toggle_inner" />
          <span className="Toggle_switch "/>
        </label>
      </div>
    </div>
  );
};

export default Toggle;
