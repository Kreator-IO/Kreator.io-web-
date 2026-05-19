import { addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { projectsCollection, tasksCollection } from "../firebase";

// Create a new project
export const createProject = async (projectData) => {
  return await addDoc(projectsCollection, projectData);
};

// Update a task
export const updateTask = async (taskId, taskData) => {
  const taskRef = doc(tasksCollection, taskId);
  return await updateDoc(taskRef, taskData);
};

// Delete a task
export const deleteTask = async (taskId) => {
  const taskRef = doc(tasksCollection, taskId);
  return await deleteDoc(taskRef);
};

// Assign a manager or team to a project
export const assignManagerOrTeam = async (projectId, assignmentData) => {
  const projectRef = doc(projectsCollection, projectId);
  return await updateDoc(projectRef, assignmentData);
};