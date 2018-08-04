import React, { Component } from 'react';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { openCommentDialog, openPostDialog } from '../actions'

class DialogEntryBtn extends Component{

render(){ 
  const {openPostDialog,
         openCommentDialog,
        _openPostDialog,
        _openCommentDialog} = this.props
  
 function  _openDialog() {
     if(openPostDialog){
         return _openPostDialog();
     }else if(openCommentDialog){
         return _openCommentDialog();
     }
  }
  
  return(
        <Button
        style={fabStyle}
        color="primary"
        aria-label="add"
        onClick={() => _openDialog()}>
        <AddIcon style={{fontSize: 70, color:'white',
                         backgroundColor:'#D3D3D3',
                        borderRadius:50}}/>
      </Button>
    )
 }
}

const fabStyle = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed'
};

function mapDispatchToProps (dispatch) {
    return{
            _openPostDialog:() => dispatch(openPostDialog()),
            _openCommentDialog:() => dispatch(openCommentDialog())
     }
  }
  
  export default connect(
      null,
      mapDispatchToProps
  )(DialogEntryBtn);
   