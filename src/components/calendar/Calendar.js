import React, { Component } from 'react'
import './../calendar/Calendar.css';
import axios from 'axios';
import HabitTile from './HabitTile';
import { Link } from 'react-router-dom';

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export default class Calendar extends Component {
    state = {
        listOfHabits: []
    }

    getAllHabits = () => {
        axios.get(`http://localhost:5000/api/habits`, { withCredentials: true })
            .then(responseFromApi => {
                this.setState({
                    listOfHabits: responseFromApi.data
                })
            })
    }

    componentDidMount() {
        this.getAllHabits();
    }

    render() {
        return (
            <div>
                <div className="goodHabits">
                    <h1 className="page-headline">Good Habits</h1>
                    <div className="week">
                    {weekdays.map( weekday => {
                    return (
                        <div key={weekday} className="week-day">
                            <div className="week-header">{weekday}</div>
                            <Link className="create-btn" to="/createHabit">Create Habit</Link>
                            <HabitTile listOfHabitsObj={this.state.listOfHabits.filter(
                                    habit => new Date(habit.date).getDay() === (weekdays.lastIndexOf(weekday) +1)).filter(habit => habit.goodHabit === true)}></HabitTile>                    
                        </div>
                    )})
                    } 
                    </div> 
                </div>

                <div className="badHabits"> 
                    <h1>Bad Habits</h1>
                    <div className="week">
                    {weekdays.map( weekday => {
                 return (
                    <div key={weekday} className="week-day">
                        <div className="week-header">{weekday}
                        </div>
                         <Link className="create-btn" to="/createHabit">Create Habit</Link>
        
                         <HabitTile listOfHabitsObj={this.state.listOfHabits.filter(
                             habit => new Date(habit.date).getDay() === (weekdays.lastIndexOf(weekday) +1)).filter(habit => habit.goodHabit === false)}></HabitTile> 
                    </div>
                )})
                    }
                    </div>
                </div>
            </div>
        )
    }
}
