import { gql } from "@apollo/client";
import client from "../graphql/client";


const GetTasks = gql`
  query GetTasks {
    getTasks {
      id
      todo
      completed
      date
    }
  } 
`;

const CreateTask = gql`
  mutation CreateTask($todo: String!) {
    createTask(todo: $todo) 
  }
`;

const UpdateTaskStatus = gql`
  mutation UpdateTaskStatus($id: String!, $completed: Boolean!) {
    updateTaskStatus(id: $id, completed: $completed)
  }
`;


const DeleteTask = gql`
  mutation DeleteTask($id: String!) {
    deleteTask(id: $id)
  }
`;


export async function getTasks() {
  try {
    const response = await client.query({ query: GetTasks, fetchPolicy: "network-only",  });
    return response.data.getTasks;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
}


export async function createTask(todo) {
  try {
    const response = await client.mutate({
      mutation: CreateTask,
      variables: { todo }, 
    });
    return response.data.createTask;
  } catch (error) {
    console.error("Error creating task:", error);
    return null;
  }
}


export async function updateTaskStatus(id, completed) {
  try {
    const response = await client.mutate({
      mutation: UpdateTaskStatus,
      variables: { id, completed },
    });
    return response.data.updateTaskStatus;
  } catch (error) {
    console.error("Error updating task status:", error);
    return null; 
  }
}



// Delete Task
export async function deleteTask(id) {
  try {
    await client.mutate({
      mutation: DeleteTask,
      variables: { id: String(id) }, // Ensure ID is a string
    });
  } catch (error) {
    console.error("Error deleting task:", error);
  }
}


