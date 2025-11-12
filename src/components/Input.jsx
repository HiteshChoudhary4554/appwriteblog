import React, { forwardRef } from "react";

const Input = forwardRef(({ label, type = "text", id, ...props }, ref) => {
  return (
    <div className="mb-5">
      {label && (
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor={id}
        >
          {label}
        </label> 
      )}
      <input
        ref={ref}
        className="shadow appearance-none border-1 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:border-1"
        type={type}
        id={id}
        {...props}
      />
    </div>
  );
});
export default Input;
