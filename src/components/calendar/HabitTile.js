import React, { Component } from 'react'
import { Link } from 'react-router-dom';


export default class HabitTile extends Component {

    state = {
        habits: []
    }

    getHabitsForWeekday(weekday) {
        let filteredHabits = this.props.listOfHabits.filter(habit => new Date(habit.date).getDay() === 5);
        this.setState({
            habits: filteredHabits
        });
    }
    
    render() {
        return (
            <div>
                { this.props.listOfHabitsObj.map( habit => {
                    return (<div key={habit._id} className="habit-tile">
                        <Link className="detail-button" to={`/habits/${habit._id}`}
><h4>{habit.title}</h4></Link>                        
                        </div>);
                }) }
            </div>
        )
    }
}
