const fs = require('fs');
const path = require('path');
const {data: todos} = require('./todos.json');

/**
 * @description Get all todos
 * @returns {Array: {
 *  id: number,
 *  title: string,
 *  description: string,
 *  completed: boolean
 * }} - Array of todos
 */
function getAllTodos() {
    return todos;
}

/**
 * @description Add a new todo
 * @param {Object: {
 *  id: number,
 *  title: string,
 *  description: string,
 *  completed: boolean
 * }} data - Todo data
 * @returns {Object: {
 *  id: number,
 *  title: string,
 *  description: string,
 *  completed: boolean
 * }} - New todo
 */
function addNewTodo(data) {
    if (!data.title) {
        throw new Error('Title is required');
    }
    let maxId = 0;
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id > maxId) {
            maxId = todos[i].id;
        }
    }
    const newTodo = {
        id: maxId + 1,
        ...data,
        completed: false
    }
    const updatedTodos = [...todos, newTodo];
    fs.writeFileSync(path.join(__dirname, 'todos.json'), JSON.stringify({
        data: updatedTodos
    }, null, 2));
    return newTodo;
}

/**
 * @description Update a todo by ID
 * @param {number} id - Todo ID
 * @param {Object: {
 *  title: string,
 *  description: string,
 *  completed: boolean
 * }} data - Todo data
 * @returns {Object: {
 *  id: number,
 *  title: string,
 *  description: string,
 *  completed: boolean
 * }} - Updated todo
 */
function updateTodoById(id, data) {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) {
        throw new Error('Todo not found');
    }
    todos[todoIndex] = {...todos[todoIndex], ...data};
    fs.writeFileSync(path.join(__dirname, 'todos.json'), JSON.stringify({
        data: todos
    }, null, 2));
    return todos[todoIndex];
}

/**
 * @description Delete a todo by ID
 * @param {number} id - Todo ID
 * @returns {Object: {
 *  id: number,
 *  title: string,
 *  description: string,
 *  completed: boolean
 * }} - Deleted todo
 */
function deleteTodoById(id) {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) {
        throw new Error('Todo not found');
    }
    const deletedTodo = todos[todoIndex];
    todos.splice(todoIndex, 1);
    fs.writeFileSync(path.join(__dirname, 'todos.json'), JSON.stringify({
        data: todos
    }, null, 2));
    return deletedTodo;
}

module.exports = {
    getAllTodos,
    addNewTodo,
    updateTodoById,
    deleteTodoById
}


