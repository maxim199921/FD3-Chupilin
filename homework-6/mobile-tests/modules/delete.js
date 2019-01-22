"use strict";

function deleteItemFilterFunc(filterList, id) {
    let filterClientsChange = filterList.filter((item) => {
            return item.id !== id;
        }
    );
    return filterClientsChange;
}


export {deleteItemFilterFunc};
