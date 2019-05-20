import { EXAMPLE_ACTION } from '../ActionCreaters/indexActions'

const initialState = {
    indexData: [],
};

const ExamleReduser = (state = initialState, action) => {
    switch (action.type) {
        case EXAMPLE_ACTION:
            return state;
        default:
            return state;
    }
};

export default ExamleReduser;