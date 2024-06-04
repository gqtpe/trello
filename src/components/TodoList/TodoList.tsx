import React from "react";
import {FilterTypeValuesType} from "../../App";
import styles from './TodoList.module.scss'
import {AddItemForm} from "../AddItemForm/AddItemForm";
import EditableSpan from "../EditableSpan/EditableSpan";

type PropsType = {
    id: string
    title: string
    filter: FilterTypeValuesType
    removeTodoList: (todoListID: string) => void
    changeFilter: (todoListID: string, filter: FilterTypeValuesType) => void
    changeTodoListTitle: (todoListID: string, title: string) => void

    tasks: TaskType[]
    removeTask: (todoListID: string, taskID: string) => void
    changeStatus: (todoListID: string, taskID: string, isDone: boolean) => void
    changeTaskTitle: (todoListID: string, taskID: string, title: string) => void
    addTask: (todoListID: string, title: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean

}

export const TodoList = ({
                             title,
                             changeTodoListTitle,
                             tasks,
                             removeTodoList,
                             removeTask,
                             changeFilter,
                             changeTaskTitle,
                             addTask,
                             changeStatus,
                             filter,
                             id
                         }: PropsType) => {
    return (
        <div>
            <h3><EditableSpan value={title} setValue={(value)=>changeTodoListTitle(id,value)}/><button onClick={() => removeTodoList(id)}> x</button>
        </h3>
    <AddItemForm addItem={(title) => addTask(id, title)}/>
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
                    <EditableSpan value={t.title} setValue={(value) => changeTaskTitle(id, t.id, value)}/>
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

