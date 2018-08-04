import {
    LOAD_POSTS,
    EDIT_POST,
    CREATE_POST,
    DELETE_POST,
    UP_VOTE_POST,
    DOWN_VOTE_POST,
    UP_VOTE_COMMENT,
    DOWN_VOTE_COMMENT,
    LOAD_CATEGORIES,
    SELECT_CATEGORY,
    CREATE_COMMENT,
    DELETE_COMMENT,
    EDIT_COMMENT,
    SORT_POSTS_BY_UP_VOTES,
    SORT_POSTS_BY_DOWN_VOTES,
    SORT_POSTS_BY_TIME,
    FETCH_COMMENTS_SUCCESS,
    SELECT_POST,
    OPEN_POST_DIALOG,
    CLOSE_POST_DIALOG,
    HANDLE_POST_DIALOG_CHANGE,
    OPEN_EDIT_POST_DIALOG,
    OPEN_COMMENT_DIALOG,
    CLOSE_COMMENT_DIALOG,
    HANDLE_COMMENT_DIALOG_CHANGE,
    OPEN_EDIT_COMMENT_DIALOG
 } from '../actions';


/**
 * CATEGORIES
 */
export function categories (state = [], action) {
    switch (action.type) {
        case LOAD_CATEGORIES:
              return action.categories
        default:
            return state;
    }
}

const initialCategoriesState = {
    currentCategory: null,
    categories: []
}

/**
 * COMMENTS
 */

export function comments(state = {}, action) {
    switch (action.type) {
        case 'FETCH_COMMENTS_SUCCESS':
            return {
                ...state, 
                comments:action.payload
              }                           
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
    }
}


 export  function posts (state = initialPostsState, action){
    switch(action.type) {
        case LOAD_POSTS:
        const { posts } = action;
        return {
            sortBy: SORT_BY_UP,
            posts: sortPostsBy(posts, SORT_BY_UP)
        };
        case SELECT_POST:
        return {
            ...state,
            selectedPost: action.post
        }
      case SELECT_CATEGORY:
        return {
                sortBy: SORT_BY_UP,
                posts: sortPostsBy(action.posts, SORT_BY_UP)
            };
  
      case CREATE_POST:
          return {
              ...state,
              sortBy: SORT_BY_LATEST,
              posts: sortPostsBy(state.posts.concat(action.newPost),SORT_BY_LATEST)
          };
      case EDIT_POST:
          return {
              ...state,
              sortBy: SORT_BY_LATEST,
              posts: sortPostsBy(
                  state.posts
                      .filter(post => post.id !== action.post.id)
                      .concat(action.post),
                  SORT_BY_LATEST)
          };
      case DELETE_POST:
          return {
              ...state,
              posts: state.posts.filter(post => post.id !== action.id)
          }
          case UP_VOTE_POST:
          case DOWN_VOTE_POST:
              return {
                  ...state,
                  posts: sortPostsBy(
                      state.posts
                          .filter(post => post.id !== action.post.id)
                          .concat(action.post),
                      state.sortBy)
              }
      case SORT_POSTS_BY_UP_VOTES:
          return {
              sortBy: SORT_BY_UP,
              posts: sortPostsBy(state.posts, SORT_BY_UP)
          };
          case OPEN_POST_DIALOG:
          return {
              ...state,
              openPostDialog: true
          }
      case CLOSE_POST_DIALOG:
          return {
              ...state,
              isEdit: false,
              openPostDialog: false,
              title: undefined,
              body: undefined,
              owner: undefined,
              category: undefined
          }
      case HANDLE_POST_DIALOG_CHANGE:
          return {
              ...state,
              [action.source]: action.value
          }
      case OPEN_EDIT_POST_DIALOG:
          const {title, body, author, category, id} = action.post;
          return {
              ...state,
              edition: true,
              openPostDialog: true,
              title,
              body,
              owner: author,
              category,
              id
          }
      case SORT_POSTS_BY_DOWN_VOTES:
          return {
              sortBy: SORT_BY_DOWN,
              posts: sortPostsBy(state.posts, SORT_BY_DOWN)
          };
      case SORT_POSTS_BY_TIME:
          return {
           sortBy: SORT_BY_LATEST,
           posts: sortPostsBy(state.posts, SORT_BY_LATEST)
       };       
       default:
          return state;
    }
  }

  const sortPostsBy = (posts, option) => {
    switch (option) {
        case SORT_BY_UP:
            return [...posts].sort((a, b) => {
                return b.voteScore - a.voteScore;
            });
        case SORT_BY_DOWN:
            return [...posts].sort((a, b) => {
                return a.voteScore - b.voteScore;
            });
        case SORT_BY_LATEST:
            return [...posts].sort((a, b) => {
                return b.timestamp - a.timestamp;
            });
        default:
            return posts;
    }
}

const SORT_BY_UP = 'upVotes';
const SORT_BY_DOWN = 'downVotes';
const SORT_BY_LATEST = 'latest';
  
const initialPostsState = {
    sortBy: SORT_BY_LATEST,
    posts: [],
    openPostDialog:false
}


