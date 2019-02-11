import {combineReducers} from 'redux';
import catalogReduser from "./CatalogReduser";
import commentsReduser from "./CommentsReduser";

export default combineReducers({
    catalogList: catalogReduser,
    comments: commentsReduser,
});


