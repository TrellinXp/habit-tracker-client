import React, { Component } from 'react';
import axios from 'axios';

class EditHabit extends Component {
    constructor() {
        super();
        this.state = {date: new Date(Date.now()), habit: ''};
    }

    componentDidMount() {   
        this.getSingleHabit();
    }

    getDate = (date) => {
        let dateArr = date.toISOString().split('T');
        this.setState({
            date: dateArr[0] 
        })
    }

    //GET SPECIFIC 
    getSingleHabit = () => {
        const { params } = this.props.match;// to make a query to an specific point using react
        this.setState({habitsId: params.habitsId});
        axios.get(process.env.REACT_APP_API_URL+`/habits/${params.habitsId}`, { withCredentials: true })
            .then(responseFromApi => {
                const theHabit = responseFromApi.data;
                if(theHabit.date) {
                    this.getDate(new Date(theHabit.date));
                }
                this.setState({
                    habit: theHabit
                });
            })

            .catch((err) => {
                console.log(err)
            })
    }

    handleFormSubmit = (event) => {
        const title = this.state.habit.title;
        const description = this.state.habit.description;
        const amount = this.state.habit.amount;
        const unit = this.state.habit.unit;

        let goodHabit = this.state.habit.goodHabit;
        const date = this.state.date;

        event.preventDefault();

        axios.put(process.env.REACT_APP_API_URL+`/habits/${this.state.habitsId}`, { title, description, amount, unit, goodHabit, date }, { withCredentials: true })
        .then(() => {
          // Use the passed down api call to render the updated project data
          this.props.history.push('/calendar');
        })
        .catch(error => console.log(error))
    }

    handleChange = (event) => {
        var habitObj = this.state.habit;
        habitObj[event.target.name] = event.target.value;
        this.setState({
            habit: habitObj
        })
    }

    handleChangeHabitCheckbox = (event) => {
        var habitObj = this.state.habit;
        habitObj.goodHabit = event.target.checked;
        this.setState({
            habit: habitObj
        })
    }

    handleChangeDate = (event) => {
        this.setState({
            date: event.target.value
        })
    }

    render(){
        return (
            <div className="edit-container">
              <h1 className="page-headline">Edit Habit</h1>
                <form className="form-box" onSubmit={this.handleFormSubmit}>
                    <div className="habit-properties">
                        <label>Title:</label>
                        <input type="text" name="title" value={this.state.habit.title} onChange={e => this.handleChange(e)}/>
                    </div>
                    <div className="habit-properties">
                        <label>Description:</label>
                        <textarea name="description" value={this.state.habit.description} onChange={e => this.handleChange(e)} />
                    </div>
                    <div className="habit-properties">
                        <label>Amount:</label>
                        <input name="amount" type="number" value={this.state.habit.amount} onChange={e => this.handleChange(e)} />
                    </div>
                    <div className="habit-properties">
                        <label>Unit:</label>
                        <input name="unit" type="text" value={this.state.habit.unit} onChange={e => this.handleChange(e)} />
                    </div>
                    <div className="habit-properties">
                        <label>Date:</label>
                        <input type="date" name="date" value={this.state.date} onChange={e => this.handleChangeDate(e)} />
                    </div>
                    <div className="habit-properties">
                        <label>Good Habit:</label>
                        <input className="habbit-checkbox" checked={this.state.habit.goodHabit} type="checkbox" id="goodHabit" name="goodHabit" onChange={e => this.handleChangeHabitCheckbox(e)} />
                    </div>
                    <input className="habit-button" type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}



export default EditHabit;