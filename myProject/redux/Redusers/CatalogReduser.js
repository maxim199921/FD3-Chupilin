import {FETCH_DATA_SUCCESS,
        FETCH_DATA_FAILURE,
        FILTER_LAPTOR,
        FILTER_PHONE,
        FILTER_TABLET,
        SHOW_ALL_PRICE,
        FILTER_SEARCH,
        ACTIVE_OR_BLOCK,
        CNT_CHANGE,
        CNT_STARTVALUE_NULL} from '../ActionCreaters/CatalogActions'

const initialState = {
    isLoaded: false,
    startPriceList: [],
    priceList: [],
    checkedRadio: 0,
    foundNull: false,
};

const CatalogReduser = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DATA_SUCCESS:
            if (!state.isLoaded) {
                let newState={...state, isLoaded: true};
                newState.startPriceList = action.priceList;
                newState.priceList = action.priceList;
                return newState;
            } else {
                return {...state,
                    foundNull: false};
            }
        case FETCH_DATA_FAILURE:
            console.log('ошибка связи');
            return {
                ...state,
                isLoaded: false,
            };
        case CNT_STARTVALUE_NULL:
            let changeCntStartListNull={...state};
            let coppyCntStartListNull = changeCntStartListNull.startPriceList.map((item) => {
                if (item.id === action.id){
                    return {...item, cnt: action.cntValue};
                }
                return item;
            });
            changeCntStartListNull.startPriceList = coppyCntStartListNull;
            //-иммутабельные изменениея для перерисовки только одного элемента а не всех 50ти
            let changeCntCurrentPriceListNull = changeCntStartListNull.priceList.map((item) => {
                if (item.id === action.id){
                    return {...item, cnt: action.cntValue};
                }
                return item;
            });
            changeCntStartListNull.priceList = changeCntCurrentPriceListNull;
            return changeCntStartListNull;
        case CNT_CHANGE:
            let changeCntStartList={...state};
            let coppyCntStartList = changeCntStartList.startPriceList.map((item) => {
                if (item.id === action.id){
                    return {...item, cnt: item.cnt + action.cntValue};
                }
                return item;
            });
            changeCntStartList.startPriceList = coppyCntStartList;
            //-иммутабельные изменениея для перерисовки только одного элемента а не всех 50ти
            let changeCntCurrentPriceList = changeCntStartList.priceList.map((item) => {
                if (item.id === action.id){
                    return {...item, cnt: item.cnt + action.cntValue};
                }
                return item;
            });
            changeCntStartList.priceList = changeCntCurrentPriceList;
            return changeCntStartList;
        case ACTIVE_OR_BLOCK:
            let changeStatusStartList={...state};
            let coppyStartList = [...changeStatusStartList.startPriceList];
            coppyStartList[action.id -1].status = action.status;
            changeStatusStartList.startPriceList = coppyStartList;
            //-иммутабельные изменениея для перерисовки только одного элемента а не всех 50ти
            let changeStatusCurrentPriceList = changeStatusStartList.priceList.map((item) => {
                if (item.id === action.id){
                    return {...item, status: action.status};
                }
                return item;
            });
            changeStatusStartList.priceList = changeStatusCurrentPriceList;
            return changeStatusStartList;
        case FILTER_SEARCH:
            if (action.value) {
                let filterSearch={...state, checkedRadio: 4};
                let finelSearchArr = state.startPriceList.filter((item) => {
                    return (item.type.toLowerCase().indexOf(action.value.toLowerCase()) > -1)
                        ||(item.model.toLowerCase().indexOf(action.value.toLowerCase()) > -1)
                        ||(item.price.toLowerCase().indexOf(action.value.toLowerCase()) > -1)
                });
                if (finelSearchArr.length === 0) {
                    filterSearch.foundNull = true;
                } else {
                    filterSearch.foundNull = false;
                }
                filterSearch.priceList = finelSearchArr;
                return filterSearch;
            } else {
                return {...state, priceList: [], checkedRadio: 4, foundNull: true};
            }
        case FILTER_LAPTOR:
            let filterLaptor={...state, checkedRadio: 1, foundNull: false};
            let filterLaptorFromstartPriceList = state.startPriceList.filter((item) => {
                    return item.type === action.name;
                }
            );
            filterLaptor.priceList = filterLaptorFromstartPriceList;
            return filterLaptor;
        case FILTER_PHONE:
            let filterPhone={...state, checkedRadio: 2, foundNull: false};
            let filterPhoneFromstartPriceList = state.startPriceList.filter((item) => {
                    return item.type === action.name;
                }
            );
            filterPhone.priceList = filterPhoneFromstartPriceList;
            return filterPhone;
        case FILTER_TABLET:
            let filterTablet={...state, checkedRadio: 3, foundNull: false};
            let filterTabletFromstartPriceList = state.startPriceList.filter((item) => {
                    return item.type === action.name;
                }
            );
            filterTablet.priceList = filterTabletFromstartPriceList;
            return filterTablet;
        case SHOW_ALL_PRICE:
            let showAllPrice={...state, checkedRadio: 0, foundNull: false};
            showAllPrice.priceList = state.startPriceList;
            return showAllPrice;
        default:
            return state;
    }
};

export default CatalogReduser;