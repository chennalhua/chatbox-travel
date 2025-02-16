import dayjs from 'dayjs';
import { ADD_TODO, TOGGLE_TODO, DELETE_TODO, TARGET_TODO } from '../action/todoAction';
import { loadData } from '../storage/localStorage';

const initialState = {
    todos: loadData('_TODOS') || [],
    targetTodo: null
};

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, { id: dayjs().valueOf(), ...action.payload, completed: false }]
            };
        case TOGGLE_TODO:
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
                )
            };
        case DELETE_TODO:
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload)
            };
        case TARGET_TODO:
            return {
                ...state,
                targetTodo: state.todos.find(todo => todo.id === action.payload)
            };
        default:
            return state;
    }
};

export default todoReducer;