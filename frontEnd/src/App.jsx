import { useState } from "react";
import Home from "./components/home/Home";
import Sidebar from "./components/sideBar/Sidebar";
import Projects from "./components/projects/Projects";

function App() {
  const [selectedProject, setSelectedProject] = useState(null); // State for the selected project

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-grow">
        {selectedProject ? (
          <Projects
            project={selectedProject}
            onDeleteProject={() => setSelectedProject(null)} // Reset project on delete
          />
        ) : (
          <Home onSelectProject={(project) => setSelectedProject(project)} />
        )}
      </div>
    </div>
  );
}

export default App;
