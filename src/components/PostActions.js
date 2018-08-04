import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    deleteExistingPost,
    handlePostDialogChange,
    createNewPost,
    editExistingPost,
    upVotePost,
    downVotePost,
    fetchPosts,
    openPostDialog,
    openEditPostDialog
} from '../actions';


class PostActions extends Component{
  
 render(){    
  const { id,title,category,
          openEditPostDialog,deleteExistingPost,
          downVotePost,upVotePost ,selectedPost} = this.props
 return(                  
      <div>
         <Button onClick={() => openEditPostDialog(selectedPost)}>Edit</Button>
         <Button onClick={() => deleteExistingPost(id)}> Delete </Button>
         <Button onClick={() => downVotePost(id)}> Vote Down </Button>
         <Button onClick={() => upVotePost(id)}> Vote Down </Button>
         <Button> <Link to={`/${category}/${id}`}> Open Post Details</Link></Button>
      </div>
   )
 }
}

function mapStateToProps (posts){
    return{
          posts: posts.posts
    }
}

function mapDispatchToProps (dispatch) {
  return{
          deleteExistingPost:(id) => dispatch(deleteExistingPost(id)),
          upVotePost:(id) => dispatch(upVotePost(id)),
          downVotePost:(id) => dispatch(downVotePost(id)),
          openPostDialog:() => dispatch(openPostDialog()),
          openEditPostDialog:() => dispatch(openEditPostDialog())
   }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostActions);
