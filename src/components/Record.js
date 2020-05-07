import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {updateRecord, removeRecord} from '../utils/Api'

export default class Record extends Component {

    state = {
        edit: false
    }

    handleUpdate = () => {
        const body = {
            date: this.refs.date.value,
            title: this.refs.title.value,
            amount: Number.parseInt(this.refs.amount.value, 0)
        }

        updateRecord(this.props.record.id,body).then(
            response => {
                this.props.handleEditRecord(response.data);
                this.handleToggle();
            }
        ).catch(error => {
            console.log(error.message)
        });
    }

    handleToggle = () => {
        this.setState({edit: !this.state.edit})
    }

    handleDelete = () => {
        removeRecord(this.props.record.id).then(
            (response) => {
                this.props.handleDeleteRecord(this.props.record)
            }
        ).catch((error) => {
            console.log(error.message)
        })

    }

    render() {
        if (this.state.edit) {
            return (
                <tr>
                    <td><input type="text" className="form-control" defaultValue={this.props.record.date} ref="date"/>
                    </td>
                    <td><input type="text" className="form-control" defaultValue={this.props.record.title} ref="title"/>
                    </td>
                    <td><input type="text" className="form-control" defaultValue={this.props.record.amount}
                               ref="amount"/></td>
                    <td>
                        <button className="btn btn-info mr-1" onClick={this.handleUpdate}>Update</button>
                        <button className="btn btn-danger" onClick={this.handleToggle}>Cancel</button>
                    </td>
                </tr>
            )
        } else {
            return (
                <tr>
                    <td>{this.props.record.date}</td>
                    <td>{this.props.record.title}</td>
                    <td>{this.props.record.amount}</td>
                    <td>
                        <button className="btn btn-info mr-1" onClick={this.handleToggle}>Edit</button>
                        <button className="btn btn-danger" onClick={this.handleDelete}>Delete</button>
                    </td>
                </tr>
            )
        }

    }

}

Record.propTypes = {
    record: PropTypes.object
}
