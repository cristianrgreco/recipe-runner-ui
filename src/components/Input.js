import React, {forwardRef, useEffect} from "react";

const Input = forwardRef((props, ref) => {
    useEffect(() => {
        window.M.updateTextFields();
    });

    return (
        <input ref={ref} {...props}/>
    );
});

export default Input;
