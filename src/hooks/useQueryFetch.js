/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useContext, useEffect, useState } from "react";
import { StateContext } from "../App";
import { queryClient } from "../index";

export const useQueryFetch = (key, url, initialValue = []) => {
    const [fetchUrl, setFetchUrl] = useState(url);
    const [state] = useContext(StateContext);
    // console.log(state);

    const { isLoading, data, isFetching } = useQuery({
        queryKey: [key],
        queryFn: () => axios
            .get(fetchUrl,{
                headers:{
                    uid:state.user?.uid || '',
                },
                withCredentials:true
            })
            .then((res) =>  res.data),
        initialData: initialValue,
    });

    const refetch = (newUrl = url) => {
        setFetchUrl(newUrl);
        queryClient.invalidateQueries({ queryKey: [key] });
    };

    useEffect(()=> {
        if (state.user) {
            refetch();
        }
    },[state.user])

    return { data: data, loading: isLoading || isFetching, refetch };
}