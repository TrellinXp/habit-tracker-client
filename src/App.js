import { Component } from 'react';
import './App.css';
import CreateHabit from './components/CreateHabit';

class App extends Component {

  state = {
    isLoggedIn: false,
    user: {_id: '6127625a931894278bd10db8'}
  }

  render() {
    return (
      <div className="App">
        <CreateHabit user={this.state.user}></CreateHabit>
      </div>
    );
  }
}

export default App;
