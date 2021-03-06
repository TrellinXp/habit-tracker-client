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
        axios.get(process.env.REACT_APP_API_URL+`/habits/${params.habitsId}`, { withCredentials: true })
            .then(responseFromApi => {
                const theHabit = responseFromApi.data;
                this.setState(theHabit);
            })

            .catch((err) => {
                console.log(err)
            })
    }

    //DELETE
    deleteHabit = () => {
        const { params } = this.props.match;
        axios.delete(process.env.REACT_APP_API_URL+`/habits/${params.habitsId}`, { withCredentials: true })
            .then(() => {
                this.props.history.push('/calendar');
            })
            .catch((err) => {
                console.log(err)
            })
    }

    getDateString = () => {
        return new Date(this.state.date).toLocaleDateString("en-US");
    }

    isGoodHabit() {
        return this.state.goodHabit
        ? "Good Habit"
        : "Bad Habit"
    }

    render() {
       
        return (
            <div className="habit-details">
                <h1 className="page-headline">Habit Details</h1>
                <div className="details-attributes">
                <h2 className="habit-title">Title: {this.state.title}</h2>
                <p>Description: {this.state.description}</p>
                <p>Amount: {this.state.amount}</p>
                <p>Unit: {this.state.unit}</p>
                <p>{this.isGoodHabit()}</p>
                <p>Date: {this.getDateString()}</p>
                </div>
                <div className="habit-actions"> 
                <Link className="habit-action" to={`/habits/edit/${this.state.habitsId}`}> Edit habit</Link>
                <button className="habit-action delete-button" onClick={this.deleteHabit}>Delete habit</button> 
                <Link className="habit-action" to={'/calendar'}>Back to Calendar</Link>
                </div>
            </div>
        )
    }
}







export default HabitDetails