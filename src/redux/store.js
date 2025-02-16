import { createStore, combineReducers } from 'redux';
import todoReducer from './reducer/todoReducer';
import userReducer from './reducer/userReducer';
import { saveData } from './storage/localStorage';
import { Encrypt } from 'assets/function/AES';

const store = createStore(combineReducers({
    todosRe: todoReducer,
    userRe: userReducer
}));

// 監聽 Redux store，每當 `todos` 或 `user` 變更時，儲存至 localStorage
store.subscribe(() => {
    const state = store.getState();
    saveData('_TODOS', state.todosRe.todos); // 存 todos 陣列
    saveData('_USER_DATA', state.userRe.userData);
    saveData('_CHECK_LOGIN', state.userRe.checkLogin);
});
export default store;