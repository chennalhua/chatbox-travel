import { loadData } from "../storage/localStorage";

const initialState = {
    tdxToken: loadData('_TDX_TOKEN') || null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TDX_TOKEN':
            return {
                ...state,
                tdxToken: action.payload
            };
        default:
            return state;
    }
};

export default authReducer;