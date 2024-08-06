import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useTasks } from '../context/TaskContext'; 
const CalendarScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const { tasks } = useTasks();

  const renderTasks = (date: string) => {
    return tasks
      .filter(task => task.date === date)
      .map(task => (
        <View key={task.id} style={styles.taskContainer}>
          <Text style={styles.taskTitle}>{task.title}</Text>
          <Text style={styles.taskDescription}>{task.description}</Text>
        </View>
      ));
  };

  const markedDates = tasks.reduce((acc, task) => {
    acc[task.date] = { marked: true };
    return acc;
  }, {} as Record<string, any>);

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={(day: { dateString: React.SetStateAction<string>; }) => setSelectedDate(day.dateString)}
        markedDates={markedDates}
      />
      <View style={styles.tasksContainer}>
        <Text style={styles.selectedDate}>{selectedDate}</Text>
        {selectedDate ? renderTasks(selectedDate) : <Text style={styles.noTasksText}>No tasks for selected date.</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF0F5',
  },
  tasksContainer: {
    padding: 10,
  },
  selectedDate: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FF69B4',
  },
  taskContainer: {
    backgroundColor: '#FFBCD9',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    borderColor: '#FF69B4',
    borderWidth: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF69B4',
  },
  taskDescription: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
  noTasksText: {
    color: '#FF69B4',
  },
});

export default CalendarScreen;
