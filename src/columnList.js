import React from "react";
import styled from "styled-components";
import TaskList from "./taskList";
import { Droppable } from "react-beautiful-dnd";

const Container = styled.div`
    margin: 6px;
    width: 50%;
    border: 1px solid lightgray;
`;
const TitleCol = styled.h2`
    margin: 12px;   
    padding: 12px;    
    text-align: center;
`;
const TodoTask = styled.div`
    padding: 8px;
`;

//***Questions:
// */ I have no idea where is the upper level of 'isDraggingOver'. Props.isDraagingOver undef, but below snapshot.isDragging Over works!
//border: ${props => (props.isDraggingOver ? '3px solide lightyellow' : 'lightgray')};

export default function ColumnList({col, tasks}) {
    //console.dir(<i class="fa fa-tasks" aria-hidden="true"></i>);

    return(
        <Droppable droppableId={col.id}>
            {(provided, snapshot) => (
                <Container 
                    ref = {provided.innerRef}
                    {...provided.droppableProps}
                    style = {{border: snapshot.isDraggingOver ? '6px solid lightgray' : 'none'}}
                    //****Using style ={...} way to solve the problem that can't find the upper level */
                    //isDraggingOver = {snapshot.isDraggingOver}
                >
                    <TitleCol>{col.title}</TitleCol>
                    <TodoTask>{tasks.map((task, index)=> <TaskList key={task.id} taskObj={task} index={index}></TaskList>)}</TodoTask>
                    {console.dir(Droppable.snapshot)}
                    { provided.placeholder }
                </Container>
            )}
        </Droppable>
        
    )
}