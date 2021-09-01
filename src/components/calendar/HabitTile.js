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

    getIsGoodHabit(habit) {
        if(habit.goodHabit) {
            return "*Good*   ";
        } 
        return "*Bad*   ";
    }
    
    render() {
        return (
            <div>
                {this.props.listOfHabitsObj.slice(0, 10).map(habit => {
                    if (habit.goodHabit) {
                        return (<div key={habit._id} className="habit-tile-good">
                            <Link className="detail-button" to={`/habits/${habit._id}`}><h4 className="habit-title"><b>{this.getIsGoodHabit(habit)}</b>{habit.title}</h4></Link>
                        </div>);
                    } else {
                        return (<div key={habit._id} className="habit-tile-bad">
                            <Link className="detail-button" to={`/habits/${habit._id}`}><h4 lassName="habit-title"><b>{this.getIsGoodHabit(habit)}</b>{habit.title}</h4></Link>
                        </div>);
                    }
                })
                }
            </div>
        )
    }
}
