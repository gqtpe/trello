import {useState} from "react";

import {v4} from "uuid";
import { TaskType } from "../../../common/types";
import {todo1, todo2} from "../../id-utils";

export function useTasks() {
    let [tasks, setTasks] = useState<{ [key: string]: TaskType[] }>({
        [todo1]: [
            {id: v4(), title: "CSS", isDone: true},
            {id: v4(), title: "JS", isDone: true},
            {id: v4(), title: "React", isDone: false},
            {id: v4(), title: "React Native", isDone: false},
        ],
        [todo2]: [
            {id: v4(), title: "wakeup", isDone: true},
            {id: v4(), title: "do 1st", isDone: true},
            {id: v4(), title: "code", isDone: false},
            {id: v4(), title: "rest", isDone: false},
            {id: v4(), title: "sleep", isDone: false},
        ]
    })
    const changeStatus = (todoLisID: string, taskID: string, isDone: boolean) => {
        let task = tasks[todoLisID].find(t => t.id === taskID)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }

    }
    const removeTask = (todoListID: string, taskID: string) => {
        tasks[todoListID] = tasks[todoListID].filter(t => t.id !== taskID)
        setTasks({...tasks})
    }
    const addTask = (todoListID: string, title: string) => {
        let newTask: TaskType = {id: v4(), title: title, isDone: false}
        let currTasks = tasks[todoListID]
        tasks[todoListID] = [newTask, ...currTasks]
        setTasks({...tasks})
    }
    const changeTaskTitle = (todoListID: string, taskID: string, title: string) => {
        let currTasks = tasks[todoListID]
        let task = currTasks.find(t => t.id === taskID)
        if (task) {
            task.title = title
            setTasks({...tasks})
        }

    }
    const completelyRemoveTasksForTodoList = (id: string) =>{
        delete tasks[id]
        setTasks({...tasks})
    }
    const addTaskForNewTodoList = (id: string) =>{
        tasks[id] = []
        setTasks({...tasks})
    }
    return {tasks,changeStatus,
        removeTask,
        addTask,
        changeTaskTitle,
        completelyRemoveTasksForTodoList,
        addTaskForNewTodoList}
}