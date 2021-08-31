import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

class HabitList extends Component {
    state = { listOfHabits: [] } //L ist of habits is an empty array

    getAllHabits = () => {
        axios.get(process.env.REACT_APP_API_URL+`/habits`, { withCredentials: true })
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
                 {this.state.listOfHabits.map(habit => {
                      return (
                            <div key={habit._id}>
                                <Link to={`/habits/${habit._id}`}>
                                    <h3>{habit.title}</h3>
                                </Link>
                            </div>
                        )
                    })
                    }
                
            </div>
        )
    }
}





export default HabitList