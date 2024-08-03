export interface Task {
    id: string;
    category: string;
    title: string;
    completed: boolean;
  }
  
  export interface GroupedTasks {
    category: string;
    tasks: Task[];
  }
  