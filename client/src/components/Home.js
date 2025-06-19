import React, { useState, useEffect } from "react";
import "./Home.css";
import Navbar from "./Navbar";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { deleteTask, getTasks, createTask, updateTaskStatus } from "../services/task";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  
  const fetchTasks = async () => { 
    const tasks = await getTasks();
    setTodos(tasks)
  };

  useEffect( () => {
    fetchTasks();
  }, []);

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

 
  const handleAdd = async () => {
    if (todo.length === 0) {
      toast.warn("Task is required");
    } else {
      const newTask = await createTask(todo);
      if (newTask) {
        fetchTasks();
        setTodo("");
        toast.success("Task added successfully");
      } else {
        toast.error("Error while Adding a task");
        alert("Please Login if NOT logged in")
      }
    }
  };

  
  const handleEdit = (id) => {
    const confirmEdit = window.confirm(
      "You are about to enter edit mode. If you click OK, please click 'Save' to save your task. Do you want to proceed with editing?"
    );
    if (confirmEdit) {
      let t = todos.find((i) => i.id === id);
      setTodo(t.todo);
      handleDelete(id);
    }
  };

  
  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks();
      toast.success("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task. Please try again.");
    }
  };
  

 
  const handleCheckbox = async (e) => {
    const id = e.target.name;
    const completed = e.target.checked; 
  
    const updatedTodos = todos.map((item) =>
      item.id === id ? { ...item, completed } : item
    );
    setTodos(updatedTodos); 

    const updatedTask = await updateTaskStatus(id, completed);
    if (updatedTask) {
      toast.success("Task status updated successfully");
    } else {
      toast.error("Error updating task status");
    }
  };
   

  return (
    <>
      <Navbar />
      <div className="home-container">
        <h1>Todo - Manage your todos</h1>

        <div className="addTodo">
          <h2>Add a Todo</h2>
          <input onChange={(e) => setTodo(e.target.value)} value={todo || ""} type="text" placeholder="Enter your task..." />
          <button onClick={handleAdd} disabled={todo.length <= 3}> Save </button>
        </div>

        <input className="form-check-input" type="checkbox" onChange={toggleFinished} checked={showFinished} /> Show Finished

        <h2>Your Todos</h2>

        <div className="todos">
          {todos.length === 0 && <div>No Todos to Display</div>}
          {todos.map(
            (item) =>
              (showFinished || !item.completed) && (
                <>
                  <div key={item.id} className="todo">
                    <div>
                      <input className="form-check-input" data-bs-toggle="tooltip" data-bs-placement="right" title="Check this box to Complete!" type="checkbox" onChange={handleCheckbox} checked={item.completed} name={item.id} />
                      <span className={item.completed ? "line-through" : ""}>{item.todo}</span>
                    </div>
                    <div className="todo-button" style={{ display: "flex", gap: 5 }}>
                      <button onClick={() => handleEdit(item.id)}><FaEdit /></button>
                      <button onClick={() => handleDelete(item.id)}><MdDelete /></button>
                    </div>
                  </div>
                  <small style={{ color: "gray" }}>Added on: {item.date}</small>
                </>
              )
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
