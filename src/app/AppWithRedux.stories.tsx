import type {Meta, StoryObj} from '@storybook/react';
import {Provider} from 'react-redux';
import AppWithRedux from "./AppWithRedux";
import {store} from '../state/store';


const meta: Meta<typeof AppWithRedux> = {
    title: 'TodoList/AppWithRedux',
    component: AppWithRedux,
    tags: ['autodocs'],


};

export default meta;
type Story = StoryObj<typeof AppWithRedux>;

export const AppWithReduxStory: Story = {
    render: () => {
        return <Provider store={store}>
            <AppWithRedux/>
        </Provider>
    }
}