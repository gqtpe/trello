import React from "react";
import {FilterTypeValuesType} from "../../App";

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: number) => void
    changeFilter: (filter: FilterTypeValuesType) => void
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean

}

export function Todolist({title, tasks, removeTask, changeFilter}: PropsType) {
    return (
        <div>
            <h3>{title}</h3>
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
                <button onClick={() => changeFilter("ALL")}>All</button>
                <button onClick={() => changeFilter("ACTIVE")}>Active</button>
                <button onClick={() => changeFilter("COMPLETED")}>Completed</button>
            </div>
        </div>
    )
}