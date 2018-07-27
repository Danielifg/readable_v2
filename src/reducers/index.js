import { combineReducers } from 'redux';


export default combineReducers({
    categories,
    posts,
    comments,
    postDialog,
    postDetail,
    snackbar,
    commentDialog
});
import {
    LOAD_CATEGORIES,
    OPEN_COMMENT_DIALOG,
    CLOSE_COMMENT_DIALOG,
    HANDLE_COMMENT_DIALOG_CHANGE,
    OPEN_EDIT_COMMENT_DIALOG,
    CREATE_COMMENT,
    EDIT_COMMENT,
    FETCH_COMMENTS_ACTIVE,
    FETCH_COMMENTS_SUCCESS,
    FETCH_COMMENTS_FAILURE,
    CREATE_COMMENT,
    DELETE_COMMENT,
    EDIT_COMMENT

 } from '../actions';

/**
 * CATEGORIES
 */
function categories (state = [], action) {
    switch (action.type) {
        case LOAD_CATEGORIES:
              return {
                categories: action.categories
            };
        default:
            return state;
    }
}

/**
 * COMMENTS
 */
const init = {
    isOpen: false,
    isEdit: false,
    comments:null,
    isFetching:false,
    error:null
}
function commentS(state = init, action){
    switch (action.type) {
        case 'FETCH_COMMENTS_ACTIVE':
        case 'FETCH_COMMENTS_FAILURE':
        return {
            ...state,
            isFetching: action.isFetching,
            error: action.error
          };

        case 'FETCH_COMMENTS_SUCCESS':
        return {
            ...state,
            comments: action.payload,
            isFetching: action.isFetching,
                 error: null
               };
         case 'CREATE_COMMENT':
          let existingComments = state[action.comment.parentId] || [];
          return {
               ...state,
              [action.comment.parentId]: existingComments.concat(action.comment)
              }
        case 'UP_VOTE_COMMENT':
        case 'DOWN_VOTE_COMMENT':
        case 'EDIT_COMMENT':
                  existingComments = state[action.comment.parentId] || [];
                  return {
                      ...state,
                      [action.comment.parentId]: existingComments
                          .filter(comment => comment.id !== action.comment.id)
                          .concat(action.comment)
                          .sort((a, b) => {
                              return a.timestamp - b.timestamp;
                          })
                  }
        case 'DELETE_COMMENT':
                  existingComments = state[action.postId] || []
                  return {
                      ...state,
                      [action.postId]: existingComments
                    }
                    default:
                        return state;
        case 'OPEN_COMMENT_DIALOG':
            return {
                ...state,
                isOpen: true
            }
        case 'OPEN_EDIT_COMMENT_DIALOG':
            const {body, author, id} = action.comment
            return {
                ...state,
                isEdit: true,
                isOpen: true,
                body, author, id
            }
        case 'CLOSE_COMMENT_DIALOG':
        case 'CREATE_COMMENT':
        case 'EDIT_COMMENT':
            return {
                ...state,
                isOpen: false,
                isEdit: false,
                id: undefined,
                body: undefined,
                author: undefined
            }
        case 'HANDLE_COMMENT_DIALOG_CHANGE':
            return {
                ...state,
                [action.source]: action.value
            }
        default:
            return state;
    }
}
