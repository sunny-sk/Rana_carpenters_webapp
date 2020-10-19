import React from "react";

const Select = ({
  defaultValue,
  options = [],
  optionName,
  onChange,
  label,
}) => {
  return (
    <>
      <label htmlFor="selectCategories">{label}</label>
      <select
        value={defaultValue}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        className="form-control select-category shadow-sm"
        id="selectCategories"
      >
        {options.map((category, i) => (
          <option key={i}>{category[optionName]}</option>
        ))}
      </select>
    </>
  );
};

export default React.memo(Select);
