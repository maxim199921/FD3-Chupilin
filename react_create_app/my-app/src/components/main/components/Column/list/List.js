import React, { useState } from 'react';
import './List.css';
import { Draggable } from 'react-beautiful-dnd';
import {dragEvents} from '../../../../events';

const List = (props) => {
    console.log(props.numberDisableItem);

    // let [number, setNumber] = useState(props.numberDisableItem);

    const isDisabled = ( index) => {
        dragEvents.emit('changeNumberDisableItem', index);
            // setNumber(3);
    };

    return (
        <Draggable draggableId={props.item.id} index={props.index}
                   isDragDisabled={(props.columnId === 'column-2')
                   &&props.index < props.numberDisableItem}>

            {(provided)=>(
                (props.columnId === 'column-2')?
                <div className={!(props.index < props.numberDisableItem)?'drag_list':'drag_list_block'}
                               {...provided.draggableProps}
                               {...provided.dragHandleProps}
                                ref={provided.innerRef}
                                onDoubleClick={()=>isDisabled( props.index)}>
                    {props.item.name}
                </div>
                :
                <div className='drag_list'
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  ref={provided.innerRef}>
                    {props.item.name}
                </div>)}

        </Draggable>
    );
};

export default List;
