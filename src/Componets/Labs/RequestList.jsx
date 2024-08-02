import React from 'react';
import { useState, useEffect } from 'react';
import { MDBDataTable } from 'mdbreact';
import { Folder, Delete, Update, Add } from '@mui/icons-material';
import Button from '../Buttons/Button';
import { tableData } from '../../utils/Data';
import AddRequest from "./AddRequest";
import ManageRequest from "./ManageRequest";
import ActionBtn from '../Buttons/ActionBtn';
import { useDispatch, useSelector } from 'react-redux';
import { handleResultModal, handleLabReport } from '../../store/modalState';
import AddResult from './AddResult';
import StatusDropdown from '../Buttons/StatusDropdown';


const RequestList = () => {

  const dispatch = useDispatch();

  const handleOpen = (id) =>{
    dispatch(handleLabReport(id))
    dispatch(handleResultModal())
  }

  const handleStatusSelect = () => {
  }

  const handleClick = () => {
    const confirmed = window.confirm("This will change the payment status to paid");
    if (confirmed) {
        // Do something if the user confirms
    } else {
        // Do something if the user cancels
    }
}

  const role = localStorage.getItem("role").toLowerCase();
  const [data, setData] = useState({ columns: [], rows: [] });

  let type;

  if(role==="laboratorist"){
    type = "requests/lab"
  }else if(role === "doctor"){
    type = "requests"
  }else if(role === "radiographer"){
    type = "requests/scan"
  }

  const dep = useSelector(state => state.count?.depValue) || [2];

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await fetch(`http://localhost:5000/${type}`, {
                method: 'GET',
                credentials: 'include', // Important for including cookies
            });
              if (!response.ok) {
                  throw new Error('Failed to fetch data');
              }
              const fetchedData = await response.json();

              const columns = [
                { label: 'ID', field: 'id', sort: 'asc',  },
                { label: 'Doctor', field: 'doctor', sort: 'asc' },
                { label: 'Patient', field: 'patient', sort: 'asc' },
                // { label: 'Type', field: 'request_type', sort: 'asc' },
                // { label: 'Method', field: 'method', sort: 'asc' },
                { label: 'Test Name', field: 'test_name', sort: 'asc' },
                { label: 'Date', field: 'date', sort: 'asc' },
              ];
              if (role === "doctor") {
                  columns.push({ label: 'Actions', field: 'actions', sort: 'disabled' });
              }

              if (role === "laboratorist" || role === "radiographer") {
                columns.push({ label: 'Payment', field: 'payment', sort: 'disabled' });
              }

              if (role === "laboratorist" || role === "radiographer") {
                columns.push({ label: 'Status', field: 'status', sort: 'disabled' });
              }

              if (role === "laboratorist" || role === "radiographer") {
                columns.push({ label: 'Action', field: 'action', sort: 'disabled' });
              }
           

              const transformedData = {
                  columns: columns,
                  rows: fetchedData.map(item => ({
                      id: item.request_id,
                      doctor: item.doctor_name,
                      patient: item.patient_name,
                      // request_type: item.request_type,
                      // method: item.method,
                      test_name: item.test_name,
                      date: item.date,

                      payment: (
                        <div>
                          { item.payment_status === "Paid" &&
                            <ActionBtn
                            value={item.payment_status}
                            id={item.request_id}
                            backgroundColor={"#27ae60"}
                            width={"100%"}
                            padding={"10%"}
                           />
                          }

                          { item.payment_status !== "Paid" &&
                            <ActionBtn
                            value={"Unpaid"}
                            id={item.request_id}
                            backgroundColor={"red"}
                            handleClick={handleClick}
                            width={"100%"}
                            padding={"10%"}
                           />
                          } 
                        </div>
                    ),

                    status: (
                      <div>
                     {item.payment_status === "Paid" &&
                     <StatusDropdown
                      id={item.request_id}
                      option1={"Pending"}
                      option2={"Ready"}
                      statusValue={item.lab_status}
                      name={"lab request"}
                      width={'90%'}
                      padding={'6%'}
                      backgroundColor={item.lab_status === "Ready"? "orange" : "purple"}
                      url={'lab'}
                     />
                     }

                      {item.payment_status !== "Paid" &&
                        <ActionBtn
                        value={"Wating"}
                        id={item.request_id}
                        backgroundColor={"#5b32a8"}
                        width={'80px'}
                        padding={'7%'}
                      />
                     }
                      </div>
                    ),

                    action: (
                      <div>
                     {item.payment_status === "Paid" &&
                        <ActionBtn
                        value={"Add Result"}
                        id={item.request_id}
                        backgroundColor={"blue"}
                        icon={"Folder"}
                        handleClick={()=>handleOpen(item.patient_id)}
                        width={'87%'}
                        padding={'3.5%'}
                      />
                     }
                       {item.payment_status !== "Paid" &&
                        <ActionBtn
                        value={"Waiting Payment"}
                        id={item.request_id}
                        backgroundColor={"#3279a8"}
                        padding={"6.7%"}
                      />
                     }
                      </div>
                    ),

                      actions: (
                          <ManageRequest
                            name={"Request"}
                            id={item.request_id}
                            patient_id={item.patient_id}
                            doctor_id={item.doctor_id}
                            request_type={item.request_id}
                            method={item.method}
                            test_name={item.test_name}
                            date={item.date}
                            patient_name={item.patient_name}
                            doctor_name={item.doctor_name}
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
          {role === "doctor"  &&
              <div className='add-btn-container'>
                  <AddRequest/>
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
          <AddResult/>
      </div>
  );
}

export default RequestList;