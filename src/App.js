import { Component } from 'react'
import './App.css';
import "./material-kit.css?v=2.0.7";
import Navbar from './components/navbar/Navbar'
import CreateHabit from './components/CreateHabit';
import HabitList from './components/HabitList'
import { Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import HabitDetails from './components/HabitDetails';
import EditHabit from './components/EditHabit';

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
          <Route exact path="/habits" render={() => {
            return(
              <>
              <HabitList userIsLoggedIn={this.state.isLoggedIn} />
              {this.state.isLoggedIn
                        ? <CreateHabit user={this.state.user} getData={() => this.getAllHabits()} />
                        : <p>Please Login to create a new habit</p>}
            </>
            )
          }
          }/>
          <Route
            exact
            path="/signup"
            render={(props) => <Login {...props} getUser={this.getTheUser} isSignup={true} />}
          />
          <Route
            exact
            path="/"
            render={(props) => <Login {...props} getUser={this.getTheUser} isSignup={false} />}
          />
          <Route
            exact
            path="/habits/:habitsId"
            render={(props) => <HabitDetails {...props} />}
          />

         <Route
            exact
            path="/habits/edit/:habitsId"
            render={(props) => <EditHabit {...props} />}
          /> 

        </Switch>
      </div>
    );
  }
}

export default App;
