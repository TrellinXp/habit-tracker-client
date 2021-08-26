import {Component} from 'react'
import './App.css';
import CreateHabit from './components/CreateHabit';
import HabitList from './components/HabitList'
import { Switch, Route } from 'react-router-dom'

class App extends Component {

  state = {
    isLoggedIn: false,
    user: {_id: '6127625a931894278bd10db8'}
  }

  render() {
    return (
      <div className="App">
        <h1> Welcome to habit Tracker</h1>
        <Switch> 
        <Route exact path="/habits" render={() => <HabitList userIsLoggedIn={this.state.isLoggedIn} />} />
        <Route exact path="/habits" render={() => <CreateHabit user={this.state.user} />} />
        </Switch>
      </div>
    );
  }
}

export default App;
