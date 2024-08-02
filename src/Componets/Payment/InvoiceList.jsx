import React from 'react';
import { useState, useEffect } from 'react';
import { MDBDataTable } from 'mdbreact';
import { Folder, Delete, Update, Add } from '@mui/icons-material';
import Button from '../Buttons/Button';
import { tableData } from '../../utils/Data';
import AddInvoice from "./AddInvoice";
import ManageInvoice from "./ManageInvoice";
import ActionBtn from '../Buttons/ActionBtn';
import { useDispatch, useSelector } from 'react-redux';
import StatusDropdown from '../Buttons/StatusDropdown';


const InvoiceList = () => {

    const handleClick = () =>{
       alert("This will change the payment status to paid")
    }

    const handleStatusSelect = () => {
    }

  const role = localStorage.getItem("role").toLowerCase();
  const [data, setData] = useState({ columns: [], rows: [] });

  const dep = useSelector(state => state.count?.depValue) || [2];

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await fetch('http://localhost:5000/invoice_list', {
                method: 'GET',
                credentials: 'include', // Important for including cookies
            });
              if (!response.ok) {
                  throw new Error('Failed to fetch data');
              }
              const fetchedData = await response.json();

              const columns = [
                { label: 'ID', field: 'id', sort: 'asc' },
                { label: 'Title', field: 'title', sort: 'asc' },
                { label: 'Amount', field: 'amount', sort: 'asc' },
                { label: 'Patient', field: 'patient', sort: 'asc' },
                // { label: 'Accountant', field: 'accountant', sort: 'asc' },
                { label: 'Date', field: 'date', sort: 'asc' },
                // { label: 'Status', field: 'status', sort: 'disabled' }
               ];

               columns.push({ label: 'Status', field: 'status', sort: 'disabled' })

              if (role === "accountant") {
                  columns.push({ label: 'Actions', field: 'actions', sort: 'disabled' });
              }

              const transformedData = {
                  columns: columns,
                  rows: fetchedData.map(item => ({
                      id: item.invoice_id,
                      title: item.title,
                      amount: item.amount,
                      patient: item.patient_name,
                    //   accountant: item.accountant_name,
                      date: item.date,
                      status:(
                        <StatusDropdown
                         handleStatusSelect={(status) => handleStatusSelect(status)}
                         id={item.invoice_id}
                         option1={"Paid"}
                         option2={"Unpaid"}
                         statusValue={item.status}
                         name={"payment"}
                         padding={'5%'}
                         width={'70%'}
                         backgroundColor={item.status === "Paid"? "#27ae60" : "red"}
                         status={item.status}
                         url={"payment"}
                        />                        
                    ),
                      actions: (
                          <ManageInvoice
                          name={"Invoice"}
                          id={item.invoice_id}
                          patient={item.patient_name}
                          patient_id={item.patient_id}
                           />
                      )
                  })),
              };

              setData(transformedData);
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };

      fetchData();
  }, [dep]);

  return (
      <div className='main-border'>
          {role === "accountant"  &&
              <div className='add-btn-container'>
                  <AddInvoice/>
              </div>
          }

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

export default InvoiceList;