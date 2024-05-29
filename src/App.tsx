import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./components/TodoList/TodoList";

export type FilterTypeValuesType = "ACTIVE" | "ALL" | "COMPLETED"

function App() {
    let [tasks, setTasks] = useState<TaskType[]>([
        {id: 1, title: "CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
        {id: 4, title: "React Native", isDone: false},
    ])
    let [filter, setFilter] = useState<FilterTypeValuesType>("ALL")
    const removeTask = (id: number) => {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }
    const changeFilter = (filter: FilterTypeValuesType) =>{
        setFilter(filter)
    }
    let resultTasks = tasks
    if(filter === "ACTIVE"){
        resultTasks = resultTasks.filter(t=>!t.isDone)

    }
    if(filter === "COMPLETED"){
        resultTasks = resultTasks.filter(t=>t.isDone)
    }
    return (
        <div className="App">
            <Todolist
                title={"What to learn"}
                tasks={resultTasks}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}


export default App;
