/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import { StateContext } from "../App";


const useFetch = (url,initValue=[],callback=()=>{return})=> {
    const [state] = useContext(StateContext);
    const [data,setData] = useState(initValue);
    const [loading,setLoading] = useState(false);
    const [fetch,setFetch] = useState(false);
    const [link,setLink] = useState(url);

    useEffect(()=> {
            setLoading(true);
            axios.get(link, {
                headers: {
                    uid: state.user?.uid,
                },
            }).then(({data})=> {
                callback(data);
                setData(data);
                setLoading(false);
            }).finally(()=> {
                setLoading(false);
            });
    },[fetch,state.user])

    return {data, loading, refetch:(URL)=> {
        if (URL) {
            setLink(URL)
        };
        setFetch(prev=>!prev);
    }};
}

export default useFetch;