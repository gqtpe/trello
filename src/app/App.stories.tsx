import type {Meta, StoryObj} from '@storybook/react';
import {Provider} from 'react-redux';
import App from "./App";
import {storyBookStore} from "./store-sb";

const meta: Meta<typeof App> = {
    title: 'TodoList/App',
    component: App,
    tags: ['autodocs'],


};

export default meta;
type Story = StoryObj<typeof App>;

export const Example: Story = {
    render: () => {
        return <Provider store={storyBookStore}>
            <App demo={true}/>
        </Provider>
    }
}