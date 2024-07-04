import React, {useEffect, useState} from 'react'
import {todoListsAPI, UpdateTaskPayload} from "./todo-listsAPI";

export default {
    title: 'API',
}
export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListsAPI.getTodoLists()
            .then((response) => {
                setState(response.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'new todolist'
        todoListsAPI.createTodoList(title)
            .then((response) => {
                setState(response.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const id = '3068283e-1b2f-4ebb-b403-cff6e2fc3abc'
        todoListsAPI.deleteTodoList(id)
            .then((response) => {
                    setState(response.data)
                }
            )
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const id = '4575688a-c103-4296-942a-923c99709660'
        const newTitle = 'updated title'
        todoListsAPI.updateTodoList(id, newTitle)
            .then((response) => {
                setState(response.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListID = '4575688a-c103-4296-942a-923c99709660'
        todoListsAPI.getTasks(todoListID)
            .then((response) => {
                setState(response.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListID = '4575688a-c103-4296-942a-923c99709660'
        todoListsAPI.createTask(todoListID, '1 task')
            .then((response) => {
                setState(response.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListID = '4575688a-c103-4296-942a-923c99709660'
        const taskID = "f67ca997-7c0f-457a-8c6b-e5968d8db3fb"
        todoListsAPI.deleteTask(todoListID, taskID)
            .then((response) => {
                setState(response.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListID = '4575688a-c103-4296-942a-923c99709660'
        const taskID = "f67ca997-7c0f-457a-8c6b-e5968d8db3fb"
        const task: UpdateTaskPayload = {
            title: 'task2',
            deadline: '07/05/2004',
            description: 'task222',
            priority: 1,
            startDate: '02/05/2004',
            status: 1,
        }

        todoListsAPI.updateTask(todoListID, taskID, task)
            .then((response) => {
                setState(response.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}