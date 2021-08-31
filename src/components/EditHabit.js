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
        axios.get(process.env.REACT_APP_API_URL+`/api/habits/${params.habitsId}`, { withCredentials: true })
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

        axios.put(process.env.REACT_APP_API_URL+`/api/habits/${this.state.habitsId}`, { title, description, amount, unit, goodHabit, date }, { withCredentials: true })
        .then(() => {
          // Use the passed down api call to render the updated project data
          console.log("Habbit Edited");
          this.props.history.push('/calendar');
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
                        <input className="habbit-checkbox" type="checkbox" id="goodHabit" name="goodHabit" onChange={e => this.handleChangeHabit(e)} />
                    </div>
                    <input className="habit-button" type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}



export default EditHabit;