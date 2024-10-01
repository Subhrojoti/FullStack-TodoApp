import React, { useState } from "react";

const Home = ({ onSelectProject }) => {
  const [projects, setProjects] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(null); // Track if edit form is visible for a project
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [editProjectName, setEditProjectName] = useState("");
  const [editProjectDescription, setEditProjectDescription] = useState("");
  const currentDate = new Date().toLocaleDateString();

  // Create new project
  const handleCreateProject = () => {
    const newProject = {
      name: projectName,
      description: projectDescription,
      date: currentDate,
    };
    setProjects([...projects, newProject]);
    setProjectName("");
    setProjectDescription("");
    setIsFormVisible(false);
  };

  // Handle delete project
  const handleDeleteProject = (index) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);
  };

  // Handle edit project
  const handleEditProject = (index) => {
    const updatedProjects = [...projects];
    updatedProjects[index].name = editProjectName;
    updatedProjects[index].description = editProjectDescription;
    setProjects(updatedProjects);
    setIsEditVisible(null); // Close the edit form after saving
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      {projects.length === 0 ? (
        <p className="text-xl font-semibold mb-6">
          There is no project created. Please click the plus icon to create a
          project.
        </p>
      ) : (
        <p className="text-xl font-semibold mb-6">
          Click on plus icon to create more projects or click on a project to
          view its details.
        </p>
      )}

      <button
        className="text-3xl bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-blue-600 transition mb-6"
        onClick={() => setIsFormVisible(true)}
      >
        +
      </button>

      {isFormVisible && (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mb-6">
          <h3 className="text-xl font-semibold mb-4">Create New Project</h3>
          <input
            type="text"
            placeholder="Project Name"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <textarea
            placeholder="Project Description"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
          ></textarea>
          <button
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
            onClick={handleCreateProject}
          >
            Create
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 w-full max-w-4xl">
        {projects.map((project, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            {/* Project Details */}
            <div className="flex justify-between items-center">
              <div
                onClick={() => onSelectProject(project)}
                className="cursor-pointer"
              >
                <h3 className="text-lg font-semibold">{project.name}</h3>
                <p className="text-sm text-gray-500">{project.date}</p>
                <p className="mt-2">{project.description}</p>
              </div>

              {/* Edit and Delete Buttons */}
              <div className="flex space-x-4">
                <button
                  className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 transition"
                  onClick={() => {
                    setIsEditVisible(index);
                    setEditProjectName(project.name);
                    setEditProjectDescription(project.description);
                  }}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition"
                  onClick={() => handleDeleteProject(index)}
                >
                  Delete
                </button>
              </div>
            </div>

            {/* Edit Form for Project */}
            {isEditVisible === index && (
              <div className="bg-gray-100 p-4 mt-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Edit Project</h3>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                  value={editProjectName}
                  onChange={(e) => setEditProjectName(e.target.value)}
                />
                <textarea
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                  value={editProjectDescription}
                  onChange={(e) => setEditProjectDescription(e.target.value)}
                />
                <button
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
                  onClick={() => handleEditProject(index)}
                >
                  Save
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
