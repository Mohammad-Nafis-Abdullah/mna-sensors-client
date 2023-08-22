import { useContext} from "react";
import { StateContext } from "../App";

const useAdmin = () => {
    let admin;
    const [state] = useContext(StateContext);

    switch(state.user?.role){
        case "owner":
            admin = true;
            break;

        case "admin":
            admin = true;
            break;
        
        default:
            admin = false;
            break;
    }

    return admin;
};

export default useAdmin;