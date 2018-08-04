import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPostsByCategory } from '../actions'
import CategoryCard from './CategoryCard'
import PostCard from './PostCard'

class CategoryDetails extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        console.log(this.props.match.params.category)
        this.props.fetchPostsByCategory(this.props.match.params.category)
    }

    render(){
        const {classes,posts} = this.props
        return(
            <div>
                <CategoryCard category={this.props.match.params.category}
                                classes={classes} />

                {posts.posts?posts.posts.map((i,index)=>{
                    return(<PostCard key={index} post={i}/>)
                }):null}                               
                </div>
        )
        const { category } = this.props.match.params
    }
}
function mapStateToProps(state){

    return{
        posts: state.posts
    }
}
function mapDispatchToProps(dispatch){
    return{
        fetchPostsByCategory:(id) => dispatch(fetchPostsByCategory(id))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(CategoryDetails)