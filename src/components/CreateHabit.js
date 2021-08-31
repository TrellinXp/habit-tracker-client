
import React, { Component } from 'react'
import axios from 'axios';
 
export default class CreateHabit extends Component {
    state = { title: "", description: "", amount:1, unit:"", date: new Date(), isShowing: false } 

    componentDidMount() {
        this.getDate()
    }

    getDate(){
        let date = new Date(Date.now());
        let dateArr = date.toISOString().split('T');
        this.setState({
            date: dateArr[0] 
        })
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const title = this.state.title;
        const description = this.state.description;
        const amount = this.state.amount;
        const unit = this.state.unit;

        let goodHabit = false;
        if(this.state.goodHabit === 'on') {
           goodHabit = true;
        }
        const date = Date.now();
        console.log(this.props.user)
        const user = this.props.user._id; // <== we need to know to which project the created task belong, so we need to get its 'id'
                                                    // it has to be the 'id' because we are referencing project 
                                                    // by its id in the task model on the server side ( project: {type: Schema.Types.ObjectId, ref: 'Project'})
        
        // { title, description, projectID } => this is 'req.body' that will be received on the server side in this route, 
        // so the names have to match
        axios.post(process.env.REACT_APP_API_URL+"/habits/",  { title, description, amount, unit, date, user, goodHabit } )
        .then( () => {
            this.props.history.push('/calendar');
        })
        .catch( error => console.log(error) )
    }

     
    handleChange = (event) => {  
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    render() {
        return (
            <div className="create-habit">
                <h1 className="page-headline">Create Habit</h1>
                <form className="form-box" onSubmit={this.handleFormSubmit}>
                    <div className="habit-properties">
                        <label>Title:</label>
                        <input type="text" name="title" value={this.state.title} onChange={e => this.handleChange(e)} />
                    </div>
                    <div className="habit-properties">
                        <label>Description:</label>
                        <textarea name="description" value={this.state.description} onChange={e => this.handleChange(e)} />
                    </div>
                    <div className="habit-properties">
                        <label>Amount:</label>
                        <input name="amount" type="number" value={this.state.amount} onChange={e => this.handleChange(e)} />
                    </div>
                    <div className="habit-properties">
                        <label>Unit:</label>
                        <input name="unit" type="text" value={this.state.unit} onChange={e => this.handleChange(e)} />
                    </div>
                    <div className="habit-properties">
                        <label>Date:</label>
                        <input type="date" name="date" value={this.state.date} onChange={e => this.handleChange(e)} />
                    </div>
                    <div className="habit-properties">
                        <label>Good Habit:</label>
                        <input className="habbit-checkbox" type="checkbox" id="goodHabit" name="goodHabit" onChange={e => this.handleChange(e)} />
                    </div>
                    <input className="habit-button" type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}
