import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import LottieView from 'lottie-react-native';
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

  const handleEditTask = (id: string, newTitle: string, timestamp: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, title: newTitle, timestamp } : task
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
  const totalTasks = tasks.length;
  const completedTasks = totalTasks - remainingTasks;

  const todoRate = totalTasks > 0 ? ((remainingTasks / totalTasks) * 100).toFixed(2) : '0.00';
  const doneRate = totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(2) : '0.00';
  const groupedTasks = groupTasksByCategory(tasks);

  return (
    <View style={styles.container}>
      {/* Task Rate Cards */}
      <View style={styles.cardsContainer}>
        <View style={styles.card}>
          <LottieView
            source={require('../assets/alert.json')} 
            autoPlay
            loop
            style={styles.animation}
          />
          <Text style={styles.cardTitle}>Todo Task</Text>
          <Text style={styles.cardContent}>{todoRate}%</Text>
        </View>
        <View style={styles.card}>
          <LottieView
            source={require('../assets/donee.json')} 
            autoPlay
            loop
            style={styles.animation}
          />
          <Text style={styles.cardTitle}>Done Task</Text>
          <Text style={styles.cardContent}>{doneRate}%</Text>
        </View>
      </View>

      <View style={styles.remainingTasksContainer}>
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
        <Text style={styles.remainingTasksText}>Remaining Tasks: {remainingTasks}</Text>
        <LottieView
          source={require('../assets/Animation - 1722825781033.json')}
          autoPlay
          loop
          style={styles.animation}
        />
       
      </View>

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
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF0F5',
  },
  animation: {
    width: 100,
    height: 100,
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
  card: {
    flex: 1,
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 8,
    marginStart:10,
    backgroundColor: '#FFBCD9',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF69B4',
    marginBottom: 8,
  },
  cardContent: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF69B4',
  },
  remainingTasksContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  remainingTasksText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF69B4',
    marginLeft: 80,
  },
  categoryContainer: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#FF69B4',
  },
  fab: {
    position: 'absolute',
    backgroundColor: '#FFBCD9',
  },
});

export default HomeScreen;
