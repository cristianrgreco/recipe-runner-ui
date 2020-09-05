import React, { useEffect } from "react";

export default function Input(props) {
  useEffect(() => {
    window.M.updateTextFields();
  });

  return <input {...props} />;
}
