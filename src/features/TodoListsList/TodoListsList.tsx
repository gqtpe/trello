import React from 'react';
import {useTodoLists} from "./hooks/useTodoLists";
import Grid from "@mui/material/Grid/Grid";
import {Container, Paper} from "@mui/material";
import AddItemForm from "../../components/AddItemForm/AddItemForm";
import TodoList from "./TodoList/TodoList";

const TodoListsList = () => {
    const {
        todoLists,
        addTodoList,
        removeTodoList,
        changeTodoListTitle,
        changeFilter,
        tasks,
        changeTaskTitle,
        removeTask,
        changeTaskStatus,
        addTask,
    } = useTodoLists()
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

                            changeFilter={changeFilter}
                            removeTodoList={removeTodoList}
                            changeTodoListTitle={changeTodoListTitle}

                            removeTask={removeTask}
                            addTask={addTask}
                            changeStatus={changeTaskStatus}
                            changeTaskTitle={changeTaskTitle}
                        />
                    })
                }
            </Grid>
        </Container>
    )
        ;
};

export default TodoListsList;