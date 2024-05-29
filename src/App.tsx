import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./components/TodoList/TodoList";
import {v4 as uuid} from "uuid";

export type FilterTypeValuesType = "ACTIVE" | "ALL" | "COMPLETED"

function App() {
    let [tasks, setTasks] = useState<TaskType[]>([
        {id: uuid(), title: "CSS", isDone: true},
        {id: uuid(), title: "JS", isDone: true},
        {id: uuid(), title: "React", isDone: false},
        {id: uuid(), title: "React Native", isDone: false},
    ])
    let [filter, setFilter] = useState<FilterTypeValuesType>("ALL")
    const removeTask = (id: string) => {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }
    const changeFilter = (filter: FilterTypeValuesType) => {
        setFilter(filter)
    }
    const addTask = (title: string) => {
        let newTask: TaskType = {id: uuid(), title: title, isDone: false}
        let newTasks: TaskType[] = [newTask, ...tasks]
        setTasks(newTasks)
    }
    let resultTasks = tasks
    if (filter === "ACTIVE") {
        resultTasks = resultTasks.filter(t => !t.isDone)

    }
    if (filter === "COMPLETED") {
        resultTasks = resultTasks.filter(t => t.isDone)
    }
    console.log(tasks)
    return (
        <div className="App">
            <Todolist
                title={"What to learn"}
                tasks={resultTasks}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
        </div>
    );
}


export default App;
