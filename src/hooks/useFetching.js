import { useEffect, useState } from "react"

const useFetching = (url,initialValue=[],dependencies=[])=> {
    const [fetchedData,setFetch] = useState(initialValue);

    useEffect(()=> {
        fetch(url).then(response => response.json()).then(data => setFetch([...data]))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },dependencies);

    return fetchedData;
}

export default useFetching;