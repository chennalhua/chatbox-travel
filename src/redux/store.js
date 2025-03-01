import { createStore, combineReducers } from 'redux';
import authReducer from './reducer/authReducer';
import todoReducer from './reducer/todoReducer';
import userReducer from './reducer/userReducer';
import chatReducer from './reducer/chatReducer';
import { saveData } from './storage/localStorage';

const store = createStore(
    combineReducers({
        authRe: authReducer,
        todosRe: todoReducer,
        userRe: userReducer,
        chatRe: chatReducer,
    })
);

// 監聽 Redux store，變更時儲存至 localStorage
store.subscribe(() => {
    const { todosRe, userRe, authRe, chatRe } = store.getState();

    const dataToSave = {
        _TODOS: todosRe.todos,
        _USER_DATA: userRe.userData,
        _CHECK_LOGIN: userRe.checkLogin,
        _TDX_TOKEN: authRe.tdxToken,
        _HISTORY: chatRe.chatData,
        _TAG: chatRe.tagData,
    };

    Object.entries(dataToSave).forEach(([key, value]) => saveData(key, value));
});

export default store;