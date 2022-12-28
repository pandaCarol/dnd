import React from "react";
import styled from "styled-components";
import TaskList from "./taskList";
import { Droppable, Draggable } from "react-beautiful-dnd";

const Container = styled.div`
    margin: 6px;
    width: 33%;
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

export default function ColumnList({col, tasks, index}) {
    //console.dir(<i class="fa fa-tasks" aria-hidden="true"></i>);

    return(
        <Draggable draggableId={col.id} index={index}>
            {provided  => (
                <Container 
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                >
                    <TitleCol { ...provided.dragHandleProps }>{col.title}</TitleCol>
                    <Droppable droppableId={ col.id } type='task'> 
                        {(provided, snapshot)=> (
                            <TodoTask
                                ref = { provided.innerRef }
                                {...provided.droppableProps}
                                style = {{border: snapshot.isDraggingOver ? '6px solid lightgray' : '1px solid light'}}
                                //****Using style ={...} way to solve the problem that can't find the upper level */
                                //isDraggingOver = {snapshot.isDraggingOver}
                            >
                                {tasks.map((task, index)=> <TaskList key={task.id} taskObj={task} index={index}></TaskList>)}
                                { provided.placeholder }
                            </TodoTask>
                        )} 
                    </Droppable>
                    { /*console.dir(Droppable.snapshot) */}
                </Container>
            )}          
        </Draggable>
        

        
    )
}