import type {Meta, StoryObj} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import AddItemForm from './AddItemForm';




const meta: Meta<typeof AddItemForm> = {
    title: 'Common/AddItemForm',
    component: AddItemForm,
    tags: ['autodocs'],
    argTypes: {
        addItem: {
            type: 'function',
            description: 'Button clicked inside form',
            action: 'clicked',
        },
    }
}
export default meta;
type Story = StoryObj<typeof AddItemForm>

export const Default: Story = {
    args:{
        addItem: action('Button clicked inside form')
    }
}

