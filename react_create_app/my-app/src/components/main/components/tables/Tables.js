import React, { useState, useEffect } from 'react';
import './Tables.css';
import Column from '../Column/Column';
import { DragDropContext } from 'react-beautiful-dnd';
import {dragEvents} from '../../../events';



const Tables = (props) => {
    let data= {
        data:{
            '1': { id: '1', name: "Start Time"},
            '2': { id: '2', name: "Stop Time"},
            '3': { id: '3', name: "Per Point"},
            '4': { id: '4', name: "Initial Margin"},
            '5': { id: '5', name: "Change %"},
            '6': { id: '6', name: "Change"},
            '7': { id: '7', name: "Last"},
            '8': { id: '8', name: "Last Volume"},
            '9': { id: '9', name: "Bid"},
            '10': { id: '10', name: "Bid Size"},
            '11': { id: '11', name: "Ask"},
            '12': { id: '12', name: "Ask Size"},
            '13': { id: '13', name: "Total Volume"},
            '14': { id: '14', name: "Start Time"}
        },
        columns: {
            'column-1': {
                id: 'column-1',
                title: 'available',
                itemIds: ['1', '2', '3', '4']
            },
            'column-2': {
                id: 'column-2',
                title: 'visible',
                itemIds: ['5', '6', '7', '8', '9', '10', '11', '12', '13', '14']
            }
        },
        columnOrder: ['column-1', 'column-2'],
        numberDisableItem: 6
    };
    let [initialData, setInitialData] = useState(data);

    useEffect(() => {
        dragEvents.addListener('changeNumberDisableItem', changeNumber);
    });

    const changeNumber = (index) => {
        setInitialData({
            ...initialData,
            numberDisableItem: index
        })
    };

    const onDragEnd = (result) => {
        console.log(result);
        const {destination, source, draggableId} = result;

        if(!destination) {
            return;
        }
        if(destination.droppableId === source.droppableId
            && destination.index === source.index) {
            return;
        }

        const start = initialData.columns[source.droppableId];
        const finish = initialData.columns[destination.droppableId];

        if (start === finish) {
            const newItemId = [...start.itemIds];
            newItemId.splice(source.index, 1);
            newItemId.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...start,
                itemIds: newItemId
            };

            const newState = {
                ...initialData,
                columns: {
                    ...initialData.columns,
                    [newColumn.id]: newColumn
                }
            };

            setInitialData(newState);
        }

        if (start !== finish) {
            const startNewItemId = [...start.itemIds];
            startNewItemId.splice(source.index, 1);
            const newStart = {
                ...start,
                itemIds: startNewItemId
            };

            const finishNewItemId = [...finish.itemIds];
            finishNewItemId.splice(destination.index, 0, draggableId);
            const newFinish = {
                ...finish,
                itemIds: finishNewItemId
            };

            const newState = {
                ...initialData,
                columns: {
                    ...initialData.columns,
                    [newStart.id]: newStart,
                    [newFinish.id]: newFinish
                }
            };

            setInitialData(newState);
        }
    };

    const getAvailable = () => {
        const finalObj = {
            availableArr: initialData.columns['column-1'].itemIds,
            visibleArr: initialData.columns['column-2'].itemIds,
            numberOfFixColumn: initialData.numberDisableItem
        };
        console.log(finalObj);
        return finalObj;
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            {initialData.columnOrder.map(columnId=>{
                const column = initialData.columns[columnId];
                const items = column.itemIds.map(id=>{
                    return initialData.data[id];
                });
                const newItems = items.map(item=>{
                    item.status = false;
                    return item;
                })
                return  <div key={column.id} className="col-md-6">
                            <Column key={column.id} column={column}
                                    items={items} columnId={column.id}
                                    numberDisableItem={initialData.numberDisableItem}/>
                        </div>
            })}
            <button type="button" className="btn btn-secondary btn_save"
                    onClick={getAvailable}>save</button>
            <button type="button" className="btn btn-secondary btn_close">cancel</button>
        </DragDropContext>
    );
};

export default Tables;
