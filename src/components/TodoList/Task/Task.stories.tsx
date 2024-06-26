import {Meta, StoryObj} from "@storybook/react"
import {Task} from "./Task";
import {action} from "@storybook/addon-actions";


const meta: Meta<typeof Task> = {
    title: 'TodoList/Task',
    component: Task,
    tags: ['autodocs'],
    args: {
        changeTaskStatus: action('Status changed inside Task'),
        changeTaskTitle: action('Status changed inside Task'),
        removeTask: action('Status changed inside Task'),
        todoListID: 'sdaklj823f',
        task: {id: '1', title: 'task1', isDone: false}
    },

}
export default meta;


type Story = StoryObj<typeof Task>
export const Active: Story = {
    args: {
        task: {id: '1', title: 'React Native', isDone: false},

    }
}
export const Completed: Story = {
    args: {
        task: {id: '1', title: 'TS', isDone: true},

    }
}