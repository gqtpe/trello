import React, {KeyboardEvent, useState} from "react";
import {FilterTypeValuesType} from "../../App";
import styles from './TodoList.module.scss'

type PropsType = {
    title: string
    tasks: TaskType[]
    filter: FilterTypeValuesType
    removeTask: (id: string) => void
    changeFilter: (filter: FilterTypeValuesType) => void
    addTask: (title: string) => void
    changeStatus: (taskID: string, isDone:boolean) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean

}

export function Todolist({title, tasks, removeTask, changeFilter, addTask, changeStatus, filter}: PropsType) {
    let [newTaskTitle, setTaskNewTitle] = useState<string>('');
    let [error, setError] = useState<string|null>('')
    const enterKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskCallback()
        }
    }
    const addTaskCallback = () =>{
        if(newTaskTitle.trim() === ''){
            setTaskNewTitle('')
            setError('Title is required')
            return;
        }
        addTask(newTaskTitle)
        setTaskNewTitle('')

    }
    const onChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
        if(error){
            console.log('error')
            setError('')
        }
        setTaskNewTitle(e.currentTarget.value)
    }
    return (
        <div>
            <h3>{title}</h3>
            <input
                onChange={onChangeHandler}
                type="text"
                onKeyUp={enterKeyPressHandler}
                value={newTaskTitle}
                className={error?styles.error:""}
            />
            <button onClick={addTaskCallback}>+</button>
            {error && <div className={styles.errorMessage}>{error}</div>}
            <ul>

                {
                    tasks.map(t => {
                        const onChangeHandler = (e: React.FormEvent<HTMLInputElement>) =>{
                            changeStatus(t.id, e.currentTarget.checked)
                        }
                        return <li key={t.id} className={t.isDone?styles.isDone:''}>

                            <input
                                type="checkbox"
                                checked={t.isDone}
                                onChange={onChangeHandler}

                            />
                            <span>{t.title}</span>
                            <button onClick={() => removeTask(t.id)}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button className={filter === "ALL"? styles.activeFilter:''} onClick={() => changeFilter("ALL")}>All</button>
                <button className={filter === "ACTIVE"? styles.activeFilter:''} onClick={() => changeFilter("ACTIVE")}>Active</button>
                <button className={filter === "COMPLETED"? styles.activeFilter:''} onClick={() => changeFilter("COMPLETED")}>Completed</button>
            </div>
        </div>
    )
}