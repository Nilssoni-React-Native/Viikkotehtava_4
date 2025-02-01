import React from "react";
import { FlatList } from "react-native";
import TaskItem from "./TaskItem";

const TaskList = ({tasks, toggleTask}) => {
    return (
        <FlatList 
            data={tasks}
            keyExtractor={(task) => task.id.toString()}
            renderItem={({item}) => <TaskItem task={item} toggleTask={toggleTask}/>}
        />
    );
};

export default TaskList;