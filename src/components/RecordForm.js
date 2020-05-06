import React, {Component} from 'react';
import {postRecord} from "../utils/Api";

export default class RecordForm extends Component {


    state = {
        date: '',
        title: '',
        amount: ''
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const {date, title, amount} = this.state;
        const body = {
            date, title,
            amount: parseInt(amount)
        }

        postRecord(body).then(
            response => {
                console.log('post record data:%o', response.data);
                this.props.handleNewRecord(response.data);
                this.setState({
                    date: "",
                    title: "",
                    amount: ""
                })
            }
        ).catch(error => {
                console.log(error.message)
            }
        )
    }


    handleChange = (event) => {
        let name, obj;
        name = event.target.name;
        this.setState((
            obj = {},
                obj[name] = event.target.value,
                obj
        ))
    }

    valid = () => {
        const {date, title, amount} = this.state;
        return date && title && amount;
    }


    render() {
        const {date, title, amount} = this.state;

        return (
            <form className="form-inline mb-3" onSubmit={this.handleSubmit}>
                <div className="form-group mr-1">
                    <input type="text" className="form-control" onChange={this.handleChange} placeholder="Date"
                           name="date" value={date}/>
                </div>
                <div className="form-group mr-1">
                    <input type="text" className="form-control" onChange={this.handleChange} placeholder="Title"
                           name="title" value={title}/>
                </div>
                <div className="form-group mr-1">
                    <input type="text" className="form-control" onChange={this.handleChange} placeholder="Amount"
                           name="amount" value={amount}/>
                </div>
                <button type="submit" className="btn btn-primary" disabled={!this.valid()}>Create Record</button>
            </form>
        )
    }

}
