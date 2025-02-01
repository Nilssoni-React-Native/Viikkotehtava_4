import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

const TaskItem = ({task, toggleTask}) => {
    return (
        <TouchableOpacity onPress={() => toggleTask(task.id)} style={styles.item}>
            <Text style={[styles.text, task.done && styles.done]}>
                {task.text}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    item: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    text: {
        fontSize: 18,
        color: '#4B4C4C',
    },
    done: {
        textDecorationLine: 'line-through',
        color: '#C2C2C2',
    },
});

export default TaskItem;