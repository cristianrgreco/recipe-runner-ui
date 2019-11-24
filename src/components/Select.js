import React, {useEffect, useRef} from "react";

export default function Select({children, ...props}) {
    const ref = useRef();

    useEffect(() => {
        window.M.FormSelect.init(ref.current);
    });

    return (
        <select ref={ref} {...props}>
            {children}
        </select>
    );
}
