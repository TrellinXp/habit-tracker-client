import {Component} from 'react'
import './App.css';
import Navbar from './components/navbar/Navbar'
import CreateHabit from './components/CreateHabit';
import HabitList from './components/HabitList'
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
        <h1> Welcome to habit Tracker</h1>
        <Navbar userData={this.state.user} userIsLoggedIn={this.state.isLoggedIn} getUser={this.getTheUser} />
        <Switch> 
        <Route exact path="/habits" render={() => <HabitList userIsLoggedIn={this.state.isLoggedIn} />} />
        <Route exact path="/habits" render={() => <CreateHabit user={this.state.user} />} />
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
        </Switch>
      </div>
    );
  }
}

export default App;
