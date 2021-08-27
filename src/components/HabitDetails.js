import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class HabitDetails extends Component {
    state = {}

    componentDidMount() {
        this.getSingleHabit();
    }

    //GET SPECIFIC 
    getSingleHabit = () => {
        const { params } = this.props.match;// to make a query to an specific point using react
        this.setState({habitsId: params.habitsId});
        axios.get(`http://localhost:5000/api/habits/${params.habitsId}`, { withCredentials: true })
            .then(responseFromApi => {
                const theHabit = responseFromApi.data;
                console.log('date:', theHabit.date);
                this.setState(theHabit);
            })

            .catch((err) => {
                console.log(err)
            })
    }

    //DELETE
    deleteHabit = () => {
        const { params } = this.props.match;
        axios.delete(`http://localhost:5000/api/habits/${params.habitsId}`, { withCredentials: true })
            .then(() => {
                this.props.history.push('/habits');
            })
            .catch((err) => {
                console.log(err)
            })
    }

    getDateString = () => {
        return new Date(this.state.date).toLocaleDateString("en-US");
    }

    render() {
       
        return (
            <div>
                <h1>Habit Details</h1>
                <h3>Title: {this.state.title}</h3>
                <p>Description: {this.state.description}</p>
                <p>Amount: {this.state.amount}</p>
                <p>Unit: {this.state.unit}</p>
                <p>Good Habit: {this.state.goodHabit}</p>
                <p>Date: {this.getDateString()}</p>
    
                {/* passing the info of the last state of the form before is updated */}
                <Link to={`/habits/edit/${this.state.habitsId}`}> Edit habit</Link>

                <p><button onClick={this.deleteHabit}>Delete habit</button>  </p>
                
                {/* delete button included in the details form, method for it up as well */}

                <Link to={'/habits'}>Back to habits List</Link>
            </div>
        )
    }
}







export default HabitDetails