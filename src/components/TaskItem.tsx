import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onPress: (id: string) => void;
  onEdit: (id: string, newTask: Partial<Task>) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onPress, onEdit, onDelete }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [newDescription, setNewDescription] = useState(task.description);
  const [newDate, setNewDate] = useState(new Date(task.date));
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleEdit = () => {
    onEdit(task.id, { title: newTitle, description: newDescription, date: newDate.toISOString() });
    setIsModalVisible(false);
  };

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setNewDate(selectedDate);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{new Date(task.date).toDateString().toUpperCase()}</Text>
        </View>
        <TouchableOpacity onPress={() => onPress(task.id)} style={styles.taskContainer}>
          <Text style={task.completed ? styles.completedTask : styles.task}>
            {task.title}
          </Text>
          <Text style={styles.description}>{task.description}</Text>
          {task.timeSpent !== undefined && (
            <Text style={styles.timeSpent}>Time Spent: {Math.floor(task.timeSpent / 60)}m {task.timeSpent % 60}s</Text>
          )}
          {task.timestamp && (
            <Text style={styles.timestamp}>Edited at: {new Date(task.timestamp).toLocaleTimeString()}</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.editButton}>
          <Ionicons name="create-outline" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(task.id)} style={styles.deleteButton}>
          <Ionicons name="trash-outline" size={20} color="white" />
        </TouchableOpacity>
      </View>
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <LinearGradient
            colors={['#FF69B4', '#FFBCD9']}
            style={styles.modalContent}
          >
            <TextInput
              style={styles.input}
              value={newTitle}
              onChangeText={setNewTitle}
              placeholder="Edit task title"
              placeholderTextColor="#aaa"
            />
            <TextInput
              style={[styles.input, styles.descriptionInput]}
              value={newDescription}
              onChangeText={setNewDescription}
              placeholder="Edit task description"
              placeholderTextColor="#aaa"
              multiline
            />
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <Text style={styles.datePickerText}>{newDate.toDateString()}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={newDate}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleEdit}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setIsModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dateContainer: {
    padding: 8,
    backgroundColor: '#FFBCD9',
    borderRadius: 4,
    marginRight: 8,
    width: 70,
  },
  dateText: {
    fontSize: 12,
    color: '#333',
  },
  taskContainer: {
    flex: 1,
  },
  task: {
    fontSize: 16,
    color: '#FF69B4',
  },
  completedTask: {
    fontSize: 16,
    color: 'grey',
    textDecorationLine: 'line-through',
  },
  description: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
  timeSpent: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
  editButton: {
    marginLeft: 8,
    padding: 4,
    backgroundColor: '#FFBCD9',
    borderRadius: 4,
  },
  deleteButton: {
    marginLeft: 8,
    padding: 4,
    backgroundColor: '#FF6F6F',
    borderRadius: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: 'white',
  },
  descriptionInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  datePickerText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#FF6F6F',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#FF6F6F',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default TaskItem;
