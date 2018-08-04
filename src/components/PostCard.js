    import { withStyles } from '@material-ui/core/styles';
    import React, { Component } from 'react';
    import { compose } from 'recompose'
    import Card from '@material-ui/core/Card';
    import CardActions from '@material-ui/core/CardActions';
    import CardContent from '@material-ui/core/CardContent';
    import Button from '@material-ui/core/Button';
    import Typography from '@material-ui/core/Typography';
    import TimeAgo from 'time-ago';
    import PostActions from './PostActions'

const PostCard = ({  post , classes }) => {

       const timeAgo = TimeAgo();
       const capitalizeFirst = (String) =>{
        return String.charAt(0).toUpperCase()+String.slice(1);
    } 

    return(
    <div>
        <Card style={{padding:10}} className={classes.card}>
        <CardContent>
        <h4 style={{float:'right'}}>
          votes: {post.voteScore}{' '}
          comments: {post.commentCount}
        </h4>
              <h1>
                  {post.category?capitalizeFirst(post.category):"No Category..."} 
              </h1>
        <h2>
            {post.title}
        </h2>
    
        <Typography className={classes.title} color="textSecondary">
                      {`${post.author} posted ${timeAgo.ago(post.timestamp)}`}
         </Typography>
        </CardContent>
       
        <CardActions>
                   <PostActions selectedPost={post} id={post.id} title={post.title} 
                                category={post.category}/> 
        </CardActions>
    </Card><br/>
    
    </div>)

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

    export default withStyles(styles)(PostCard)
   
   
