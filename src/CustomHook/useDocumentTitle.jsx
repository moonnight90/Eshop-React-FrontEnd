import React, { useEffect } from 'react'

function useDocumentTitle(title) {
    useEffect(() => {
        document.title = title;
    }, [title])
    return (title)=>document.title=title;
}

export default useDocumentTitle