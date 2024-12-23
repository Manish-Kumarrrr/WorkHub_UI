"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { TaskList } from '@/components/custom/TaskList';

// interface Task {
//   taskId: string;
//   tag: string;
//   pay: string;
//   email: string;
//   phoneNo: string;
//   Date: string;
//   image: string[];
//   status: string;
//   description: string;
//   address: string;
//   city: string;
//   state: string;
//   pincode: string;
// }

export default function Feed() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:8085/v1/task/all');
        console.log(response)
        setTasks(response.data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch tasks');
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>;
  }

  if (error) {
    return <div className="text-center text-red-500 text-xl mt-8">Error: {error}</div>;
  }

  return <TaskList tasks={tasks} />;
}

