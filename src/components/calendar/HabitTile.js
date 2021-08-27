import React, { Component } from 'react'

export default class HabitTile extends Component {
    
    state = {
        habits: []
    }

    constructor() {
        super();
        //this.getHabitsForWeekday();
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
                        <h4>{habit.title}</h4>
                        </div>);
                }) }
            </div>
        )
    }
}
