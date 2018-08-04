import {
    getCommentsByPostId,
    createComment,
    editComment,
    deleteComment,
    voteComment,
    getAllCategories,
    getPostsByCategory,
    deletePost,
    getAllPosts,
    editPost,
    getPost,
    votePost,
    createPost    
  } from '../api/index'

/**
* CATEGORIES
*/
const LOAD_CATEGORIES = 'LOAD_CATEGORIES';
const fetchCategories = () => dispatch =>(
    getAllCategories()
        .then(categories => dispatch({
         type: LOAD_CATEGORIES,
         categories:categories
    }))
);
/**
 * POSTS
 */
 const LOAD_POSTS = 'LOAD_POSTS';
 const SELECT_CATEGORY = 'SELECT_CATEGORY';
 const DELETE_POST ='DELETE_POST';
 const CREATE_POST ='CREATE_POST';
 const EDIT_POST ='EDIT_POST';
 const SORT_POSTS_BY_UP_VOTES='SORT_POSTS_BY_UP_VOTES';
 const SORT_POSTS_BY_DOWN_VOTES = 'SORT_POSTS_BY_DOWN_VOTES';
 const SORT_POSTS_BY_TIME = 'SORT_POSTS_BY_TIME';
 const SELECT_POST = 'SELECT_POST';
 const OPEN_POST_DIALOG = 'OPEN_POST_DIALOG';
 const CLOSE_POST_DIALOG = 'CLOSE_POST_DIALOG';
 const HANDLE_POST_DIALOG_CHANGE = 'HANDLE_POST_DIALOG_CHANGE';
 const OPEN_EDIT_POST_DIALOG = 'OPEN_EDIT_POST_DIALOG';

 const UP_VOTE_POST = 'UP_VOTE_POST';
 const DOWN_VOTE_POST = 'DOWN_VOTE_POST';


const openPostDialog = () => ({
    type: OPEN_POST_DIALOG
});

const closePostDialog = () => ({
    type: CLOSE_POST_DIALOG
});

const handlePostDialogChange = ({source, value}) => ({
    type: HANDLE_POST_DIALOG_CHANGE,
    source,
    value
});

const openEditPostDialog = (post) => ({
    
    type: OPEN_EDIT_POST_DIALOG,
    post
});

const fetchPosts = () => dispatch => (
    getAllPosts()
        .then(posts => dispatch({            
            type: LOAD_POSTS,
            posts        
        }),      
    )
)

 const fetchPostsByCategory = (category) => dispatch => (
    getPostsByCategory(category)
        .then(posts => dispatch({
            type: SELECT_CATEGORY,
            category,
            posts
        }))
);

 const deleteExistingPost = ( id ) => dispatch => {
  deletePost(id)
  .then(()=> dispatch({
    type:DELETE_POST,
    id
  }))
}

//************ CREATE ********************** */

 const createNewPost = (post) => dispatch => (
    createPost(post)
        .then(newPost => dispatch({
            type: CREATE_POST,
            newPost
        }))
);

const createNewComment = (comment) => dispatch => (
    createComment(comment)
        .then(newComment => dispatch({
            type: CREATE_COMMENT,
            comment: newComment
        }))
);
//********************************** */

 const editExistingPost = ({id, title, body}) => dispatch => (
    editPost({id, title, body})
        .then(post => dispatch({
            type: EDIT_POST,
            post
        }))
);

const fetchPostDetails = (postId, category) => dispatch => (
    getPost(postId)
        .then(post => dispatch({
            type: SELECT_POST,
            post,
            category        
        }))
);

 const sortPostByUpVotes = () => ({
    type: SORT_POSTS_BY_UP_VOTES
});

 const sortPostByDownVotes = () => ({
  type: SORT_POSTS_BY_DOWN_VOTES
});
 const sortPostsByTime = () => ({
    type: SORT_POSTS_BY_TIME
});

/**
 * COMMENTS
 */

 const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';
 const CREATE_COMMENT = 'CREATE_COMMENT';
 const DELETE_COMMENT ='DELETE_COMMENT';
 const EDIT_COMMENT = 'EDIT_COMMENT';
 const OPEN_COMMENT_DIALOG = 'OPEN_COMMENT_DIALOG';
 const CLOSE_COMMENT_DIALOG = 'CLOSE_COMMENT_DIALOG';
 const HANDLE_COMMENT_DIALOG_CHANGE = 'HANDLE_COMMENT_DIALOG_CHANGE';
 const OPEN_EDIT_COMMENT_DIALOG = 'OPEN_EDIT_COMMENT_DIALOG';
 const UP_VOTE_COMMENT = 'UP_VOTE_COMMENT';
 const DOWN_VOTE_COMMENT = 'DOWN_VOTE_COMMENT';

const fetchCommentsByPostId = (id) => dispatch => (
    getCommentsByPostId(id)
         .then((comments) => dispatch({
            type:FETCH_COMMENTS_SUCCESS,
            id,
            comments
        }))
   );

const openCommentDialog = () => ({
    type: OPEN_COMMENT_DIALOG
});

const closeCommentDialog = () => ({
    type: CLOSE_COMMENT_DIALOG
});

const handleCommentDialogChange = ({source, value}) => ({
    type: HANDLE_COMMENT_DIALOG_CHANGE,
    source,
    value
})

const openEditCommentDialog = (comment) => ({
    type: OPEN_EDIT_COMMENT_DIALOG,
    comment
})

const deleteExistingComment = (id, postId) => dispatch => (
       deleteComment(id)
           .then(() => dispatch({
               type: DELETE_COMMENT,
               id,
               postId
           }))
   );
const editExistingComment = (id, body) => dispatch => (
       editComment(id, body)
           .then(comment => dispatch({
               type: EDIT_COMMENT,
               comment
           }))
   );
   
 const upVoteComment = (id) => dispatch => (
    voteComment(id, "upVote")
        .then(comment => dispatch({
            type: UP_VOTE_COMMENT,
            comment
        }))
);

const downVoteComment = (id) => dispatch => (
    voteComment(id, "downVote")
        .then(comment => dispatch({
            type: DOWN_VOTE_COMMENT,
            comment
        }))
);
const upVotePost = (id) => dispatch => (
    votePost(id, "upVote")
        .then(post => dispatch({
            type: UP_VOTE_POST,
            post
        }))
);
 const downVotePost = (id) => dispatch => (
    votePost(id, "downVote")
        .then(post => dispatch({
            type: DOWN_VOTE_POST,
            post
        }))
);

export {
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
    fetchPostDetails,
    fetchCategories,
    fetchPosts,
    fetchPostsByCategory,
    fetchCommentsByPostId,
    createNewComment,
    editExistingComment,
    deleteExistingComment,
    editExistingPost,
    createNewPost,
    deleteExistingPost,
    sortPostByUpVotes,
    sortPostByDownVotes,
    sortPostsByTime,
    upVotePost,
    downVotePost,
    upVoteComment,
    downVoteComment,
    OPEN_POST_DIALOG,
    CLOSE_POST_DIALOG,
    HANDLE_POST_DIALOG_CHANGE,
    OPEN_EDIT_POST_DIALOG,
    OPEN_COMMENT_DIALOG,
    CLOSE_COMMENT_DIALOG,
    HANDLE_COMMENT_DIALOG_CHANGE,
    OPEN_EDIT_COMMENT_DIALOG,
    openPostDialog,
    closePostDialog,
    handlePostDialogChange,
    openEditPostDialog,
    openCommentDialog,
    closeCommentDialog,
    handleCommentDialogChange,
    openEditCommentDialog
  }
  