import React from 'react';
// import logo from '../assets/images/logo.svg';
import './App.css';
import Container from './Container';

class App extends React.Component {
  state = {
      data: null
    };
  
    componentDidMount() {
        // Call our fetch function below once the component mounts
      this.callBackendAPI()
        .then(res => this.setState({ data: res.message }))
        .catch(err => console.log(err));
    }
      // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
    callBackendAPI = async () => {
      const response = await fetch('/welcome');
      const body = await response.json();
  
      if (response.status !== 200) {
        throw Error(body.message) 
      }
      return body;
    };
  
    render() {
      return (
        <div className="App">
          <Container />
          {/* // Render the newly fetched data inside of this.state.data  */}
          {/* <p className="App-intro">{this.state.data}</p> */}
        </div>
      );
    }
  }

export default App;
