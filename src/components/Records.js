import React, {Component} from 'react';
import Record from "./Record";
import {getRecords} from "../utils/Api";
import RecordForm from "./RecordForm";
import AmountBox from "./AmountBox";

export default class Records extends Component {


    state = {
        records: [],
        loading: false,
        error: null
    }

    componentDidMount() {
        this.setState({loading: true})
        getRecords().then(res => {
            console.log(res);
            this.setState({loading: false, records: res.data})
        }).catch(error => {
            console.log(error);
            this.setState({loading: false, error})
        })
    }


    addRecord = (record) => {
        this.setState({
            error: null,
            loading: false,
            records: [...this.state.records, record]
        })
    }

    handleDeleteRecord = (record) => {
        const records = this.state.records.filter((item, index) => {
            return record.id !== item.id
        })
        this.setState({records})
    }

    handleEditRecord = (record) => {
        const records = this.state.records.map((item, index) => {
            if (record.id !== item.id) {
                return item;
            }
            return {...item, ...record}
        })
        this.setState({records})

    }

    credits() {
        let credits = this.state.records.filter((record) => {
            return record.amount >= 0;
        })

        return credits.reduce((prev, curr) => {
            return prev + Number.parseInt(curr.amount, 0)
        }, 0)
    }

    debits() {
        let credits = this.state.records.filter((record) => {
            return record.amount < 0;
        })

        return credits.reduce((prev, curr) => {
            return prev + Number.parseInt(curr.amount, 0)
        }, 0)
    }

    balance() {
        return this.credits() + this.debits();
    }

    render() {
        const {records, loading, error} = this.state;

        let recordsComponent;

        if (loading) {
            recordsComponent = <h2>Loading</h2>
        } else if (error) {
            recordsComponent = <div>{error.message}</div>
        } else {
            recordsComponent = (
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>Data</th>
                        <th>Title</th>
                        <th>Amount</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {records.map((record, index) =>
                        <Record key={record.id} record={record}
                                handleDeleteRecord={this.handleDeleteRecord}
                                handleEditRecord={this.handleEditRecord}

                        />)}
                    </tbody>
                </table>
            )
        }


        return (
            <div className={'container'}>
                <h2>Records</h2>
                <div className="row mb-3">
                    <AmountBox text="Credit" type="success" amount={this.credits()}/>
                    <AmountBox text="Debit" type="danger" amount={this.debits()}/>
                    <AmountBox text="Balance" type="info" amount={this.balance()}/>
                </div>
                <RecordForm handleNewRecord={this.addRecord}/>
                {recordsComponent}
            </div>

        )
    }

}
