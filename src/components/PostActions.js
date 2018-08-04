import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    deleteExistingPost,
    upVotePost,
    downVotePost,
    openPostDialog,
    openEditPostDialog
} from '../actions';


class PostActions extends Component{
  
 render(){    
  const { id,category,
          openEditPostDialog,deleteExistingPost,
          downVotePost,upVotePost ,selectedPost, params} = this.props
 if(!params){
   return(                  
      <div>
         <Button onClick={() => openEditPostDialog(selectedPost)}>Edit</Button>
         <Button onClick={() => deleteExistingPost(id)}> Delete </Button>
         <Button onClick={() => downVotePost(id)}> Vote Down </Button>
         <Button onClick={() => upVotePost(id)}> Vote Up </Button>
         <Button> <Link to={`/${category}/${id}`}> Open Post Details</Link></Button>
      </div>
        )
    }
   return null;
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
          openEditPostDialog:(id) => dispatch(openEditPostDialog(id))
   }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostActions);
