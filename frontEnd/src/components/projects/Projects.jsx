import React, { useState } from "react";

const Projects = ({ project, onDeleteProject }) => {
  const [isEditingProject, setIsEditingProject] = useState(false);
  const [projectName, setProjectName] = useState(project.name);
  const [todos, setTodos] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDescription, setTodoDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null); // New state for editing
  const [isEditingTodo, setIsEditingTodo] = useState(false); // Track if editing todo
  const [message, setMessage] = useState(
    "No Todo tasks added yet. Please click on the plus icon to add a new Todo Task."
  ); // New state for message

  // Get current date
  const currentDate = new Date().toLocaleDateString();

  // Function to handle adding a new todo
  const handleAddTodo = () => {
    if (todoTitle.trim() === "") {
      alert("Task title cannot be empty.");
      return;
    }

    const newTodo = {
      title: todoTitle,
      description: todoDescription,
      date: currentDate,
      isCompleted: false,
    };
    setTodos([...todos, newTodo]);
    setTodoTitle("");
    setTodoDescription("");
    setIsFormVisible(false);

    // Update message after adding a task
    setMessage("Click on + to add more Todo tasks.");
  };

  // Function to handle deleting a todo
  const handleDeleteTodo = (indexToRemove, isCompleted = false) => {
    if (isCompleted) {
      setCompletedTodos(
        completedTodos.filter((_, index) => index !== indexToRemove)
      );
    } else {
      setTodos(todos.filter((_, index) => index !== indexToRemove));
      // If all pending todos are removed, update the message
      if (todos.length === 1 && completedTodos.length === 0) {
        setMessage(
          "No Todo tasks added yet. Please click on the plus icon to add a new Todo Task."
        );
      }
    }
  };

  // Function to handle toggling a todo as completed or incomplete
  const handleToggleComplete = (index, toComplete) => {
    if (toComplete) {
      const todoToComplete = todos[index];
      todoToComplete.isCompleted = true;
      setCompletedTodos([...completedTodos, todoToComplete]);
      setTodos(todos.filter((_, i) => i !== index));
      // If there are no more pending todos, update the message
      if (todos.length === 1) {
        setMessage("Click on + to add more Todo tasks.");
      }
    } else {
      const todoToIncomplete = completedTodos[index];
      todoToIncomplete.isCompleted = false;
      setTodos([...todos, todoToIncomplete]);
      setCompletedTodos(completedTodos.filter((_, i) => i !== index));
    }
  };

  // Function to handle editing the project name
  const handleEditProjectName = () => {
    if (projectName.trim() === "") {
      alert("Project name cannot be empty.");
      return;
    }
    setIsEditingProject(false);
  };

  // Function to handle editing a todo
  const handleEditTodo = (index, isCompleted = false) => {
    const todoToEdit = isCompleted ? completedTodos[index] : todos[index];
    setTodoTitle(todoToEdit.title);
    setTodoDescription(todoToEdit.description);
    setEditingIndex(index);
    setIsEditingTodo(isCompleted ? "completed" : "pending"); // Track which list is being edited
    setIsFormVisible(true); // Show form for editing
  };

  // Function to save the edited todo
  const handleSaveEditedTodo = () => {
    if (todoTitle.trim() === "") {
      alert("Task title cannot be empty.");
      return;
    }

    if (isEditingTodo === "pending") {
      const updatedTodos = [...todos];
      updatedTodos[editingIndex] = {
        ...updatedTodos[editingIndex],
        title: todoTitle,
        description: todoDescription,
      };
      setTodos(updatedTodos);
    } else if (isEditingTodo === "completed") {
      const updatedCompletedTodos = [...completedTodos];
      updatedCompletedTodos[editingIndex] = {
        ...updatedCompletedTodos[editingIndex],
        title: todoTitle,
        description: todoDescription,
      };
      setCompletedTodos(updatedCompletedTodos);
    }

    setTodoTitle("");
    setTodoDescription("");
    setIsEditingTodo(false);
    setEditingIndex(null);
    setIsFormVisible(false);
  };

  return (
    <div className="p-6 bg-gray-100 flex flex-col items-center min-h-screen">
      {/* Editable Project Name */}
      {isEditingProject ? (
        <div className="flex flex-col mb-6 w-full max-w-4xl">
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="border p-2 rounded mb-4"
          />
          <button
            onClick={handleEditProjectName}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 self-start"
          >
            Save
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center mb-6 w-full max-w-4xl">
          <h1 className="text-2xl font-bold mb-4">{projectName}</h1>
          <div className="flex">
            <button
              onClick={() => setIsEditingProject(true)}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mr-4"
            >
              Edit Project Name
            </button>
            <button
              onClick={onDeleteProject}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete Project
            </button>
          </div>
        </div>
      )}

      {/* Summary Section */}
      <div className="mb-6 bg-white p-4 shadow rounded-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold">Summary</h2>
        <p className="mt-2">
          Completed: {completedTodos.length}, Pending: {todos.length}
        </p>
      </div>

      {/* Message Section */}
      <p className="text-lg font-semibold mb-6">{message}</p>

      {/* + Icon to show Todo form */}
      <button
        onClick={() => setIsFormVisible(true)}
        className="text-3xl bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-blue-600 mb-6"
      >
        +
      </button>

      {/* Todo Form */}
      {isFormVisible && (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mb-6">
          <h3 className="text-xl font-semibold mb-4">
            {isEditingTodo ? "Edit Todo Task" : "Add New Todo Task"}
          </h3>
          <input
            type="text"
            placeholder="Task Title"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            value={todoTitle}
            onChange={(e) => setTodoTitle(e.target.value)}
          />
          <textarea
            placeholder="Task Description"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            value={todoDescription}
            onChange={(e) => setTodoDescription(e.target.value)}
          ></textarea>
          <div className="flex">
            <button
              onClick={isEditingTodo ? handleSaveEditedTodo : handleAddTodo}
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              {isEditingTodo ? "Save" : "Create"}
            </button>
            {isEditingTodo && (
              <button
                onClick={() => {
                  setIsEditingTodo(false);
                  setEditingIndex(null);
                  setIsFormVisible(false);
                  setTodoTitle("");
                  setTodoDescription("");
                }}
                className="ml-4 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      )}

      {/* Pending Tasks */}
      {todos.length > 0 && (
        <div className="w-full max-w-4xl mb-6">
          <h2 className="text-xl font-bold mb-4">Pending Tasks</h2>
          <div className="grid grid-cols-1 gap-4">
            {todos.map((todo, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-semibold">{todo.title}</h3>
                  <p className="text-sm text-gray-500">{todo.date}</p>
                  <p className="text-sm">{todo.description}</p>
                </div>
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => handleToggleComplete(index, true)}
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                  >
                    Mark as Completed
                  </button>
                  <button
                    onClick={() => handleEditTodo(index, false)} // Edit button
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTodo(index, false)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completed Tasks */}
      {completedTodos.length > 0 && (
        <div className="w-full max-w-4xl">
          <h2 className="text-xl font-bold mb-4">Completed Tasks</h2>
          <div className="grid grid-cols-1 gap-4">
            {completedTodos.map((todo, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-semibold">{todo.title}</h3>
                  <p className="text-sm text-gray-500">{todo.date}</p>
                  <p className="text-sm">{todo.description}</p>
                </div>
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => handleToggleComplete(index, false)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Mark as Incomplete
                  </button>
                  <button
                    onClick={() => handleEditTodo(index, true)} // Edit button
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTodo(index, true)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
