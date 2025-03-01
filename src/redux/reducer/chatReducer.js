import { ADD_MESSAGE, ADD_TAG, CLEAR_MESSAGES, REMOVE_TAG, SET_MES_VAL, CLEAR_TAG } from "../action/chatAction";

const initialState = {
    chatData: JSON.parse(localStorage.getItem("_HISTORY")) || [],
    tagData: JSON.parse(localStorage.getItem("_TAG")) || [],
    mesVal: "",
};

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            const updatedChatData = [...state.chatData, action.payload];
            return { ...state, chatData: updatedChatData };

        case ADD_TAG:
            const updatedTagData = [...state.tagData, action.payload];
            return { ...state, tagData: updatedTagData };

        case REMOVE_TAG:
            return {
                ...state,
                tagData: state.tagData.filter(data => data.name !== action.payload)
            };
        case CLEAR_TAG:
            localStorage.removeItem("_TAG");
            return { ...state, tagData: [] };

        case CLEAR_MESSAGES:
            localStorage.removeItem("_HISTORY");
            return { ...state, chatData: [] };

        case SET_MES_VAL:
            return { ...state, mesVal: action.payload };

        default:
            return state;
    }
};

export default chatReducer;
