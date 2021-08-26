import { Component } from 'react';
import './App.css';
import CreateHabit from './components/CreateHabit';
import { Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login';

class App extends Component {

  state = {
    isLoggedIn: false,
    user: null
  }

  getTheUser = (userObj, loggedIn) => {
    this.setState({
      user: userObj,
      isLoggedIn: loggedIn
    });
  };

  render() {
    return (
      <div className="App">
        <Switch>
           <Route
            exact
            path="/"
            render={(props) => <Login {...props} getUser={this.getTheUser} isSignup={false}/>}
            />
          <Route
            exact
            path="/signup"
            render={(props) => <Login {...props} getUser={this.getTheUser} isSignup={true} />}
            />
          <CreateHabit user={this.state.user}></CreateHabit>  
        </Switch>
      </div>
    );
  }
}

export default App;
