import isoFetch from "isomorphic-fetch";

export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';
export const FILTER_LAPTOR = 'FILTER_LAPTOR';
export const FILTER_PHONE = 'FILTER_PHONE';
export const FILTER_TABLET = 'FILTER_TABLET';
export const SHOW_ALL_PRICE = 'SHOW_ALL_PRICE';
export const FILTER_SEARCH = 'FILTER_SEARCH';
export const ACTIVE_OR_BLOCK = 'ACTIVE_OR_BLOCK';
export const CNT_CHANGE = 'CNT_CHANGE';
export const CNT_STARTVALUE_NULL = 'CNT_STARTVALUE_NULL';

export const cntStartValue = (id, cntValue) => {
    return {
        type: CNT_STARTVALUE_NULL,
        id: id,
        cntValue: cntValue,
    }
};

export const cntChange = (id, cntValue) => {
    return {
        type: CNT_CHANGE,
        id: id,
        cntValue: cntValue,
    }
};

export const activeStatusSwitch = (id, status) => {
    return {
        type: ACTIVE_OR_BLOCK,
        id: id,
        status: status,
    }
};

export const search = (value) => {
    return {
        type: FILTER_SEARCH,
        value: value,
    }
};

export const filterLaptor = (name) => {
    return {
        type: FILTER_LAPTOR,
        name: name,
    }
};

export const filterPhone = (name) => {
    return {
        type: FILTER_PHONE,
        name: name,
    }
};
export const filterTablet = (name) => {
    return {
        type: FILTER_TABLET,
        name: name,
    }
};

export const filterAll = () => {
    return {
        type: SHOW_ALL_PRICE,
    }
};
// export const loadData = () => {
//     let sp = new URLSearchParams();
//     sp.append('f', 'READ');
//     sp.append('n', 'CHUPILIN_PRIC_LIST');
//     isoFetch("http://fe.it-academy.by/AjaxStringStorage2.php", {
//         method: 'POST',
//         headers: {
//             "Accept": "application/json",
//         },
//         body: sp,
//     })
//         .then( (response) => { // response - HTTP-ответ
//             if (!response.ok) {
//                 let Err=new Error("fetch error " + response.status);
//                 Err.userMessage="Ошибка связи";
//                 throw Err; // дальше по цепочке пойдёт отвергнутый промис
//             }
//             else
//                 return response.json(); // дальше по цепочке пойдёт промис с пришедшими по сети данными
//         })
//         .then( (data) => {
//             try {
//                 return this.fetchSuccess(JSON.parse(data.result));// передаём полезные данные в fetchSuccess, дальше по цепочке пойдёт успешный пустой промис
//             }
//             catch ( error ){
//                 this.fetchError(error.message); // если что-то пошло не так - дальше по цепочке пойдёт отвергнутый промис
//             }
//         })
//         .catch( (error) => {
//             this.fetchError(error.userMessage||error.message);
//         })
//     ;
//
// };
// export const fetchError = (errorMessage) => {
//     return { type:"FETCH_DATA_FAILURE" } ;
// };
// export const fetchSuccess = (loadedData) => {
//     return { type:"FETCH_DATA_SUCCESS",
//         priceList: loadedData.priceList} ;
// };