import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View } from 'react-native';
import TaskList from './components/TaskList';
import { Button, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState, useEffect } from 'react';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    saveTasks();
  }, [tasks]);

  const loadTasks = async() => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if(storedTasks) setTasks(JSON.parse(storedTasks));
    } catch (error) {
      Alert.alert('Error loading tasks', error.message);
    }
  }

  const saveTasks = async() => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      Alert.alert('Error saving tasks', error.message);
    }
  }

  const addTask = () => {
    if(taskText.trim() === '') return;
    const newTask = {id: Date.now(), text: taskText, done: false};
    setTasks([...tasks, newTask]);
    setTaskText('');
  }

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task => task.id === taskId ? {...task, done: !task.done}: task))
  } 

  return (
    <View style={styles.container}>
      <TextInput 
      style={styles.input}
      placeholder="Enter Task..."
      value={taskText}
      onChangeText={setTaskText}
      />
      <Button onPress={addTask} style={styles.button} mode="contained">Add Task</Button>
      <TaskList tasks={tasks} toggleTask={toggleTask}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#2EC924',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#A1ED9C'
  },
  button: {
    backgroundColor: '#A1ED9C'
  },
});
