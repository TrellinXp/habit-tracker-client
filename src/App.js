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

class App extends Component {

  state = {
    isLoggedIn: false,
    user: null,
    dates: []
  }

  getTheUser = (userObj, loggedIn) => {
    this.setState({
      user: userObj,
      isLoggedIn: loggedIn
    });
  };

  setDates(datesObj) {
    this.setState({
      dates: datesObj
    });
  }

  getDatesToDisplay = (startDate) => {
    let datesObj = [];
    let nextDate = startDate;
    let dateArr = nextDate.toISOString().split('T');

    datesObj.push(dateArr[0]);
    for(let count = 0; count <= 5; count++) {
        let nextDate = startDate;
        nextDate.setDate(nextDate.getDate() + 1);
        let dateArr = nextDate.toISOString().split('T');
        datesObj.push(dateArr[0]);
    }

    this.setDates(datesObj);
  }

  getMonday(date) {
    let d = new Date(date);
    var day = d.getDay(),
        diff = d.getDate() - day + (day === 0 ? -6:1); // adjust when day is sunday
    return new Date(d.setDate(diff));
  }

  componentDidMount() {
    this.getDatesToDisplay(this.getMonday(new Date(Date.now())));    
  } 

  render() {
    return (
      <div className="App">
        <div className="title-container">
        <img src="diary.png" className="title-icon" alt="diary-icon"/>  <div className="page-title"><h1>Welcome to Habit Tracker</h1></div> <img src="diary.png" className="title-icon" alt="diary-icon"/>
        </div>
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
            path="/createHabit"
            render={(props) => <CreateHabit user={this.state.user} {...props} />}
          />

          <Route
            exact
            path="/signup"
            render={(props) => <Login {...props} getUser={this.getTheUser} isSignup={true} />}
          />

          <Route 
            exact
            path="/calendar"
            render={(props) => <Calendar {...props} user={this.state.user} dates={this.state.dates} getDatesToDisplay={this.getDatesToDisplay} getMonday={this.getMonday}  />}
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

        <Route
            exact
            path="/habitTile"
            render={(props) => <HabitTile {...props} />}
          /> 

        </Switch>
        <div className="footer-container">
        <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        </div>
      </div>
    );
  }
}

export default App;
