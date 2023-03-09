/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";


const useFetch = (url,initValue=[],callback=()=>{return})=> {
    const [user] = useAuthState(auth);
    const [data,setData] = useState(initValue);
    const [loading,setLoading] = useState(false);
    const [fetch,setFetch] = useState(false);
    const [link,setLink] = useState(url);

    useEffect(()=> {
            setLoading(true);
            axios.get(link, {
                headers: {
                    uid: user?.uid,
                },
            }).then(({data})=> {
                callback(data);
                setData(data);
                setLoading(false);
            }).finally(()=> {
                setLoading(false);
            });
    },[fetch,user])

    return {data, loading, refetch:(URL)=> {
        if (URL) {
            setLink(URL)
        };
        setFetch(prev=>!prev);
    }};
}

export default useFetch;