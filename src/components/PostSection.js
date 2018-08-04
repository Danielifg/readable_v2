import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TimeAgo from 'time-ago';
import PostCard from './PostCard'
import { fetchPosts,openPostDialog,sortPostsByTime,sortPostByDownVotes,sortPostByUpVotes } from '../actions';
import DialogEntryBtn from './DialogEntryBtn'


class PostSection extends Component{ 
  componentDidMount = () => {
     this.props.fetchPosts();
  }

    render(){
        const timeAgo = TimeAgo();
        const { classes, posts, sortPostByUpVotes,
                sortPostByDownVotes, sortPostsByTime,
                openPostDialog} = this.props;
        
         if(posts.posts){
             return(
                 <div style={{flexDirection:'row'}}>
                        <div style={{margin:'auto',width:350}}>
                          <Button onClick={() => sortPostByUpVotes()}>Up Votes</Button>
                          <Button onClick={() => sortPostByDownVotes()}> Down Votes </Button>
                          <Button onClick={() => sortPostsByTime()}> Time </Button>        
                         </div>
                     {posts.posts.map((i,index) => (                    
                            <PostCard key ={index} post={i} timeAgo={timeAgo} classes={classes}/>               
                    ))} 
                    <DialogEntryBtn 
                            openPostDialog={openPostDialog} 
                            openCommentDialog={null}/>
       </div>
             )      
         }
         return <div>loading...</div>               
    }
}



function mapStateToProps (posts){
    return{
          posts: posts.posts
    }
}

function mapDispatchToProps (dispatch) {
  return{
          fetchPosts: () => dispatch(fetchPosts()),
          openPostDialog:() => dispatch(openPostDialog()),
          sortPostByUpVotes:() => dispatch(sortPostByUpVotes()),
          sortPostByDownVotes:() => dispatch(sortPostByDownVotes()),
          sortPostsByTime:() => dispatch(sortPostsByTime())
   }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostSection);
