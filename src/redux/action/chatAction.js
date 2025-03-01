export const ADD_MESSAGE = "ADD_MESSAGE";
export const ADD_TAG = "ADD_TAG";
export const REMOVE_TAG = "REMOVE_TAG";
export const CLEAR_TAG = "CLEAR_TAG";
export const CLEAR_MESSAGES = "CLEAR_MESSAGES";
export const SET_MES_VAL = "SET_MES_VAL";

export const addMessage = (message) => ({
    type: ADD_MESSAGE,
    payload: message,
});

export const clearMessages = () => ({
    type: CLEAR_MESSAGES,
});

export const addTag = (message) => ({
    type: ADD_TAG,
    payload: message,
});

export const clearTag = () => ({
    type: CLEAR_TAG,
});

export const removeTag = (id) => ({
    type: REMOVE_TAG,
    payload: id,
});

export const setMesVal = (value) => ({
    type: SET_MES_VAL,
    payload: value,
});