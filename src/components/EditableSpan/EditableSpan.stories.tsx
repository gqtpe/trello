import {Meta, StoryObj} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import EditableSpan from "./EditableSpan";




const meta: Meta<typeof EditableSpan> = {
    title: 'Common/EditableSpan',
    component: EditableSpan,
    args:{
        setValue: action('Set value called inside form')
    },
    argTypes:{
      edit: {
          control: 'boolean'
      }
    },
    tags: ['autodocs']
}

export default meta

type Story = StoryObj<typeof EditableSpan>



export const Default: Story = {
    args: {
        value: 'title',
    }
}
export const Edit: Story = {
    args: {
        value: 'title',
        edit: true
    }
}
export const Error: Story = {
    args: {
        value: 'title',
        edit: true,
        error: 'error'
    }
}


