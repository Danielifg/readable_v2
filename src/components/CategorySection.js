import React, { Component } from 'react';
import { fetchCategories,
    openPostDialog,
    fetchPosts } from '../actions'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CategoryCard from './CategoryCard'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { compose } from 'recompose'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'

class CategorySection extends Component{
    constructor(props){
        super(props)
    }
   

  componentDidMount() {
     this.props.fetchCategories();
  }

    render(){
        const {categories, classes} = this.props;      
        const capitalizeFirst = (String) =>{
            return String.charAt(0).toUpperCase()+String.slice(1);
        } 
         if(categories){
             return(
                <div className={classes.root}>
                      <Grid container spacing={24}>
                          {categories.map((i, index)=>(   
                             <Grid key={index} item xs>
                            <Link to={`/${i.name}`}> 
                                <Paper className={classes.paper}>
                                     <h2>{capitalizeFirst(i.name)}</h2>
                                </Paper>
                              </Link>
                             </Grid>                                                      
                          ))}
                     </Grid>
                </div>      
             )      
         }
         return <div>loading...</div>               
    }
}


function mapStateToProps (categories){
    return{
          categories: categories.categories
    }
}

function mapDispatchToProps (dispatch) {
  return{
    fetchCategories: () => dispatch(fetchCategories())
  }
}

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  });




export default compose(withStyles(styles),
 connect(mapStateToProps, mapDispatchToProps))(CategorySection);
