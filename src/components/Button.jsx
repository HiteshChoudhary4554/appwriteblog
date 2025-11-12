import React, { forwardRef } from "react";

function Button({ label, type = "submit", ...props }, ref) {
  return (
    <button
      type={type}
      ref={ref}
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1.5 me-2 dark:bg-blue-600 focus:outline-none dark:focus:ring-blue-800 cursor-pointer"
      {...props}
    >
      {label}
    </button>
  );
}

export default forwardRef(Button);
