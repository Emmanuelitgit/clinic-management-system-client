import React from 'react';
import { useState, useEffect } from 'react';
import { MDBDataTable } from 'mdbreact';
import { Folder, Delete, Update, Add } from '@mui/icons-material';
import Button from '../Buttons/Button';
import { tableData } from '../../utils/Data';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../api';



const PaymentList = () => {

    const [data, setData] = useState({ columns: [], rows: [] });
    const dep = useSelector(state => state.count?.depValue) || [2];

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await api.get('/invoice_list', {
            withCredentials: true,
        });

        const fetchedData = response.data;
  
          const transformedData = {
            columns: [
              { label: 'Invoice ID', field: 'invoice_id', sort: 'asc' },
              { label: 'Date', field: 'date', sort: 'asc' },
              { label: 'Amount', field: 'amount', sort: 'asc' },
              { label: 'Payment Type', field: 'type', sort: 'asc' },
              { label: 'Transaction ID', field: 'transaction_id', sort: 'asc' },
              { label: 'Method', field: 'method', sort: 'asc' },
              { label: 'Patient', field: 'patient', sort: 'asc' },
            ],
            rows: fetchedData.map(item => ({
              invoice_id: item.invoice_id,
              date: item.date,
              amount: item.amount,
              type: item.title,
              transaction_id:item.transaction_id,
              method: item.method,
              patient: item.patient_name
            })),
          };
  
          setData(transformedData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
  return (
    <div className='main-border'>
       <MDBDataTable
        striped
        bordered
        searchLabel='Search name...'
        className='table-component'
        data={data}
        theadColor='black'
        theadTextWhite
        noBottomColumns
        searching
        displayEntries
        info
        />
    </div>
  );
}

export default PaymentList;