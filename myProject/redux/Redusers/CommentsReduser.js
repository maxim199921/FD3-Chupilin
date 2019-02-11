import {FETCH_DATA_COMENTS_SUCCESS,
        FETCH_DATA_COMENTS_FAILURE,
            } from '../ActionCreaters/CommentsActions'

const initialState = {
    commentsList: [],
};

const CommentsReduser = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DATA_COMENTS_SUCCESS:
            return {...state,
                commentsList: action.commentsList};
        case FETCH_DATA_COMENTS_FAILURE:
            console.log('ошибка связи');
            return state;
        default:
            return state;
    }
};

export default CommentsReduser;