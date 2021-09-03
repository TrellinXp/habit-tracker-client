import React, { Component } from 'react'
import './../calendar/Calendar.css';
import axios from 'axios';
import HabitTile from './HabitTile';
import { Link } from 'react-router-dom';

export default class Calendar extends Component {

    

    state = {
        listOfHabits: [],
        previousWeek: new Date()
    }

    constructor() {
        super();
        this.dateCounter = 1;
        this.weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        this.currentStartDate = new Date(Date.now());
    }

    getAllHabitsForUser = () => {
        const user = this.props.user._id; 
        axios.get(process.env.REACT_APP_API_URL+`/habitsForUser/${user}`, { withCredentials: true })
            .then(responseFromApi => {
                this.setState({
                    listOfHabits: responseFromApi.data
                })
            })
    }

    componentDidMount() {
        this.getAllHabitsForUser();        
    }
    
    getDateString(date) {
        let dateArr = date.toISOString().split('T');
        return dateArr[0];
    }

    clearCounter() {
        this.dateCounter = -1;
    }

    previousWeek = () => {
        //Get today's date using the JavaScript Date object.
        var ourDate = this.props.getMonday(this.currentStartDate);

        //Change it so that it is 7 days in the past.
        var pastDate = ourDate.getDate() - 7;
        ourDate.setDate(pastDate);

        //Log the date to our web console.
        console.log(ourDate);
        this.props.getDatesToDisplay(ourDate);
        this.currentStartDate = ourDate;
    }

    nextWeek = () => {
        //Get today's date using the JavaScript Date object.
        var ourDate = this.props.getMonday(this.currentStartDate);

        //Change it so that it is 7 days in the past.
        var pastDate = ourDate.getDate() + 7;
        ourDate.setDate(pastDate);

        //Log the date to our web console.
        console.log(ourDate);
        this.props.getDatesToDisplay(ourDate);
        this.currentStartDate = ourDate;
    }

    render() {
        this.clearCounter();
        return (
            <div className="calendar-container">
                <div className="changeWeeks"><div className="changeWeek"><button onClick={this.previousWeek}>Previous Week</button></div><h1 className="page-headline-calendar">Habits</h1><div className="changeWeek"><button onClick={this.nextWeek}>Next Week</button></div></div>
                <div className="goodHabits">
                    <div className="week">
                    {
                     this.weekdays.map(weekday => {
                    this.dateCounter++;
                    return (
                        <div key={weekday} className="week-day">
                            <div className="week-header"><div>{weekday}</div><div>{this.props.dates[this.dateCounter]}</div></div>
                            <Link className="create-btn" to="/createHabit">Create Habit</Link>
                            <HabitTile listOfHabitsObj={this.state.listOfHabits.filter(
                                    habit => this.getDateString(new Date(habit.date)) === this.props.dates[this.dateCounter]).sort((a, b) => (a.goodHabit > b.goodHabit) ? 1 : -1)}></HabitTile>                    
                        </div>
                    )})
                    } 
                    </div> 
                </div>

            </div>
        )
    }
}