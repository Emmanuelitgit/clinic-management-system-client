import React from 'react';
import { useState, useEffect } from 'react';
import { MDBDataTable } from 'mdbreact';
import { Folder, Delete, Update, Add } from '@mui/icons-material';
import Button from '../Buttons/Button';
import { tableData } from '../../utils/Data';
import AddPrescription from './AddPrescription';
import ManagePrescription from './ManagePrescription';
import PaymentStatus from '../Buttons/ActionBtn';
import ActionBtn from '../Buttons/ActionBtn';
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { CDropdownToggle,  CDropdownMenu, CDropdownItem, CDropdown} from '@coreui/react'
import { depCountActions } from '../../store/depCount';
import StatusDropdown from '../Buttons/StatusDropdown';


const PrescriptionList = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const route = location.pathname.split("/")[1]
    const role = localStorage.getItem("role").toLowerCase();
    const [data, setData] = useState({ columns: [], rows: [] });
    const dep = useSelector(state => state.count?.depValue) || [2];

    const handleStatusSelect = () => {
    }

    const handleView = (id) => {
        navigate(`/${route}/view-prescription/${id}`)
    }
    


  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await fetch('http://localhost:5000/prescriptions', {
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
                { label: 'Medication', field: 'medication', sort: 'asc' },
                { label: 'Date', field: 'date', sort: 'asc' },
              ];
              if (role === "doctor") {
                  columns.push({ label: 'Actions', field: 'actions', sort: 'disabled' });
              }
              if (role === "pharmacist") {
                columns.push({ label: 'Payment', field: 'payment', sort: 'disabled' });
              }

              if (role === "pharmacist") {
                columns.push({ label: 'Status', field: 'status', sort: 'disabled' });
              }

              if (role === "pharmacist") {
                columns.push({ label: 'View', field: 'view', sort: 'disabled' });
              }
           

              const transformedData = {
                  columns: columns,
                  rows: fetchedData.map(item => ({
                      id: item.prescription_id,
                      doctor: item.doctor_name,
                      patient: item.patient_name,
                      medication: item.medication,
                      date: item.date,
                      payment: (
                        <div>
                          { item.payment_status === "Paid" &&
                            <ActionBtn
                            value={"Paid"}
                            id={item.prescription_id}
                            backgroundColor={"#27ae60"}
                            width={"100%"}
                            padding={"9%"}
                           />
                          }

                          { item.payment_status !== "Paid" &&
                            <ActionBtn
                            value={"Unpaid"}
                            id={item.prescription_id}
                            backgroundColor={"red"}
                            width={"100%"}
                            padding={"9%"}
                           />
                          } 
                        </div>
                    ),
                    
                    view: (
                        <div>
                          <ActionBtn
                          id={item.prescription_id}
                          backgroundColor={"#0390fc"}
                          icon={"Visibility"}
                          handleClick={() => handleView(item.patient_id)}
                          width={"95%"}
                          padding={"10%"}
                        />
                        </div>
                      ),

                      status: (
                        <div>
                       {item.payment_status === "Paid" &&
                        <StatusDropdown 
                         handleStatusSelect={handleStatusSelect}
                         statusValue={item.med_status}
                         id={item.prescription_id}
                         option1={"On Pending"}
                         option2={"Item Taken"}
                         name={"prescription"}
                         width={'80%'}
                         padding={'5%'}
                         backgroundColor={item.med_status === "Item Taken"? "orange" : "purple"}
                         url={'medication'}
                         />
                       }
                         {item.payment_status !== "Paid" &&
                          <ActionBtn
                          value={"Waiting Payment"}
                          id={item.prescription_id}
                          backgroundColor={"#3279a8"}
                          width={'90%'}
                          padding={"7%"}
                        />
                       }
                        </div>
                      ),
  
                      actions: (
                          <ManagePrescription
                            name={"Prescription"}
                            id={item.prescription_id}
                            patient_id={item.patient_id}
                            doctor_id={item.doctor_id}
                            medication={item.medication}
                            date={item.date}
                            desc={item.description}
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
                  <AddPrescription/>
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

export default PrescriptionList;