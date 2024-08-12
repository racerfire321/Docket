import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTasks } from '../context/TaskContext';
import { Task } from '../types';
import LottieView from 'lottie-react-native';

const TimerScreen: React.FC = () => {
  const { tasks, setTasks } = useTasks();
  const [seconds, setSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string>('');
  const [startTime, setStartTime] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
      if (animationRef.current) {
        animationRef.current.play();
      }
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (animationRef.current) {
        animationRef.current.pause();
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning]);

  const handleStart = () => {
    const task = tasks.find(task => task.id === selectedTaskId);
    if (task) {
      setIsRunning(true);
      setStartTime(Date.now());
    }
  };

  const handleStop = () => {
    const task = tasks.find(task => task.id === selectedTaskId);
    if (task) {
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
      const updatedTasks = tasks.map(t =>
        t.id === selectedTaskId ? { ...t, timeSpent: (t.timeSpent || 0) + elapsedTime } : t
      );
      setTasks(updatedTasks);
      setIsRunning(false);
      setSeconds(0);
      Alert.alert('Good job for your hard work');
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  return (
    <View style={styles.container}>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedTaskId}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedTaskId(itemValue)}
        >
          <Picker.Item label="Select a task" value="" />
          {tasks.filter(task => !task.completed).map(task => (
            <Picker.Item key={task.id} label={task.title} value={task.id} />
          ))}
        </Picker>
      </View>
      <LottieView
        ref={animationRef}
        source={require('../assets/timer.json')}
        loop
        style={styles.animation}
      />
      <Text style={styles.timerText}>{new Date(seconds * 1000).toISOString().substr(11, 8)}</Text>
      <View style={styles.buttonsGroup}>
      <TouchableOpacity onPress={isRunning ? handleStop : handleStart} style={styles.button}>
        <Text style={styles.buttonText}>{isRunning ? 'Stop' : 'Start'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={isRunning ? handleStop : handleReset}  style={[styles.button, styles.resetButton]}>
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF0F5',
  },
  buttonsGroup:{
    flexDirection: 'row-reverse',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    gap: 30,
  },
  pickerWrapper: {
    height: 50,
    width: 260,
    marginBottom: 20,
    marginVertical: 5,
    borderRadius: 10,
    borderColor: '#FF69B4',
    borderWidth: 1,
    backgroundColor: '#FFBCD9',
  },
  animation: {
    width: 200,
    height: 300,
  },
  picker: {
    height: '100%',
    width: '100%',
    color: 'black',
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FF69B4', 
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FF69B4',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginVertical: 5,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
  resetButton: {
    backgroundColor: '#FF1493', 
  },
});

export default TimerScreen;
