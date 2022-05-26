/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import Loading from "../components/public/Loading";

const useFetch = (url,headerValue={},ref='tools')=> {
    const [data,setData] = useState([]);
    const { isLoading, refetch } = useQuery(ref, () =>
        axios.get(url,headerValue).then((data) => {
            setData(data?.data);
            refetch();
        })
    );
    
    if (isLoading) {
        return <Loading />;
    }
    return {data,refetch};
}

export default useFetch;