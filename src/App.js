import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';
import DataObj from './taskData';
import ColumnList from './columnList';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useState } from 'react';

//const dataPackage = DataObj;
//const ids = dataPackage.columnOrder[0];
//console.dir(dataPackage.columns[ids]);
const Wrapping = styled.div`
  display: flex;
  flex-directon: column;
  flex-grow: 1;
  min-height: 300px;
`

export default function App() {
  const [state, setState] = useState(DataObj);
  console.dir(state);

  let col;
  let taskInCol;
  const columnGroup = state.columnOrder.map((colId, index) => {
    col = state.columns[colId];
    taskInCol = col.taskIds.map((tId) => state.tasks[tId]);
    return(
      <ColumnList key={colId} col={col} tasks={taskInCol} index={index}></ColumnList>
    )
  })

  const onDragStart = () => {
    document.body.style.color = 'gray';
    document.body.style.transition = 'backgroundColor 2s ease';
  }

  const onDragUpdate = update => {
    const { destination } = update;
    const opacity = destination ? destination.index / Object.keys(state.tasks).length : 0;
    //console.dir(opacity);
    //** opacity in rgba to set up */
    document.body.style.backgroundColor = `rgba(189, 201, 255, ${opacity})`;
  }

  const onDragEnd = result => {
    document.body.style.color = 'inherit';
    document.body.style.backgroundColor = 'inherit';
    

    const { destination, source, draggableId, type } = result;
 
    //*** if no change on drppableId and index, means no action, then return */ 
    if (!destination) { return };
    if ( source.index === destination.index && source.droppableId === destination.droppableId) { return };

    //***moving the columns */
    if(type === 'column') {
      const newColumnOrder = Array.from(state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index,0, draggableId);

      const newState = {
        ...state,
        columnOrder: newColumnOrder
      }

      setState(newState);
      return
    }

    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    //**for single column, just focus on the index part */
    //const targetCol = state.columns[source.droppableId];
    //if the action inside of a column, then same process as before (signle colum dnd)
    if ( state === finish ) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index,0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [start.id]: newColumn,
        }
      }

      setState(pre => newState);
      return;
    }

    //***moving from one list to another  */
    const startTaksIds = Array.from(start.taskIds);
    startTaksIds.splice(source.index, 1);
    const newStart = {
      ...start, 
      taskIds: startTaksIds,
    }

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newfinish = {
      ...finish,
      taskIds: finishTaskIds, 
    }

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newfinish.id]: newfinish,
      }
    }

    setState(newState);
  }
  
  return(
    <DragDropContext 
      onDragStart = { onDragStart }
      onDragUpdate = { onDragUpdate }
      onDragEnd = { onDragEnd }
    >
      <Droppable droppableId='allColumns' direction='horizontal' type='column'>
        { provided => (
          <Wrapping
            ref = { provided.innerRef }
            {...provided.droppableProps}
          >
            { columnGroup }
            { provided.placeholder }
          </Wrapping>
        )}
      </Droppable>
      
    </DragDropContext>
  )
}