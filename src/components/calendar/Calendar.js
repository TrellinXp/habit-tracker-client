import React, { Component } from 'react'
import './../calendar/Calendar.css';

const weekdays = ["Monday", "Thuseday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export default class Calendar extends Component {
    getWeekdays() {
        {weekdays.map( weekday => {
            return (
                <div className="week-day">{weekday}</div>
            )})
        }
    }

    render() {
        return (
            <div>
                <div className="goodHabits">
                    <h1>Good Habits</h1>
                    <div className="week">
                    {weekdays.map( weekday => {
                    return (
                        <div className="week-day">
                            <div className="week-header">{weekday}</div>
                            <div className="habit">
                                <button class="create-btn">Create Habit</button>
                            </div>
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
                    <div className="week-day">
                        <div className="week-header">{weekday}</div>
                    </div>
                )})
                    }
                    </div>
                </div>
            </div>
        )
    }
}
