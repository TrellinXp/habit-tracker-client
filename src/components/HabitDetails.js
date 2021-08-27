import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EditHabit from './EditHabit'

class HabitDetails extends Component {
    state = {}

    componentDidMount() {
        this.getSingleProject();
    }

    //GET SPECIFIC 
    getSingleHabit = () => {
        const { params } = this.props.match;// to make a query to an specific point using react
        axios.get(`http://localhost:5000/api/habits/${params.id}`, { withCredentials: true })
            .then(responseFromApi => {
                const theProject = responseFromApi.data;
                this.setState(theHabit);
            })

            .catch((err) => {
                console.log(err)
            })
    }

    //DELETE
    deleteHabit = () => {
        const { params } = this.props.match;
        axios.delete(`http://localhost:5000/api/habits/${params.id}`, { withCredentials: true })
            .then(() => {
                this.props.history.push('/habits');
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        const isHabitOwner = this.state.owner === this.props.userData?._id

        return (
            <div>
                <h1>{this.state.title}</h1>
                <p>{this.state.description}</p>
                <p>{this.state.amount}</p>
                <p>{this.state.unit}</p>
                <p>{this.state.goodHabit}</p>
                <p>{this.state.DateNow()}</p>

                {
                    this.state.title &&
                    isHabitOwner &&
                    <EditProject theHabit={this.state} getTheHabit={this.getSingleHabit} />
                }
                {/* passing the info of the last state of the form before is updated */}



                {
                    isHabitOwner &&
                    <p><button onClick={this.deleteHabit}>Delete habit</button>  </p>
                }

                {/* delete button included in the details form, method for it up as well */}

                <Link to={'/habits'}>Back to habits List</Link>
            </div>
        )
    }
}







export default HabitDetails