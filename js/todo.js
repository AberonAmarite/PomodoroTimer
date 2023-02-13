import { state } from "./state.js";

const titleElem = document.querySelector('.title');
const todoListElem = document.querySelector('.todo__list');

const li = document.createElement('li');
li.classList.add('todo__item');

const todoAddBtn = document.createElement('button');
todoAddBtn.classList.add('todo_add');
todoAddBtn.textContent = 'Add new task';
li.append(todoAddBtn);

const getTodo = () => {
    const todoList = JSON.parse(localStorage.getItem('pomodoro') || '[]');

    return todoList;
}

const createTodoListItem = todo => {
    if(todo.id !== 'default'){
        const todoItem = document.createElement('li');
        todoItem.classList.add('todo__item');

        const todoItemWrapper = document.createElement('div');
        todoItemWrapper.classList.add('todo__item-wrapper');
        todoItem.append(todoItemWrapper);

        const todoBtn = document.createElement('button');
        todoBtn.classList.add('todo__btn');
        todoBtn.textContent = todo.title;

        const editBtn = document.createElement('button');
        editBtn.classList.add('todo__edit');
        editBtn.ariaLabel = 'Edit';

        const delBtn = document.createElement('button');
        delBtn.classList.add('todo__del');
        delBtn.ariaLabel = 'Delete';

        todoItemWrapper.append( todoBtn, editBtn, delBtn);

        todoListElem.prepend(todoItem);

        todoBtn.addEventListener('click', () => {
            const todoList = getTodo();
            let index = Array.from(todoList).map(el => el.id).indexOf(todo.id);
            state.activeTodo = todoList[index];

            showTodo();
        })
        editBtn.addEventListener('click', () => {
            const title = prompt('Edit the task name');
            todoBtn.textContent = title;
            const todoList = getTodo();
            let index = Array.from(todoList).map(el => el.id).indexOf(todo.id);
            todoList[index].title = title;
            localStorage.setItem('pomodoro', JSON.stringify(todoList));
            showTodo();
        })
        delBtn.addEventListener('click', () => {
            todoListElem.removeChild(todoItem);
            
            const todoList = getTodo();
            let index = Array.from(todoList).map(el => el.id).indexOf(todo.id);
            todoList.splice(index, 1);
            localStorage.setItem('pomodoro', JSON.stringify(todoList));
            showTodo();
        })
        
    }
}

const addTodo = (title) => {
    const todo = {
        title,
        pomodoro: 0,
        id: Math.random().toString(16).substring(2,8),
    };

    const todoList = getTodo();
    todoList.push(todo);

    localStorage.setItem('pomodoro', JSON.stringify(todoList));
    return todo;
}

const renderTodoList = (list) => {
    todoListElem.textContent = '';
    list.forEach(createTodoListItem);

    todoListElem.append(li);
}


const showTodo = () => {
    titleElem.textContent = state.activeTodo.title;
    // show how many pomodoros done
    const count = document.querySelector('.count_num');
    count.textContent = state.activeTodo.pomodoro;
}

export const initTodo = () => {
    const todoList = getTodo();

    if(!todoList.length){
        state.activeTodo = [{
            id: 'default',
            pomodoro: 0,
            title: 'Pomodoro'
        }]
    }else 
        state.activeTodo = todoList[todoList.length - 1];


    showTodo();

    renderTodoList(todoList);

    todoAddBtn.addEventListener('click', () => {
        const title = prompt('Enter the task name');
        const todo = addTodo(title);
        createTodoListItem(todo);
    });
}