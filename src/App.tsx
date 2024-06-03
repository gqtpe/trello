import React, {useState} from 'react';
import './App.scss';
import {TaskType, TodoList} from "./components/TodoList/TodoList";
import {v4 as uuid} from "uuid";

export type FilterTypeValuesType = "ACTIVE" | "ALL" | "COMPLETED"
export type TodoListType = {
    id: string,
    title: string,
    filter: FilterTypeValuesType
}


function App() {
    let todo1 = uuid()
    let todo2 = uuid()

    let [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: todo1, title: "What to learn", filter: "ACTIVE"},
        {id: todo2, title: "What to do", filter: "ALL"},
    ])
    const removeTodoList = (todoListID: string) => {
        let filteredTodoLists = todoLists.filter(t=>t.id !== todoListID)
        setTodoLists(filteredTodoLists)
        delete tasks[todoListID]
        setTasks({...tasks})
    }
    const changeStatus = (todoLisID: string, taskID: string, isDone: boolean) => {
        let task = tasks[todoLisID].find(t => t.id === taskID)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }

    }
    let [tasks, setTasks] = useState({
        [todo1]: [
            {id: uuid(), title: "CSS", isDone: true},
            {id: uuid(), title: "JS", isDone: true},
            {id: uuid(), title: "React", isDone: false},
            {id: uuid(), title: "React Native", isDone: false},
        ],
        [todo2]: [
            {id: uuid(), title: "wakeup", isDone: true},
            {id: uuid(), title: "do 1st", isDone: true},
            {id: uuid(), title: "code", isDone: false},
            {id: uuid(), title: "rest", isDone: false},
            {id: uuid(), title: "sleep", isDone: false},
        ]
    })

    const removeTask = (todoListID: string, taskID: string) => {
        tasks[todoListID] = tasks[todoListID].filter(t => t.id !== taskID)
        setTasks({...tasks})
    }
    const changeFilter = (todoListID: string, filter: FilterTypeValuesType) => {
        let todoList = todoLists.find(t=>t.id === todoListID)
        if(todoList){
            todoList.filter = filter
        }
        setTodoLists([...todoLists])
    }
    const addTask = (todoListID: string,title: string) => {
        let newTask: TaskType = {id: uuid(), title: title, isDone: false}
        let currTasks = tasks[todoListID]
        tasks[todoListID] = [newTask, ...currTasks]
        setTasks({...tasks})
    }



    console.log(tasks)




    return (
        <div className="App">
            {
                todoLists.map((todoList) => {
                    let resultTasks = tasks[todoList.id]
                    if (todoList.filter === "ACTIVE") {
                        resultTasks = resultTasks.filter(t => !t.isDone)

                    }
                    if (todoList.filter === "COMPLETED") {
                        resultTasks = resultTasks.filter(t => t.isDone)
                    }
                    return <TodoList
                        key={todoList.id}
                        id={todoList.id}
                        title={todoList.title}
                        filter={todoList.filter}
                        removeTodoList={removeTodoList}
                        changeFilter={changeFilter}
                        tasks={resultTasks}
                        removeTask={removeTask}
                        addTask={addTask}
                        changeStatus={changeStatus}
                    />
                })
            }
        </div>
    );
}


export default App;
