import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import TaskItem from '../components/TaskItem';
import AddTaskModal from '../components/AddTask';
import { useTasks } from '../context/TaskContext';
import { Task, GroupedTasks } from '../types'; 
import { FAB } from 'react-native-paper';

const groupTasksByCategory = (tasks: Task[]): GroupedTasks[] => {
  const groupedTasks = tasks.reduce((groups, task) => {
    const { category } = task;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(task);
    return groups;
  }, {} as Record<string, Task[]>);

  return Object.entries(groupedTasks).map(([category, tasks]) => ({ category, tasks }));
};

const HomeScreen: React.FC = () => {
  const { tasks, setTasks } = useTasks();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleTaskPress = (id: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleEditTask = (id: string, newTitle: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, title: newTitle } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const handleAddTask = (task: Task) => {
    setTasks(prevTasks => [...prevTasks, task]);
  };

  const remainingTasks = tasks.filter(task => !task.completed).length;
  const groupedTasks = groupTasksByCategory(tasks);

  return (
    <View style={styles.container}>
      {/* <Image
        source={{ uri: '' }} 
        style={styles.sticker}
      /> */}
      <Text style={styles.totalTasks}>Total Remaining Tasks: {remainingTasks}</Text>
      <FlatList
        data={groupedTasks}
        keyExtractor={item => item.category}
        renderItem={({ item }) => (
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>{item.category}</Text>
            {item.tasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onPress={handleTaskPress}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </View>
        )}
      />
      <AddTaskModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onAdd={handleAddTask}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        color='white'
        onPress={() => setIsModalVisible(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'black',
  },
  sticker: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 16,
  },
  totalTasks: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  categoryContainer: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: '10%',
    bottom: 50,
    backgroundColor: '#FFBCD9',
  },
});

export default HomeScreen;
