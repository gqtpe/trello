import type {Meta, StoryObj} from '@storybook/react';
import {Provider} from 'react-redux';
import App from "./App";
import {storyBookStore} from "./store-sb";
import {HashRouter} from "react-router-dom";
import React from "react";

const meta: Meta<typeof App> = {
    title: 'TodoList/App',
    component: App,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <HashRouter>
                <Provider store={storyBookStore}>
                    <Story/>
                </Provider>
            </HashRouter>
        )
    ]

};

export default meta;
type Story = StoryObj<typeof App>;

export const Example: Story = {
    render() {
        return <App demo={true}/>
    }
}
