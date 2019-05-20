import React, { useState } from 'react';
import './Column.css';
import List from './list/List';
import { Droppable } from 'react-beautiful-dnd';

const Column = (props) => {
    return (
        <div className='column_wrapper'>
            <div className='column_title'>{props.column.title}</div>
            <Droppable droppableId={props.column.id}>
                {(provided)=>(<div className='column_available_list'
                                   ref={provided.innerRef}
                                   {...provided.droppableProps}>
                    {props.items.map((item, index)=>{
                        return <List key={item.id} item={item} index={index}
                                     columnId={props.columnId}
                                     numberDisableItem={props.numberDisableItem}/>
                    })}
                    {provided.placeholder}
                </div>)}
            </Droppable>
        </div>

    );
};

export default Column;
