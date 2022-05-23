/* eslint-disable no-unused-vars */
import axios from "axios";
import { useQuery } from "react-query";
import Loading from "../components/public/Loading";

const useFetch = (url)=> {

    const {data:myData,isLoading,refetch} = useQuery('myData',()=> 
        axios.get(url).then((data)=> {
            // console.log(data.data);
            return data.data;
        })
    );

    if (isLoading) {
        return <Loading/>
    }

    return {myData,refetch};
}

export default useFetch;