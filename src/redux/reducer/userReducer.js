import { Decrypt, Encrypt } from "assets/function/AES";
import { loadData } from "../storage/localStorage";

const initialState = {
    userData: loadData('_USER_DATA') || {
        picture: require("assets/image/user.jpg"),
        name: "User",
    },
    checkLogin: loadData('_CHECK_LOGIN') || 'no'
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_DATA':
            return {
                ...state,
                userData: action.payload
            };
        case 'CHECK_LOGIN':
            return {
                ...state,
                checkLogin: action.payload
            };
        default:
            return state;
    }
};

export default loginReducer;