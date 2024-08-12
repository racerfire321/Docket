// TasksProvider.tsx
import React, { createContext, useState, ReactNode, useContext } from 'react';

interface Task {
  id: string;
  category: string;
  title: string;
  completed: boolean;
}

interface TasksContextProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TasksContext = createContext<TasksContextProps | undefined>(undefined);

const TasksProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', category: 'Work', title: 'Complete report', description: 'Finish the quarterly financial report.', date: '2024-08-05', completed: false },
    { id: '2', category: 'Personal', title: 'Buy groceries', description: 'Buy milk, bread, and eggs from the supermarket.', date: '2024-08-06', completed: false },
    { id: '3', category: 'Work', title: 'Email client', description: 'Send the project proposal to the client.', date: '2024-08-07',timeSpent: 19, completed: true },
    { id: '4', category: 'Home', title: 'Clean kitchen', description: 'Clean the countertops, sink, and mop the floor.', date: '2024-08-08', completed: false },
    { id: '5', category: 'Personal', title: 'Exercise', description: 'Go for a 30-minute run in the park.', date: '2024-08-09', completed: false },
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
