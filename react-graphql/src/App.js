import React, { Component } from 'react';
import './App.css';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Roll from 'react-reveal/Roll';
import Zoom from 'react-reveal/Zoom';
import Wobble from 'react-reveal/Wobble'; 
import Bounce from 'react-reveal/Bounce';
import Spin from 'react-reveal/Spin';
import Courses from './Courses';

const client = new ApolloClient({
    uri: "http://localhost:4000/graphql"
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      frontPage: true
    };
    // this.handlAdd =this.handlAdd.bind(this);
}
componentDidMount(){

  this.setState({
    frontPage: true,
  });
  setTimeout(() => {
    this.setState({frontPage: false});
  }, 4000)
}

  render() {
 
    return (
        <ApolloProvider client={client}>
        {this.state.frontPage ?
        <div className="bg">
       
     
       <Zoom bottom>
          <div className="welcome-div">
            <Roll left opposite>
                 <Spin>
                    <p className="title-text">Welcome to India Tourism.</p>
                 </Spin>
      
              </Roll>
              </div>
          </Zoom>
        
        </div> 
        :
         <div className="bg">
          <div className="container">
            <nav className="navbar navbar-dark bg-primary">
            <Wobble>
              <a className="navbar-brand headTitle" href="#">India Tourism </a>
              </Wobble>
            </nav>
            <div>
              
              <Courses />
            </div>
          </div>
          </div>}
        </ApolloProvider>
    );
  }
}

export default App;
