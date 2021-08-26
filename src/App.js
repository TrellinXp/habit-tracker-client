import { Component } from 'react';
import './App.css';
import CreateHabit from './components/CreateHabit';
import { Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';

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
            render={(props) => <Login {...props} getUser={this.getTheUser} hasUser={true}/>}
            />
          <Route
            exact
            path="/signup"
            render={(props) => <Signup {...props} getUser={this.getTheUser} hasUser={false} />}
            />
          <CreateHabit user={this.state.user}></CreateHabit>  
        </Switch>
      </div>
    );
  }
}

export default App;
