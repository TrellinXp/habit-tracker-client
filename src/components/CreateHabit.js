
import React, { Component } from 'react'
import axios from 'axios';
 
export default class CreateHabit extends Component {
    state = { title: "", description: "", amount:1, unit:"", isShowing: false } 

    handleFormSubmit = (event) => {
        event.preventDefault();
        const title = this.state.title;
        const description = this.state.description;
        const amount = this.state.amount;
        const unit = this.state.unit;

        let goodHabit = false;
        if(this.state.goodHabit == 'on') {
           goodHabit = true;
        }
        const date = Date.now();

        const user = this.props.user._id; // <== we need to know to which project the created task belong, so we need to get its 'id'
                                                    // it has to be the 'id' because we are referencing project 
                                                    // by its id in the task model on the server side ( project: {type: Schema.Types.ObjectId, ref: 'Project'})
        
        // { title, description, projectID } => this is 'req.body' that will be received on the server side in this route, 
        // so the names have to match
        axios.post("http://localhost:5000/api/habits/",  { title, description, amount, unit, date, user, goodHabit } )
        .then( () => {
            // after submitting the form, retrieve project one more time so the new task is displayed as well 
            //this.setState({title: "", description: "", amount:"", unit:""});
        })
        .catch( error => console.log(error) )
    }

     
    handleChange = (event) => {  
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    render() {
        return (
            <div>
                <h1>Create Habit</h1>
                <form onSubmit={this.handleFormSubmit}>
                    <label>Title:</label>
                    <input type="text" name="title" value={this.state.title} onChange={ e => this.handleChange(e)}/>
                    <label>Description:</label>
                    <textarea name="description" value={this.state.description} onChange={ e => this.handleChange(e)} />
                    <label>Amount:</label>
                    <input name="amount" type="number" value={this.state.amount} onChange={ e => this.handleChange(e)} />
                    <label>Unit:</label>
                    <textarea name="unit" value={this.state.unit} onChange={ e => this.handleChange(e)} />
                    <label>Good Habit:</label>
                    <input type="checkbox" id="goodHabit" name="goodHabit" onChange={ e => this.handleChange(e)} />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}
