import React, {useState, KeyboardEvent} from "react";
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

export function Todolist({title, tasks, removeTask, changeFilter, addTask}: PropsType) {
    let [newTaskTitle, setTaskNewTitle] = useState<string>('');
    const enterKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTask(newTaskTitle)
        }
    }
    return (
        <div>
            <h3>{title}</h3>
            <input
                onChange={(e) => setTaskNewTitle(e.currentTarget.value)}
                type="text"
                onKeyUp={enterKeyPressHandler}
                value={newTaskTitle}
                className={error?styles.error:""}
            />
            <button onClick={() => addTask(newTaskTitle)}>+</button>
            <ul>

                {
                    tasks.map(t => <li key={t.id}>
                        <input
                            type="checkbox"
                            checked={t.isDone}
                        />
                        <span>{t.title}</span>
                        <button onClick={() => removeTask(t.id)}>x</button>
                    </li>)
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