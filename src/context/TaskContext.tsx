import React, { createContext, useState, ReactNode, useContext } from 'react';
import { Task } from '../types';

interface TasksContextProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TasksContext = createContext<TasksContextProps | undefined>(undefined);

const TasksProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', category: 'Work', title: 'Demo task', description: 'Finish the quarterly financial report.', date: '2024-08-05', completed: true },
    { id: '2', category: 'Personal', title: 'Demo task for timer', description: 'uncompleted to show on timer', date: '2024-08-09', completed: false },
  ]);

  return (
    <TasksContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TasksContext.Provider>
  );
};

const useTasks = (): TasksContextProps => {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TasksProvider');
  }
  return context;
};

export { TasksProvider, useTasks };
