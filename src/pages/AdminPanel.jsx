import React, { useState } from 'react';
import { createProject, assignManagerOrTeam } from '../services/firestoreService';

function AdminPanel() {
  const [projectName, setProjectName] = useState('');
  const [manager, setManager] = useState('');

  const handleCreateProject = async () => {
    try {
      await createProject({ name: projectName, createdAt: new Date() });
      alert('Project created successfully');
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const handleAssignManager = async () => {
    try {
      await assignManagerOrTeam('projectId', { manager }); // Replace 'projectId' with actual ID
      alert('Manager assigned successfully');
    } catch (error) {
      console.error('Error assigning manager:', error);
    }
  };

  return (
    <div>
      <h1>Admin Panel</h1>

      <div>
        <h2>Create Project</h2>
        <input
          type="text"
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <button onClick={handleCreateProject}>Create</button>
      </div>

      <div>
        <h2>Assign Manager</h2>
        <input
          type="text"
          placeholder="Manager Name"
          value={manager}
          onChange={(e) => setManager(e.target.value)}
        />
        <button onClick={handleAssignManager}>Assign</button>
      </div>
    </div>
  );
}

export default AdminPanel;