import type {Meta, StoryObj} from '@storybook/react';
import {Provider} from 'react-redux';
import {store} from '../state/store';
import App from "./App";

const meta: Meta<typeof App> = {
    title: 'TodoList/App',
    component: App,
    tags: ['autodocs'],


};

export default meta;
type Story = StoryObj<typeof App>;

export const Example: Story = {
    render: () => {
        return <Provider store={store}>
            <App/>
        </Provider>
    }
}