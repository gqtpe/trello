import React from 'react';
import {useTodoLists} from "./hooks/useTodoLists";
import {Container, Grid, Paper} from "@mui/material";
import AddItemForm from "../../components/AddItemForm/AddItemForm";
import TodoList from "./TodoList/TodoList";


type PropsType = {
    demo?: boolean
}
export const TodoListsList = ({demo = false}: PropsType) => {
    const {
        todoLists,
        tasks,
        addTodoList
    } = useTodoLists(demo)
    return (
        <Container>
            <Grid container margin={2}><Paper sx={{padding: "5px"}}><AddItemForm addItem={addTodoList}/></Paper></Grid>
            <Grid container margin={2} direction="row" alignItems={'flex-start'} flexWrap={'wrap'} gap={2}>
                {
                    todoLists.map((todoList) => {
                        return <TodoList
                            todoList={todoList}
                            key={todoList.id}
                            tasks={tasks[todoList.id]}
                            demo={demo}
                        />
                    })
                }
            </Grid>
        </Container>
    )
        ;
};