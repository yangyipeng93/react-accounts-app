import React, {Component} from 'react';
import Record from "./Record";
import {getRecords} from "../utils/Api";
import RecordForm from "./RecordForm";

export default class Records extends Component {


    state = {
        records: [],
        loading: false,
        error: null
    }

    componentDidMount() {
        this.setState({loading:true})
        getRecords().then(res => {
            console.log(res);
            this.setState({loading:false,records:res.data})
        }).catch(error => {
            console.log(error);
            this.setState({loading:false,error})
        })
    }


    addRecord=(record)=>{
        this.setState({
            error:null,
            loading:false,
            records:[...this.state.records,record]
        })
    }

    render() {
        const {records, loading, error} = this.state;

        let recordsComponent;

        if (loading) {
            recordsComponent=<h2>Loading</h2>
        } else if (error) {
            recordsComponent=<div>{error.message}</div>
        }else {
            recordsComponent=(
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
                        {records.map((record,index)=> <Record key={record.id} record={record}/>)}
                        </tbody>
                    </table>
            )
        }


        return (
            <div className={'container'}>
                <h2>Records</h2>
                <RecordForm handleNewRecord={this.addRecord}/>
                {recordsComponent}
            </div>

        )
    }

}
