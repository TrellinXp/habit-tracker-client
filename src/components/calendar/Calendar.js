import React, { Component } from 'react'
import './../calendar/Calendar.css';
import axios from 'axios';
import HabitTile from './HabitTile';
import { Link } from 'react-router-dom';

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
var dateCounter = 0;
var currentStartDate = new Date(Date.now());
export default class Calendar extends Component {
    state = {
        listOfHabits: [],
        dates: [], 
        previousWeek: new Date()
    }

    constructor() {
        super();
        dateCounter = 1;
    }

    getAllHabits = () => {
        axios.get(process.env.REACT_APP_API_URL+`/habits`, { withCredentials: true })
            .then(responseFromApi => {
                this.setState({
                    listOfHabits: responseFromApi.data
                })
            })
    }

    getDatesToDisplay(startDate) {
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

        this.setState({
            dates : datesObj
        })
    }

    componentDidMount() {
        this.getAllHabits();
        this.getDatesToDisplay(new Date(Date.now()));
    }
    
    getDateString(date) {
        let dateArr = date.toISOString().split('T');
        return dateArr[0];
    }

    clearCounter() {
        dateCounter = -1;
    }

    previousWeek = () => {
        let previousWeekObj = currentStartDate;
        console.log(currentStartDate); 
        previousWeekObj.setDate(previousWeekObj.getDate() -8);
        console.log(currentStartDate); 
        currentStartDate = previousWeekObj;
        console.log(currentStartDate); 
        this.getDatesToDisplay(previousWeekObj);
    }

    render() {
        this.clearCounter();
        return (
            <div className="calendar-container">
                <div className="changeWeeks"><div className="changeWeek"><button onClick={this.previousWeek}>Previous Week</button></div><h1 className="page-headline-calendar">Good Habits</h1><div className="changeWeek"><button>Next Week</button></div></div>
                <div className="goodHabits">
                    <div className="week">
                    {
                    weekdays.map(weekday => {
                    dateCounter++;
                    return (
                        <div key={weekday} className="week-day">
                            <div className="week-header"><div>{weekday}</div><div>{this.state.dates[dateCounter]}</div></div>
                            <Link className="create-btn" to="/createHabit">Create Habit</Link>
                            <HabitTile listOfHabitsObj={this.state.listOfHabits.filter(
                                    habit => this.getDateString(new Date(habit.date)) === (this.state.dates[dateCounter]))}></HabitTile>                    
                        </div>
                    )})
                    } 
                    </div> 
                </div>

            </div>
        )
    }
}