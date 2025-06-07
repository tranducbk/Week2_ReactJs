const {
    getAllTodos,
    addNewTodo,
    updateTodoById,
    deleteTodoById
} = require('../database/TodoRepository');

/**
 * @description Get all todos
 * @returns {Object: {
 *  success: boolean,
 *  data: Array
 * }} - Todo object
 */
async function getTodos(ctx) {
    try {
        const todos = getAllTodos();
        ctx.status = 200;
        ctx.body = {
            success: true,
            data: todos
        }
    }
    catch (e) {
        ctx.status = 500;
        ctx.body = {
            success: false,
            error: e.message
        }
    }
}

/**
 * @description Add a new todo
 * @param {Object: {
 *  title: string,
 *  description: string,
 *  completed: boolean
 * }} ctx - Koa context
 * @returns {Object: {
 *  success: boolean,
 *  data: Object
 * }} - Todo object
 */
async function addTodo(ctx) {
    try {
        const { title } = ctx.request.body;
        if (!title) {
            ctx.status = 400;
            ctx.body = {
                success: false,
                error: 'Title is required'
            };
            return;
        }
        const newTodo = addNewTodo({ title });
        ctx.status = 201;
        ctx.body = {
            success: true,
            data: newTodo
        }
    }
    catch (e) {
        ctx.status = 400;
        ctx.body = {
            success: false,
            error: e.message
        }
    }
}

/**
 * @description Update a todo by ID
 * @param {Object: {
 *  id: string,
 *  title: string,
 *  completed: boolean
 * }} ctx - Koa context
 * @returns {Object: {
 *  success: boolean,
 *  data: Object
 * }} - Todo object
 */
async function updateTodo(ctx) {
    try {
        const { id } = ctx.params;
        const { title, completed } = ctx.request.body;
        const updatedTodo = updateTodoById(parseInt(id), { title, completed });
        ctx.status = 200;
        ctx.body = {
            success: true,
            data: updatedTodo
        }
    }
    catch (e) {
        ctx.status = e.message === 'Todo not found' ? 404 : 400;
        ctx.body = {
            success: false,
            error: e.message
        }
    }
}

/**
 * @description Delete a todo by ID
 * @param {Object: {
 *  id: string
 * }} ctx - Koa context
 * @returns {Object: {
 *  success: boolean,
 *  data: Object
 * }} - Todo object
 */
async function deleteTodo(ctx) {
    try {
        const { id } = ctx.params;
        const deletedTodo = deleteTodoById(parseInt(id));
        ctx.status = 200;
        ctx.body = {
            success: true,
            data: deletedTodo
        }
    }
    catch (e) {
        ctx.status = e.message === 'Todo not found' ? 404 : 400;
        ctx.body = {
            success: false,
            error: e.message
        }
    }
}

module.exports = {
    getTodos,
    addTodo,
    updateTodo,
    deleteTodo
}
