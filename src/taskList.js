import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const TaskItem = styled.div`
margin: 12px;   
padding: 12px;
transition: background 0.2s ease;
border: ${props => (props.isDragging ? '3px solid lightblue' : '1px solid lightgray') };

display: flex;
`
const HandelPoints = styled.div`
    width: 12px;
    height: 12px;
    border-radius: 6px;
    border: 0.5px solid gray;
    background-color: lightgray;

    margin-right: 12px;
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
                    {/*   *** if just point as the active dragable points, put {...provided.dragHandleProps} */}
                    <HandelPoints />
                    { taskObj.title }
                </TaskItem>
            )}
        </Draggable>
        
    )
}