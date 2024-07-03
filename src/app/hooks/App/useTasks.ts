import {useState} from "react";

import {v4} from "uuid";
import {TaskPriorities, TasksStateType, TaskStatuses, TaskType} from "../../../common/types";
import {todo1, todo2} from "../../id-utils";

export function useTasks() {
    let [tasks, setTasks] = useState<TasksStateType>({
            [todo1]: [
                {
                    id: v4(),
                    title: 'CSS',
                    addedDate: '',
                    deadline: '',
                    description: '',
                    order: 0,
                    priority: TaskPriorities.Low,
                    startDate: '',
                    status: TaskStatuses.New,
                    todoListId: todo1
                },
                {
                    id: v4(),
                    title: 'React',
                    addedDate: '',
                    deadline: '',
                    description: '',
                    order: 0,
                    priority: TaskPriorities.Low,
                    startDate: '',
                    status: TaskStatuses.Completed,
                    todoListId: todo1
                },
                {
                    id: v4(),
                    title: 'TS',
                    addedDate: '',
                    deadline: '',
                    description: '',
                    order: 0,
                    priority: TaskPriorities.Low,
                    startDate: '',
                    status: TaskStatuses.New,
                    todoListId: todo1
                },
                {
                    id: v4(),
                    title: 'Next',
                    addedDate: '',
                    deadline: '',
                    description: '',
                    order: 0,
                    priority: TaskPriorities.Low,
                    startDate: '',
                    status: TaskStatuses.Completed,
                    todoListId: todo1
                },
            ],
            [todo2]: [
                {
                    id: v4(),
                    title: 'wakeup',
                    addedDate: '',
                    deadline: '',
                    description: '',
                    order: 0,
                    priority: TaskPriorities.Low,
                    startDate: '',
                    status: TaskStatuses.Completed,
                    todoListId: todo2
                },
                {
                    id: v4(),
                    title: 'do important',
                    addedDate: '',
                    deadline: '',
                    description: '',
                    order: 0,
                    priority: TaskPriorities.Low,
                    startDate: '',
                    status: TaskStatuses.New,
                    todoListId: todo2
                },
                {
                    id: v4(),
                    title: 'code',
                    addedDate: '',
                    deadline: '',
                    description: '',
                    order: 0,
                    priority: TaskPriorities.Low,
                    startDate: '',
                    status: TaskStatuses.New,
                    todoListId: todo2
                },
                {
                    id: v4(),
                    title: 'Next',
                    addedDate: '',
                    deadline: '',
                    description: '',
                    order: 0,
                    priority: TaskPriorities.Low,
                    startDate: '',
                    status: TaskStatuses.Completed,
                    todoListId: todo2
                },
            ]
        })
    const changeStatus = (todoLisID: string, taskID: string, status: TaskStatuses) => {
        let task = tasks[todoLisID].find(t => t.id === taskID)
        if (task) {
            task.status = status
            setTasks({...tasks})
        }

    }
    const removeTask = (todoListID: string, taskID: string) => {
        tasks[todoListID] = tasks[todoListID].filter(t => t.id !== taskID)
        setTasks({...tasks})
    }
    const addTask = (todoListID: string, title: string) => {
        let newTask: TaskType = {
            id: v4(),
            title: title,
            status: TaskStatuses.New,
            todoListId: todo1,
            startDate: (new Date().getTime()).toString(),
            priority: TaskPriorities.Middle,
            order: 0,
            description: '',
            deadline: '',
            addedDate: (new Date().getTime()).toString(),
        }
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
    const completelyRemoveTasksForTodoList = (id: string) => {
        delete tasks[id]
        setTasks({...tasks})
    }
    const addTaskForNewTodoList = (id: string) => {
        tasks[id] = []
        setTasks({...tasks})
    }
    return {
        tasks, changeStatus,
        removeTask,
        addTask,
        changeTaskTitle,
        completelyRemoveTasksForTodoList,
        addTaskForNewTodoList
    }
}