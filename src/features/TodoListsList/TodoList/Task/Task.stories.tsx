import {Meta, StoryObj} from "@storybook/react"
import {Task} from "./Task";
import {action} from "@storybook/addon-actions";
import {TaskPriorities, TaskStatuses} from "../../../../common/types";



const meta: Meta<typeof Task> = {
    title: 'TodoList/Task',
    component: Task,
    tags: ['autodocs'],
    args: {
        changeTaskStatus: action('Status changed inside Task'),
        changeTaskTitle: action('Status changed inside Task'),
        removeTask: action('Status changed inside Task'),

    },

}
export default meta;


type Story = StoryObj<typeof Task>
export const Active: Story = {
    args: {
        task: {
            id: '1',
            title: 'React Native',
            status: TaskStatuses.New,
            addedDate: '',
            deadline:'',
            description:'',
            order: 0,
            priority: TaskPriorities.Middle,
            startDate: '',
            todoListId: 'todo1'
        }

    }
}
export const Completed: Story = {
    args: {
        task: {
            id: '1',
            title: 'TS',
            status: TaskStatuses.Completed,
            addedDate: '',
            deadline:'',
            description:'',
            order: 0,
            priority: TaskPriorities.Middle,
            startDate: '',
            todoListId: 'todo1'
        }

    }
}