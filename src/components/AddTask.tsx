// AddTaskModal.tsx
import React, { useState } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { Task } from '../types';

interface AddTaskModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (task: Task) => void;
}

const categories = ['Personal', 'Work', 'Home', 'Other'];

const AddTaskModal: React.FC<AddTaskModalProps> = ({ visible, onClose, onAdd }) => {
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
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Task title"
            placeholderTextColor="#aaa"
          />
          <Text style={styles.label}>Category:</Text>
          <View style={styles.radioGroup}>
            {categories.map(cat => (
              <View key={cat} style={styles.radioItem}>
                <RadioButton
                  value={cat}
                  status={category === cat ? 'checked' : 'unchecked'}
                  onPress={() => setCategory(cat)}
                />
                <Text style={styles.radioLabel}>{cat}</Text>
              </View>
            ))}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleAddTask}>
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 20,
  },
  input: {
    height: 40,
    width: '100%',
    paddingHorizontal: 10,
    color: '#333',
    backgroundColor: 'transparent',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 5,
  },
  label: {
    fontSize: 16,
    color: '#333',
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
    color: '#333',
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
    backgroundColor: '#4CAF50',
    padding: 10,
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: '#FF6F6F',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AddTaskModal;
