import React, { forwardRef } from "react";
import JoditEditor from "jodit-react";

const RTE = forwardRef(function RTE({ value = "", onChange }, ref) {
  return (
    <JoditEditor
      ref={ref}
      value={value}
      onBlur={(newContent) => onChange(newContent)} // when user stops typing
      config={{
        readonly: false,
        height: 400,
        theme: "default",
        toolbarSticky: false,
      }}
    />
  );
});

export default RTE;
