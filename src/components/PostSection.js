import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TimeAgo from 'time-ago';
import PostCard from './PostCard'
import { fetchPosts,openPostDialog,sortPostsByTime,sortPostByDownVotes,sortPostByUpVotes } from '../actions';
import AddIcon from '@material-ui/icons/Add';


class PostSection extends Component{
  constructor(props){
      super(props)

  }
 
  componentDidMount = () => {
     this.props.fetchPosts();
  }

    render(){
        const timeAgo = TimeAgo();
        const { classes, posts, sortPostByUpVotes,sortPostByDownVotes, sortPostsByTime} = this.props;
        
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

          <Button
                fab
                style={fabStyle}
                color="primary"
                aria-label="add"
                onClick={this.props.openPostDialog}>
                <AddIcon style={{fontSize: 70, color:'white',
                                 backgroundColor:'#D3D3D3',
                                borderRadius:50}}/>
            </Button>
       </div>
             )      
         }
         return <div>loading...</div>               
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
