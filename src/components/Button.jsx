import React from 'react'

function Button({
    children,
    className = "",
    ...props
}) {
    return (
        <button
            className={`${className} px-4 py-2`}
            {...props}
            >
            {children}
        </button>
    )
}

export default Button