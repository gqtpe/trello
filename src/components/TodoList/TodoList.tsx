import React from "react";

type PropsType = {
    title: string
    tasks: TaskType[]
}

export type TaskType = {
    id: number
    title:string
    isDone: boolean
}

export function Todolist({title, tasks}: PropsType) {
    return (
        <div>
            <h3>{title}</h3>
            <ul>
                <li><input type="checkbox" checked={tasks[0].isDone}/><span>{tasks[0].title}</span></li>
                <li><input type="checkbox" checked={tasks[0].isDone}/><span>{tasks[1].title}</span></li>
                <li><input type="checkbox" checked={tasks[0].isDone}/><span>{tasks[2].title}</span></li>
                <li><input type="checkbox" checked={tasks[0].isDone}/><span>{tasks[3].title}</span></li>
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}