"use strict";

function saveNewItemImmutable(arr, hash) {
    let clientsChange = [...arr];
    let newArr = [...clientsChange, hash];
    return newArr;
}



export {saveNewItemImmutable};
