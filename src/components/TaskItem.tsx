import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, Button } from 'react-native';

interface Task {
  id: string;
  category: string;
  title: string;
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
  onPress: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
  onDelete: (id: string) => void; 
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onPress, onEdit, onDelete }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const handleEdit = () => {
    onEdit(task.id, newTitle);
    setIsModalVisible(false);
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => onPress(task.id)} style={styles.taskContainer}>
          <Text style={task.completed ? styles.completedTask : styles.task}>
            {task.title}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(task.id)} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.input}
            value={newTitle}
            onChangeText={setNewTitle}
            placeholder="Edit task title"
          />
          <Button title="Save" onPress={handleEdit} />
          <Button title="Cancel" onPress={() => setIsModalVisible(false)} />
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
  taskContainer: {
    flex: 1,
  },
  task: {
    fontSize: 16,
    color: 'white',
  },
  completedTask: {
    fontSize: 16,
    color: 'grey',
    textDecorationLine: 'line-through',
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
  editButtonText: {
    color: 'black',
  },
  deleteButtonText: {
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: 'white',
  },
});

export default TaskItem;
