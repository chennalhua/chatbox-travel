import TodoForm from 'components/todo/TodoForm';
import TodoCard from 'components/todo/TodoCard';

const TodoApp = () => {
    return (
        <div className='vh-100 bg-primary-light'>
            <div className="container">
                <div className='mb-3'><TodoForm /></div>
                <div className='my-2'><TodoCard /></div>
            </div>
        </div>
    );
};
export default TodoApp;
