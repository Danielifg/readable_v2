import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Link } from 'react-router-dom';


const CategoryCard = ({ category , classes}) => {
    const capitalizeFirst = (String) =>{
        return String.charAt(0).toUpperCase()+String.slice(1);
    } 
return(
    <div style={{width:100,margin:'center',
                 flexDirection:'row',felx:1,
                 flexWrap:'wrap'}}>
    <Link to={`/`}>             
        <Card style={{padding:10}} className={classes.card}>
            <CardContent>                              
                <h1>{capitalizeFirst(category)}</h1>
            </CardContent>
        </Card>
     </Link><br/>
    </div>
    )
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

export default withStyles(styles)(CategoryCard)