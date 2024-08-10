// import React, { useContext, useState } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { Calendar } from 'react-native-calendars';
// import { useTasks } from '../context/TaskContext'; 
// import { ThemeContext } from '../context/Theme/ThemContext';

// const CalendarScreen: React.FC = () => {
//   const [selectedDate, setSelectedDate] = useState<string>('');
//   const { tasks } = useTasks();
//   const { theme } = useContext(ThemeContext); 
//   const renderTasks = (date: string) => {
//     return tasks
//       .filter(task => task.date === date)
//       .map(task => (
//         <View key={task.id} style={[styles.taskContainer, theme === 'light' ? styles.lightTaskContainer : styles.darkTaskContainer]}>
//           <Text style={[styles.taskTitle, theme === 'light' ? styles.lightText : styles.darkText]}>{task.title}</Text>
//           <Text style={[styles.taskDescription, theme === 'light' ? styles.lightText : styles.darkText]}>{task.description}</Text>
//         </View>
//       ));
//   };

//   const markedDates = tasks.reduce((acc, task) => {
//     acc[task.date] = { marked: true };
//     return acc;
//   }, {} as Record<string, any>);

//   return (
//     <View style={[styles.container, theme === 'light' ? styles.lightContainer : styles.darkContainer]}>
//       <Calendar
//         onDayPress={(day: { dateString: React.SetStateAction<string>; }) => setSelectedDate(day.dateString)}
//         markedDates={markedDates}
//       />
//       <View style={styles.tasksContainer}>
//         <Text style={[styles.selectedDate, theme === 'light' ? styles.lightText : styles.darkText]}>{selectedDate}</Text>
//         {selectedDate ? renderTasks(selectedDate) : <Text style={[styles.noTasksText, theme === 'light' ? styles.lightText : styles.darkText]}>No tasks for selected date.</Text>}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding:20
//   },
//   lightContainer: {
//     backgroundColor: '#FFF0F5',
//   },
//   darkContainer: {
//     backgroundColor: '#1c1c1c',
//   },
//   tasksContainer: {
//     padding: 10,
//   },
//   selectedDate: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   taskContainer: {
//     padding: 10,
//     marginVertical: 5,
//     borderRadius: 10,
//     borderWidth: 1,
//   },
//   taskTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   taskDescription: {
//     fontSize: 14,
//     marginTop: 5,
//   },
//   noTasksText: {
//   },
//   lightTaskContainer: {
//     backgroundColor: '#FFBCD9',
//     borderColor: '#FF69B4',
//   },
//   darkTaskContainer: {
//     backgroundColor: '#333',
//     borderColor: '#FF69B4',
//   },
//   lightText: {
//     color: '#FF69B4',
//   },
//   darkText: {
//     color: '#FFFFFF',
//   },
// });

// export default CalendarScreen;

import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useTasks } from '../context/TaskContext'; 
import { ThemeContext } from '../context/Theme/ThemContext';
import { useTranslation } from 'react-i18next';

const CalendarScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const { tasks } = useTasks();
  const { theme } = useContext(ThemeContext); 
  const { t } = useTranslation();

  const renderTasks = (date: string) => {
    return tasks
      .filter(task => task.date === date)
      .map(task => (
        <View key={task.id} style={[styles.taskContainer, theme === 'light' ? styles.lightTaskContainer : styles.darkTaskContainer]}>
          <Text style={[styles.taskTitle, theme === 'light' ? styles.lightText : styles.darkText]}>{task.title}</Text>
          <Text style={[styles.taskDescription, theme === 'light' ? styles.lightText : styles.darkText]}>{task.description}</Text>
        </View>
      ));
  };

  const markedDates = tasks.reduce((acc, task) => {
    acc[task.date] = { marked: true };
    return acc;
  }, {} as Record<string, any>);

  return (
    <View style={[styles.container, theme === 'light' ? styles.lightContainer : styles.darkContainer]}>
      <Calendar
        onDayPress={(day: { dateString: React.SetStateAction<string>; }) => setSelectedDate(day.dateString)}
        markedDates={markedDates}
      />
      <View style={styles.tasksContainer}>
        <Text style={[styles.selectedDate, theme === 'light' ? styles.lightText : styles.darkText]}>{selectedDate}</Text>
        {selectedDate ? renderTasks(selectedDate) : <Text style={[styles.noTasksText, theme === 'light' ? styles.lightText : styles.darkText]}>{t('no_tasks')}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  lightContainer: {
    backgroundColor: '#FFF0F5',
  },
  darkContainer: {
    backgroundColor: '#1c1c1c',
  },
  tasksContainer: {
    padding: 10,
  },
  selectedDate: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  taskContainer: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskDescription: {
    fontSize: 14,
    marginTop: 5,
  },
  noTasksText: {
    fontSize: 16,
  },
  lightTaskContainer: {
    backgroundColor: '#FFBCD9',
    borderColor: '#FF69B4',
  },
  darkTaskContainer: {
    backgroundColor: '#333',
    borderColor: '#FF69B4',
  },
  lightText: {
    color: '#FF69B4',
  },
  darkText: {
    color: '#FFFFFF',
  },
});

export default CalendarScreen;
