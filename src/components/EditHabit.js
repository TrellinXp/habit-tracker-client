import React, { Component } from 'react';
import axios from 'axios';

class EditHabit extends Component {
    state = {}

    componentDidMount() {
        this.getSingleHabit();
        this.getDate();
    }

    getDate(){
        let date = new Date(Date.now());
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

        let goodHabit = this.state.goodHabit;
        const date = this.state.date;

        event.preventDefault();

        axios.put(process.env.REACT_APP_API_URL+`/habits/${this.state.habitsId}`, { title, description, amount, unit, goodHabit, date }, { withCredentials: true })
        .then(() => {
          // Use the passed down api call to render the updated project data
          this.props.history.push('/calendar');
        })
        .catch(error => console.log(error))
    }

    handleChangeHabit = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleChangeHabitCheckbox = (event) => {
        this.setState({
            [event.target.name]: event.target.checked
        })
    }

    render(){
        return (
            <div className="edit-container">
              <h1 className="page-headline">Edit Habit</h1>
                <form className="form-box" onSubmit={this.handleFormSubmit}>
                    <div className="habit-properties">
                        <label>Title:</label>
                        <input type="text" name="title" value={this.state.title} onChange={e => this.handleChangeHabit(e)}/>
                    </div>
                    <div className="habit-properties">
                        <label>Description:</label>
                        <textarea name="description" value={this.state.description} onChange={e => this.handleChangeHabit(e)} />
                    </div>
                    <div className="habit-properties">
                        <label>Amount:</label>
                        <input name="amount" type="number" value={this.state.amount} onChange={e => this.handleChangeHabit(e)} />
                    </div>
                    <div className="habit-properties">
                        <label>Unit:</label>
                        <input name="unit" type="text" value={this.state.unit} onChange={e => this.handleChangeHabit(e)} />
                    </div>
                    <div className="habit-properties">
                        <label>Date:</label>
                        <input type="date" name="date" value={this.state.date} onChange={e => this.handleChangeHabit(e)} />
                    </div>
                    <div className="habit-properties">
                        <label>Good Habit:</label>
                        <input className="habbit-checkbox" checked={this.state.goodHabit} type="checkbox" id="goodHabit" name="goodHabit" onChange={e => this.handleChangeHabitCheckbox(e)} />
                    </div>
                    <input className="habit-button" type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}



export default EditHabit;