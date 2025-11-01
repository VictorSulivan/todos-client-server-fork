import { readTodos, writeTodos } from './storage.js';

export async function getAllTodos() {
  return await readTodos();
}

export async function addTodo(text) {
  const todos = await readTodos();
  const newTodo = {
    id: Date.now().toString(),
    text,
    completed: false,
    createdAt: new Date().toISOString()
  };
  todos.push(newTodo);
  await writeTodos(todos);
  return newTodo;
}

export async function toggleTodo(id) {
  const todos = await readTodos();
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    await writeTodos(todos);
  }
  return todo;
}

export async function deleteTodo(id) {
  const todos = await readTodos();
  const filtered = todos.filter(t => t.id !== id);
  await writeTodos(filtered);
  return { success: true };
}
