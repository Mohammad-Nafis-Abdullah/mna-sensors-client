/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";


const useFetch = (url,initValue=[],callback=()=>0)=> {
    const [data,setData] = useState(initValue);
    const [loading,setLoading] = useState(false);
    const [fetch,setFetch] = useState(false);
    const [link,setLink] = useState(url);

    useEffect(()=> {
            setLoading(true);
            axios.get(link, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            }).then(({data})=> {
                callback(data);
                setData(data);
                setLoading(false);
            }).finally(()=> {
                setLoading(false);
            });
    },[fetch])

    return {data, loading, refetch:(URL)=> {
        if (URL) {
            setLink(URL)
        }
        setFetch(false);
    }};
}

export default useFetch;