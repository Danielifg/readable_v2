import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {
  fetchCommentsByPostId,
  fetchPostDetails,
  createNewComment,
  editExistingComment,
  upVoteComment, downVoteComment,
  deleteExistingComment,
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
  componentWillUpdate(nextProps) {
      const { category, id } = this.props.match.params
    if (nextProps.comments[id] != this.props.comments.comments) {
      return true;
    }
  }
  _openDialog = () => {
    this.setState({ openDialog: true })
  }
  _closeDialog = () => {
    this.setState({ openDialog: false })

  }


  CommentCard = ({ classes, comment ,votes}) => {
    const { id, parentId, timestamp, voteScore, author, body } = comment
    
    return (
      <div>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary">
           
              <h1 style={{ float: 'right' }}>{voteScore}</h1>
            </Typography>
            <Typography variant="headline" component="h5">
              {body}
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={() => this._openDialog()}>Edit</Button>
            <Button onClick={() => this.props.deleteExistingComment(id, parentId)}> Delete </Button>
            <Button onClick={() => this.props.downVoteComment(id)}> Vote Down </Button>
            <Button onClick={() => this.props.upVoteComment(id)}> Vote Up </Button>
            {/* <Button> <Link to={`/${i.category}/${i.id}`}> Open Post Details</Link></Button> */}
          </CardActions>
        </Card>
        <br />
      </div>
    )
  }

  render() {

    const { classes, post, comments } = this.props;
    const { category, id } = this.props.match.params

    if (post) {
      return (
        <div style={{ margin: 'auto', width: 800, padding: 15 }}>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary">
                <h1> {post.title} </h1>
                <Button style={{ float: 'right' }} onClick={() => this._openDialog()}> Add Post</Button>
              </Typography>
            </CardContent>
          </Card>
          <br />
       

        {comments.comments ? comments.comments.map(i => {                   
            return (
              <this.CommentCard key={i.id}  votes={'votes'} comment={i} classes={classes} />
            )
          }) : null}


        </div>)
    }
    return <div>loading...</div>
  }
}

function mapStateToProps(state) {
  
  return {
    post:     state.posts.selectedPost,
    comments: state.comments
  }
}
function mapDispatchToProps(dispatch) {
  return {
    fetchPostDetails:      (category, id) => dispatch(fetchPostDetails(category, id)),
    fetchCommentsByPostId: (id)           => dispatch(fetchCommentsByPostId(id)),
    createNewComment:      (comment)      => dispatch(createNewComment(comment)),
    editExistingComment:   (id, body)     => dispatch(editExistingComment(id, body)),
    deleteExistingComment: (id, postId)   => dispatch(deleteExistingComment(id, postId)),
    downVoteComment:       (id)           => dispatch(downVoteComment(id)),
    upVoteComment:         (id)           => dispatch(upVoteComment(id))
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
