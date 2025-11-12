import React, { forwardRef } from "react";

const Select = forwardRef(({ label, name, options = [], value, onChange }, ref) => {
  return (
    <div className="flex flex-col gap-2 mb-5">
      {label && (
        <label htmlFor={name} className="font-semibold text-gray-700">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        ref={ref}
        id={name}
        name={name}
        className="border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        {options.map((opt, index) => (
          <option key={index} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
});

export default Select;
