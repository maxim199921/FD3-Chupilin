"use strict";

function editChangeItemImmutable(arr, hash, id) {
    let newArr = [...arr];
    newArr.forEach((item, i) => {
        if(id === item.id) {
            let newHash = {...item};
            newHash = {...hash};
            newArr[i]=newHash;
        }
    });
    return newArr;
}


export {editChangeItemImmutable};
