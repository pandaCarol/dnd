import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const TaskItem = styled.div`
margin: 12px;   
padding: 12px;
transition: background 0.2s ease;
border: ${props => (props.isDragging ? '3px solid lightblue' : '1px solid lightgray') };
`

export default function TaskList({ taskObj, index }) {
    return(
        <Draggable draggableId={taskObj.id} index={index}>
            {(provided, snapshot) => (
                <TaskItem
                    { ...provided.draggableProps }
                    { ...provided.dragHandleProps }
                    ref = { provided.innerRef }
                    isDragging = { snapshot.isDragging }
                >
                    { taskObj.title }
                </TaskItem>
            )}
        </Draggable>
        
    )
}