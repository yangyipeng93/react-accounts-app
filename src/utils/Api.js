import axios from 'axios';

export const api = process.env.REACT_APP_RECORDS_API_URL || '';

export const getRecords = () => axios.get(`${api}/api/v1/records`)

export const postRecord = (body) =>{
   return  axios.post(`${api}/api/v1/records`,body);
}


export const updateRecord = (id, body) => axios.put(`${api}/api/v1/records/${id}`, body)

export const removeRecord = (id) => axios.delete(`${api}/api/v1/records/${id}`)
