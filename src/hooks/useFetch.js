/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Loading from "../components/public/Loading";

const useFetch = (url,initValue=[],callback=()=>0)=> {
    const [data,setData] = useState(initValue);
    const [loading,setLoading] = useState(false);
    const [fetch,setFetch] = useState(false);

    useEffect(()=> {
        const fn = async () => {
            setLoading(true);
            const { data } = await axios.get(url, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });
            callback(data);
            setData(data);
            setLoading(false);
        };
        fn();
    },[fetch])

    return {data, loading, refetch:()=> {
        setFetch(false);
    }};
}

export default useFetch;