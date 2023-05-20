import axios from "axios";
import { useEffect, useState } from "react";

const useToken = (user) => {
    const [token, setToken] = useState("");

    useEffect(() => {
        // console.log(user?.user?.email);
        const email = user?.user?.email;
        const name = user?.user?.displayName || '';
        const currentUser = { email: email, name: name };
        if (email) {
            axios
                .put(`${process.env.REACT_APP_Backend_url}/user/${email}`, currentUser)
                .then((data) => {
                    const accessToken = data?.data?.accessToken;
                    localStorage.setItem("accessToken", accessToken);
                    setToken(accessToken);
                    //   console.log(data.data.result);
                });
        }
    }, [user]);
    return [token];
};
export default useToken;