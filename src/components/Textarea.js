import React, {createRef, useEffect} from "react";

export default function Textarea(props) {
    const ref = createRef();

    useEffect(() => {
        window.M.textareaAutoResize(ref.current);
    });

    return (
        <textarea ref={ref} className="materialize-textarea" {...props}/>
    );
}
