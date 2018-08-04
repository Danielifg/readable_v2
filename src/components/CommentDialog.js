import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {createNewComment,
       editExistingComment,
        closeCommentDialog,
        handleCommentDialogChange} from '../actions'

class CommentDialog extends Component{
    render(){
        
        const { comments:{id, body, author,  edition, openCommentDialog},category,parentId } = this.props
        

        return(
            <Dialog
            open={openCommentDialog}
            onClose={this.props.closeCommentDialog}
            aria-labelledby="form-dialog-title">
            <DialogTitle>{edition?category:'New Comment'}</DialogTitle>
            <DialogContent>
                <TextField
                    tid='Body'
                    required multiline fullWidth                        
                    onChange={(event) => this.props.handleCommentDialogChange("body", event.target.value)}                    
                    label="body"
                    defaultValue={body}
                    margin="normal"/>
                    
                <Grid container>
                    <Grid item>
                        <TextField
                            id = 'author'
                            required = {true}                                
                            onChange = {(event) => this.props.handleCommentDialogChange("author", event.target.value)}
                            label = "author"
                            defaultValue = {author}
                            margin = "normal"/>
                    </Grid>
                    <Grid item>
                        <TextField
                             id='category'                                                             
                             onChange={(event) => this.props.handleCommentDialogChange("category", event.target.value)}
                            label="Category"                                
                            helperText="react, redux or udacity"
                            defaultValue = {category}
                            disabled={true}
                            margin="normal"/>
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions>
                <Button onClick={() => this.props.closeCommentDialog()}
                    color="default">
                     CLOSE
                </Button>
                <Button onClick={() => edition?this.props.editExistingComment(id, body):
                            this.props.createNewComment({body, author, parentId})}>
                        SAVE
                </Button>
                   
            </DialogActions>

        </Dialog>
        )

    }
}

function mapStateToProps(state){
    return{
        openCommentDialog: state.comments.openCommentDialog,
        comments:state.comments,
        category:state.posts.selectedPost.category,
        parentId:state.posts.selectedPost.id
          
    }
}

function mapDispatchToProps(dispatch){
    return{
        createNewComment:(comment) => dispatch(createNewComment(comment)),
        editExistingComment:(id,title,body) => dispatch(editExistingComment(id,title,body)),
        closeCommentDialog:() => dispatch(closeCommentDialog()),
        handleCommentDialogChange: (source, value) => dispatch(handleCommentDialogChange({source, value}))
        
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CommentDialog)