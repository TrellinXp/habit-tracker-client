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
import Calendar from './components/calendar/Calendar';
import HabitTile from './components/calendar/HabitTile';
import GuardedRoute from './components/GuardedRoute';

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

  isAuthenticated() {
    return this.state.isLoggedIn;
  }

  render() {
    return (
      <div className="App">
        <h1 className="page-title"> Welcome to Habit Tracker</h1>
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
          <GuardedRoute 
            exact
            path="/createHabit"
            render={(props) => <CreateHabit user={this.state.user} {...props} />}
            auth={this.isAuthenticated}
          />

          <Route
            exact
            path="/signup"
            render={(props) => <Login {...props} getUser={this.getTheUser} isSignup={true} />}
          />

          <GuardedRoute 
            exact
            path="/calendar"            
            render={(props) => <Calendar {...props} />}
            auth={this.isAuthenticated}
          />

          <Route
            exact
            path="/"
            render={(props) => <Login {...props} />}
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

        <Route
            exact
            path="/habitTile"
            render={(props) => <HabitTile {...props} />}
          /> 

        </Switch>
      </div>
    );
  }
}

export default App;
