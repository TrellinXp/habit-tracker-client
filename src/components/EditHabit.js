import React, { Component } from 'react';
import axios from 'axios';


class EditHabit extends Component {
    state = {}

    componentDidMount() {
        this.getSingleHabit();
    }

    //GET SPECIFIC 
    getSingleHabit = () => {
        const { params } = this.props.match;// to make a query to an specific point using react
        this.setState({habitsId: params.habitsId});
        axios.get(`http://localhost:5000/api/habits/${params.habitsId}`, { withCredentials: true })
            .then(responseFromApi => {
                const theHabit = responseFromApi.data;
                this.setState(theHabit);
            })

            .catch((err) => {
                console.log(err)
            })
    }

    handleFormSubmit = (event) => {
        const title = this.state.title;
        const description = this.state.description;
        const amount = this.state.amount;
        const unit = this.state.unit;

        let goodHabit = false;
        if(this.state.goodHabit === 'on') {
           goodHabit = true;
        }
        const date = Date.now();


        event.preventDefault();

        axios.put(`http://localhost:5000/api/habits/${this.state.habitsId}`, { title, description, amount, unit, goodHabit, date }, { withCredentials: true })
        .then(() => {
          // Use the passed down api call to render the updated project data
          console.log("Habbit Edited");
        })
        .catch(error => console.log(error))
    }

    handleChangeHabit = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })

    }

    render(){
        return (
            <div>
                <hr />
                <h3>Edit Habit</h3>
                <form onSubmit={this.handleFormSubmit}>
                    
                    <label>Title:</label>
                    <input type="text" name="title" value={this.state.title} onChange={ e => this.handleChangeHabit(e)}/>
                    <label>Description:</label>
                    <textarea name="description" value={this.state.description} onChange={ e => this.handleChangeHabit(e)} />
                    <label>Amount:</label>
                    <input name="amount" type="number" value={this.state.amount} onChange={ e => this.handleChangeHabit(e)} />
                    <label>Unit:</label>
                    <textarea name="unit" value={this.state.unit} onChange={ e => this.handleChangeHabit(e)} />
                    <label>Good Habit:</label>
                    <input type="checkbox" id="goodHabit" name="goodHabit" onChange={ e => this.handleChangeHabit(e)} />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}



export default EditHabit;