import type {Meta, StoryObj} from '@storybook/react';
import {Provider} from 'react-redux';
import DrawerApp from "./DrawerApp";
import {storyBookStore} from "../../store-sb";


const meta: Meta<typeof DrawerApp> = {
    title: 'TodoList/DrawerApp',
    component: DrawerApp,
    tags: ['autodocs'],


};

export default meta;
type Story = StoryObj<typeof DrawerApp>;

export const DrawerAppxStory: Story = {
    render: () => {
        return <Provider store={storyBookStore}>
            <DrawerApp demo={true}/>
        </Provider>
    }
}