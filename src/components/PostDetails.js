import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PostCard from './PostCard'
import DialogEntryBtn from './DialogEntryBtn'
import CommentDialog from './CommentDialog'

import {
  fetchCommentsByPostId,
  fetchPostDetails,
  editExistingComment,
  upVoteComment, downVoteComment,
  deleteExistingComment,
  openCommentDialog,
  openEditCommentDialog
} from '../actions'




class PostDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openDialog: false,
      edition: false
    }
  }
  componentDidMount() {
    const { category, id } = this.props.match.params
    this.props.fetchPostDetails(id, category)
    this.props.fetchCommentsByPostId(id)
 
  }

  _openDialog = () => {
    this.setState({ openDialog: true })
  }
  _closeDialog = () => {
    this.setState({ openDialog: false })

  }

  render() {

    const { classes, post, 
            comments, openCommentDialog,
            openEditCommentDialog } = this.props;
    const { id } = this.props.match.params

    if (post) {
      return (
        <div style={{ padding: 15 }}>
          <PostCard post={post} classes={classes} params={id}/>
          
          <br />

        {comments ? comments.map(comment => {                   
            return (
             <div>
                <Card className={classes.card}>
                      <CardContent>
                        <Typography className={classes.title} color="textSecondary">

                          <h1 style={{ float: 'right' }}>{comment.voteScore}</h1>
                        </Typography>
                        <Typography variant="headline" component="h5">
                          {comment.body}
                        </Typography>
                      </CardContent>
                    <CardActions>
                        <Button onClick={() => openEditCommentDialog(comment)}>Edit</Button>
                        <Button onClick={() => this.props.deleteExistingComment(comment.id,comment.parentId)}> Delete </Button>
                        <Button onClick={() => this.props.downVoteComment(comment.id)}> Vote Down </Button>
                        <Button onClick={() => this.props.upVoteComment(comment.id)}> Vote Up </Button>
                     </CardActions>
                    </Card> 
                    <br />
              </div> )
          }) : null}
             <DialogEntryBtn 
                  openCommentDialog={openCommentDialog} 
                  openPostDialog={null}/>
            <CommentDialog/>
        </div>)
    }
    return <div>loading...</div>
  }
}

function mapStateToProps(state,{match:{ params:{id}}}) {
  // let {id} = state.posts.selectedPost
  return {
    post:     state.posts.selectedPost,
    comments: state.comments[id]
  }
}
function mapDispatchToProps(dispatch) {
  return {
    fetchPostDetails:      (category, id) => dispatch(fetchPostDetails(category, id)),
    fetchCommentsByPostId: (id)           => dispatch(fetchCommentsByPostId(id)),
    editExistingComment:   (id, body)     => dispatch(editExistingComment(id, body)),
    deleteExistingComment: (id, postId)   => dispatch(deleteExistingComment(id, postId)),
    downVoteComment:       (id)           => dispatch(downVoteComment(id)),
    upVoteComment:         (id)           => dispatch(upVoteComment(id)),
    openEditCommentDialog: (comment)      => dispatch(openEditCommentDialog(comment)),
    openCommentDialog:     ()             => dispatch(openCommentDialog())
  }
}
const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};


export default compose(withStyles(styles),
 connect(mapStateToProps, mapDispatchToProps))(PostDetails);
