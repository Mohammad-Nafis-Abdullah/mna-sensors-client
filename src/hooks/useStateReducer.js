import { useReducer } from "react";

const initialState = { // declare initial state here as {key : value} pair
    user:null,
    configSensor:null,
};

const reducer = (state,action)=> { // declare logic of reducer function that handle the changing of state
    switch (action.type) {
        /* case '':
            return {...state, key: new_value}; */
    
        case 'user': // user profile picture url state
            return {...state,user:action.value};

        // case 'userRefetch':
        //     return {...state,userRefetch:action.value};

        case 'configSensor':
            return {...state,configSensor:action.value};

        default:
            return {...state};
    }
}

const useStateReducer = () => {
    const [state,setState] = useReducer(reducer,initialState);

    const dispatch = (type,value)=> {
        setState({type:type,value:value});
    }

    return [state,dispatch];
};

export default useStateReducer;