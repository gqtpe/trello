import React from 'react';
import './App.css';
import {TaskType, Todolist} from "./components/TodoList/TodoList";


function App() {
    let tasks1: TaskType[] = [
        {id: 1, title: "CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
        {id: 4, title: "React Native", isDone: false},
    ]
    let tasks2: TaskType[] = [
        {id: 1, title: "find road", isDone: false},
        {id: 2, title: "calculate time", isDone: false},
        {id: 3, title: "start studying", isDone: false},
        {id: 4, title: "start studying", isDone: false},
    ]
    return (
        <div className="App">
            <Todolist title={"What to learn"} tasks={tasks1}/>
            <Todolist title={"What to do"} tasks={tasks2}/>
        </div>
    );
}



export default App;
