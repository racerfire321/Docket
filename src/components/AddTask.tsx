import React, { useState } from 'react';
import { View, Text, Modal, TextInput, Button, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { Task } from '../types'; 

interface AddTaskModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (task: Task) => void;
}

const categories = ['Personal', 'Work','Home', 'Other']; 
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
        <Button title="Add Task" onPress={handleAddTask} />
        <Button title="Cancel" onPress={onClose} color="#FF6F6F" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,6,0.5)',
    padding: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#fff',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: '#fff',
  },
  label: {
    fontSize: 16,
    color: '#fff',
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
    color: '#fff',
    marginLeft: 5,
  },
});

export default AddTaskModal;
