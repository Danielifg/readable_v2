import React, { Component } from 'react';
import { Route, withRouter } from "react-router-dom";
import CategorySection from  './components/CategorySection'
import PostSection from  './components/PostSection'
import PostDetails from './components/PostDetails'
import CategoryDetails from './components/CategoryDetails'
import PostDialog from './components/PostDialog'



class App extends Component {
  render() {
    return (
      <div style={{padding:20, backgroundColor:'#f6f3f3'}}>
      <Route exact path="/" render={() => (
          <div>         
              <CategorySection/>         
             <br/>
               <PostSection/>

               <PostDialog/>
           </div>
        )}/>
         
         <Route exact path="/:category" component={CategoryDetails}/> 
         <Route exact path="/:category/:id" component={PostDetails}/> 
      
          </div>
      );
  }
}

export default withRouter(App);
