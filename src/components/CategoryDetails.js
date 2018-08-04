import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPostsByCategory,openPostDialog } from '../actions'
import CategoryCard from './CategoryCard'
import PostCard from './PostCard'
import PostDialog from './PostDialog'         
import DialogEntryBtn from './DialogEntryBtn'               

class CategoryDetails extends Component{
    componentDidMount(){
        console.log(this.props.match.params.category)
        this.props.fetchPostsByCategory(this.props.match.params.category)
    }

    render(){
        const {classes,posts,openPostDialog} = this.props
        return(
            <div>
                <CategoryCard category={this.props.match.params.category}
                                classes={classes} />

                {posts.posts?posts.posts.map((i,index)=>{
                    return(<PostCard key={index} post={i}/>)
                }):null}       
                  <DialogEntryBtn 
                  openCommentDialog={null} 
                  openPostDialog={openPostDialog}/>

                <PostDialog/>
                </div>
        )
    }
}
function mapStateToProps(state){

    return{
        posts: state.posts
    }
}
function mapDispatchToProps(dispatch){
    return{
        fetchPostsByCategory:(id) => dispatch(fetchPostsByCategory(id)),
        openPostDialog:() => dispatch(openPostDialog())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(CategoryDetails)