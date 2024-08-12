import React, { useContext, useState } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { Task } from '../types';
import { ThemeContext } from '../context/Theme/ThemContext';

interface AddTaskModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (task: Task) => void;
}

const categories = ['Personal', 'Work', 'Home', 'Other'];

const AddTaskModal: React.FC<AddTaskModalProps> = ({ visible, onClose, onAdd }) => {
  const { theme } = useContext(ThemeContext);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Personal');
  
  const handleAddTask = () => {
    if (title.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        title,
        category,
        completed: false,
      };
      onAdd(newTask);
      setTitle('');
      setCategory('Personal');
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <LinearGradient
        colors={['pink', 'white']}
        style={styles.gradient}
      >
        <View style={[styles.modalContainer, theme === 'light' ? styles.lightModal : styles.darkModal]}>
          <TextInput
            style={[styles.input, theme === 'light' ? styles.lightInput : styles.darkInput]}
            value={title}
            onChangeText={setTitle}
            placeholder="Task title"
            placeholderTextColor="#aaa"
          />
          <TextInput
            style={[styles.input, styles.descriptionInput, theme === 'light' ? styles.lightInput : styles.darkInput]}
            value={description}
            onChangeText={setDescription}
            placeholder="Description"
            placeholderTextColor="#aaa"
            multiline
          />
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text style={[styles.datePickerText, theme === 'light' ? styles.lightText : styles.darkText]}>
              {date.toDateString()}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
          <Text style={[styles.label, theme === 'light' ? styles.lightText : styles.darkText]}>Category:</Text>
          <View style={styles.radioGroup}>
            {categories.map(cat => (
              <View key={cat} style={styles.radioItem}>
                <RadioButton
                  value={cat}
                  status={category === cat ? 'checked' : 'unchecked'}
                  onPress={() => setCategory(cat)}
                />
                <Text style={[styles.radioLabel, theme === 'light' ? styles.lightText : styles.darkText]}>{cat}</Text>
              </View>
            ))}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.addButton]} onPress={handleAddTask}>
              <Text style={styles.buttonText}>Add Task</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </Modal>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    borderRadius: 10,
    padding: 20,
  },
  lightModal: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  darkModal: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  input: {
    height: 40,
    width: '100%',
    paddingHorizontal: 10,
    color: '#333',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 5,
  },
  lightInput: {
    backgroundColor: '#FFF',
    borderColor: 'white',
  },
  darkInput: {
    backgroundColor: '#333',
     color: '#FFFFFF',
    borderColor: '#666',
  },
  descriptionInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  datePickerText: {
    fontSize: 16,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  radioGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  radioLabel: {
    marginLeft: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#4CAF50',
  },
  cancelButton: {
    backgroundColor: '#FF6F6F',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  lightText: {
    color: '#FF69B4',
  },
  darkText: {
    color: '#FFFFFF',
  },
});

export default AddTaskModal;
