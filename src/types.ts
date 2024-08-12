export interface Task {
  id: string;
  title: string;
  category: string;
  completed: boolean;
  description: string; 
  date: string; 
  timeSpent?: number;
  timestamp?: string;
}

  
  export interface GroupedTasks {
    category: string;
    tasks: Task[];
  }
  