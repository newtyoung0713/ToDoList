import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/todos');
      setTodos(response.data.todos);
      console.log("Fetched todos:", response.data.todos);
    } catch (error) {
      console.error("There was an error fetching the todos!", error);
    }
  };

  const addTodo = async () => {
    if (newTodo.trim() === '') return;
    try {
      await axios.post('http://localhost:5000/todos', { description: newTodo });
      setNewTodo('');
      fetchTodos();
    } catch (error) {
      console.error("There was an error adding the todo!", error);
    }
  };
  
  const editTodo = (todo) => {
    setEditingTodo(todo);
    setNewTodo(todo.description || "");   // Ensure newTodo is always being a string
  };
  
  const updateTodo = async () => {
    if (!editingTodo) return;
    try {
      console.log("Updating todo:", editingTodo.id, "with new description:", newTodo);
      await axios.put(`http://localhost:5000/todos/${editingTodo.id}`, {
        description: newTodo || editingTodo.description,  // To keep the origin description
        completed: editingTodo.completed    // To keep the origin completed status
      });
      setNewTodo('');
      setEditingTodo(null);
      fetchTodos();   // Refresh the list, keeping it syncs
    } catch (error) {
      console.error("There was an error updating the todo!", error);
    }
  };
  
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`);
      fetchTodos();
    } catch (error) {
      console.error("There was an error deleting the todo!", error);
    }
  };

  const toggleTodo = async (id, completed) => {
    try {
      await axios.put(`http://localhost:5000/todos/${id}`, { completed: !completed });
      // // Ensure todo.id and completed match, then can change the css style
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !completed } : todo));
    } catch (error) {
      console.error("There was an error toggling the todo!", error);
    }
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <label htmlFor='todo-input'>New Todo: </label>
      <input
        id='todo-input'
        type='text'
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder='Enter a new todo'
      />
      <button onClick={editingTodo ? updateTodo : addTodo}>{editingTodo ? 'Update Todo' : 'Add Todo'}</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed': ''}`}>
            <input
              type='checkbox'
              checked={todo.completed || false}   // Default as false to ensure it will not be undefined
              onChange={() => toggleTodo(todo.id, todo.completed)}
            />
            {todo.description}
            <button onClick={() => editTodo(todo)}>Edit</button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

// // The origin code
// import logo from './logo.svg';
// import './App.css';
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
// export default App;
