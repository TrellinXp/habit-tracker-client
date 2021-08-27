import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EditHabit from './EditHabit'

class HabitDetails extends Component {
    state = {}

    componentDidMount() {
        this.getSingleHabit();
    }

    //GET SPECIFIC 
    getSingleHabit = () => {
        const { params } = this.props.match;// to make a query to an specific point using react
        console.log(JSON.stringify(`${params}`))
        axios.get(`http://localhost:5000/api/habits/${params.id}`, { withCredentials: true })
            .then(responseFromApi => {
                const theHabit = responseFromApi.data;
                console.log('HABIT:', theHabit);
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
       
        return (
            <div>
                <h1>Habit Details</h1>
                <h3>{this.state.title}</h3>
                <p>{this.state.description}</p>
                <p>{this.state.amount}</p>
                <p>{this.state.unit}</p>
                <p>{this.state.goodHabit}</p>
                <p>{this.state.date}</p>

                
                    
                 <EditHabit theHabit={this.state} getTheHabit={this.getSingleHabit} />
                
                {/* passing the info of the last state of the form before is updated */}

                    
                <p><button onClick={this.deleteHabit}>Delete habit</button>  </p>
                

                {/* delete button included in the details form, method for it up as well */}

                <Link to={'/habits'}>Back to habits List</Link>
            </div>
        )
    }
}







export default HabitDetails