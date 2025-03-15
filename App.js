import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList, Text, View, TextInput, Button } from 'react-native';
import { CheckBox } from '@rneui/themed';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 25, padding: 10 },
  taskContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  input: { borderWidth: 1, padding: 5, flex: 1, marginRight: 5 }
});

export default function App() {
  const [tasks, setTasks] = useState([
    { key: '1', description: 'Task 1', completed: false },
    { key: '2', description: 'Task 2', completed: false }
  ]);
  const [newTask, setNewTask] = useState('');

  const toggleTask = (key) => {
    setTasks(tasks.map(task => task.key === key ? { ...task, completed: !task.completed } : task));
  };

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { key: Date.now().toString(), description: newTask, completed: false }]);
      setNewTask('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <CheckBox checked={item.completed} onPress={() => toggleTask(item.key)} />
            <Text style={item.completed ? { textDecorationLine: 'line-through' } : {}}>
              {item.description}
            </Text>
          </View>
        )}
      />
      <View style={styles.taskContainer}>
        <TextInput style={styles.input} value={newTask} onChangeText={setNewTask} placeholder="New Task" />
        <Button title="Add" onPress={addTask} />
      </View>
    </SafeAreaView>
  );
}
