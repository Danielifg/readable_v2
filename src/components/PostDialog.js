import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {createNewPost,
        editExistingPost,
        closePostDialog,handlePostDialogChange} from '../actions'

class PostDialog extends Component{
    render(){
        const { handlePostDialogChange,openPostDialog } = this.props
        const { id, title, body, owner, category, edition } = this.props.post
     
        return(
            <Dialog
            open={openPostDialog}
            onClose={this.props.closePostDialog}
            aria-labelledby="form-dialog-title">
            <DialogTitle>{edition?category:'New Post'}</DialogTitle>
            <DialogContent>
                <TextField
                    id='Title'
                    required autoFocus fullWidth                       
                    onChange={(event) => handlePostDialogChange("title", event.target.value)}
                    label="Title"
                    defaultValue={title}
                    margin="normal"/>

                <TextField
                    tid='Body'
                    required multiline                         
                    onChange={(event) => handlePostDialogChange("body", event.target.value)}                    
                    label="body"
                    defaultValue={body}
                    margin="normal"
                    fullWidth />
                    
                <Grid container>
                    <Grid item>
                        <TextField
                            id = 'author'
                            required = {true}                                
                            onChange = {(event) => handlePostDialogChange("owner", event.target.value)}
                            label = {owner}
                            defaultValue = {owner}
                            margin = "normal"/>
                    </Grid>
                    <Grid item>
                        <TextField
                        
                        defaultValue={category}
                             id='category'                                                             
                             onChange={(event) => handlePostDialogChange("category", event.target.value)}
                            label="Category"                                
                            helperText="react, redux or udacity"
                            margin="normal"/>
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions>
                <Button onClick={() => this.props.closePostDialog()}
                    color="default">
                     CLOSE
                </Button>
                <Button                        
                    onClick={() => {
                         edition ? 
                         this.props.editExistingPost(id, title, body):  
                        this.props.createNewPost({title, body, category, author: owner})
                         }}>
                        SAVE
                </Button>
                   
            </DialogActions>

        </Dialog>
        )

    }
}

function mapStateToProps(state){
    return{
        openPostDialog: state.posts.openPostDialog,
        post:state.posts        
    }
}

function mapDispatchToProps(dispatch){
    return{
        createNewPost: (post) => dispatch(createNewPost(post)),
        editExistingPost:(id,title,body) => dispatch(editExistingPost({id,title,body})),
        closePostDialog:() => dispatch(closePostDialog()),
        handlePostDialogChange: (source, value) => dispatch(handlePostDialogChange({source, value}))
        
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PostDialog)