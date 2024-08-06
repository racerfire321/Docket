import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

interface Task {
  name: string;
  date: string;
}

const tasks: Task[] = [
  { name: 'Meeting with Bob', date: '2024-08-05' },
  { name: 'Dentist Appointment', date: '2024-08-06' },
  { name: 'Grocery Shopping', date: '2024-08-07' },
];

const CalendarScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');

  const renderTasks = (date: string) => {
    return tasks
      .filter(task => task.date === date)
      .map(task => (
        <View key={task.name} style={styles.taskContainer}>
          <Text>{task.name}</Text>
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
        {selectedDate ? renderTasks(selectedDate) : <Text style={styles.selectedDate}>No tasks for selected date.</Text>}
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
    color:'#FF69B4',
  },
  taskContainer: {
    backgroundColor: '#FF69B4',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
});

export default CalendarScreen;
