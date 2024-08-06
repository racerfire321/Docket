export interface Task {
  id: string;
  title: string;
  category: string;
  completed: boolean;
  description: string; 
  date: string; 
}

  
  export interface GroupedTasks {
    category: string;
    tasks: Task[];
  }
  