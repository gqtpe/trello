import React, {KeyboardEvent, useState} from "react";
import {FilterTypeValuesType} from "../../App";
import styles from './TodoList.module.scss'

type PropsType = {
    id: string
    title: string
    filter: FilterTypeValuesType
    removeTodoList: (todoListID: string) => void
    changeStatus: (todoListID: string, taskID: string, isDone: boolean) => void
    tasks: TaskType[]
    removeTask: (todoListID: string, taskID: string) => void
    changeFilter: (todoListID: string, filter: FilterTypeValuesType) => void
    addTask: (todoListID: string, title: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean

}

export function TodoList({
                             title,
                             tasks,
                             removeTodoList,
                             removeTask,
                             changeFilter,
                             addTask,
                             changeStatus,
                             filter,
                             id
                         }: PropsType) {
    let [newTaskTitle, setTaskNewTitle] = useState<string>('');
    let [error, setError] = useState<string | null>('')
    const enterKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskCallback()
        }
    }
    const addTaskCallback = () => {
        if (newTaskTitle.trim() === '') {
            setTaskNewTitle('')
            setError('Title is required')
            return;
        }
        addTask(id, newTaskTitle)
        setTaskNewTitle('')

    }
    const onChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
        if (error) {
            console.log('error')
            setError('')
        }
        setTaskNewTitle(e.currentTarget.value)
    }
    return (
        <div>
            <h3>{title}
                <button onClick={() => removeTodoList(id)}>x</button>
            </h3>
            <input
                onChange={onChangeHandler}
                type="text"
                onKeyUp={enterKeyPressHandler}
                value={newTaskTitle}
                className={error ? styles.error : ""}
            />
            <button onClick={addTaskCallback}>+</button>
            {error && <div className={styles.errorMessage}>{error}</div>}
            <ul>

                {
                    tasks.map(t => {
                        const onChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
                            changeStatus(id, t.id, e.currentTarget.checked)
                        }
                        return <li key={t.id} className={t.isDone ? styles.isDone : ''}>

                            <input
                                type="checkbox"
                                checked={t.isDone}
                                onChange={onChangeHandler}

                            />
                            <span>{t.title}</span>
                            <button onClick={() => removeTask(id, t.id)}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button className={filter === "ALL" ? styles.activeFilter : ''}
                        onClick={() => changeFilter(id, "ALL")}>All
                </button>
                <button className={filter === "ACTIVE" ? styles.activeFilter : ''}
                        onClick={() => changeFilter(id, "ACTIVE")}>Active
                </button>
                <button className={filter === "COMPLETED" ? styles.activeFilter : ''}
                        onClick={() => changeFilter(id, "COMPLETED")}>Completed
                </button>
            </div>
        </div>
    )
}