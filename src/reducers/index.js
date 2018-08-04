import { combineReducers } from 'redux'
import {   
        categories,
        posts,
        comments
} from './reducers'

export default combineReducers({
    categories,
    posts,
    comments
});