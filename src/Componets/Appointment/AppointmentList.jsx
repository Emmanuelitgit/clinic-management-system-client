import React from 'react';
import { useState, useEffect } from 'react';
import { MDBDataTable } from 'mdbreact';
import AddAppointment from './AddAppointment';
import ManageAppointment from './ManageAppointment';
import { useDispatch, useSelector } from 'react-redux';


const AppointmentList = () => {

  const role = localStorage.getItem("role").toLowerCase();
  const [data, setData] = useState({ columns: [], rows: [] });
  
  const dispatch = useDispatch()

  const dep = useSelector(state => state.count?.depValue) || [2];
  // const role = useSelector(state => state.auth?.role) || [];


  useEffect(() => {
      const fetchData = async () => {
          try {

            const response = await fetch(`http://localhost:5000/appointments`, {
              method: 'GET',
              credentials: 'include', // Important for including cookies
          })
            if(!response.ok){
              throw new Error("faild to fetch")
            }
            const fetchedData = await response.json()

              const columns = [
                { label: 'ID', field: 'id', sort: 'asc',  },
                { label: 'Date', field: 'date', sort: 'asc' },
                { label: 'Patient', field: 'patient', sort: 'asc' },
                { label: 'Doctor', field: 'doctor', sort: 'asc' },
              ];

              if (role === "nurse") {
                  columns.push({ label: 'Actions', field: 'actions', sort: 'disabled' });
              }else if (role === "doctor") {
                columns.push({ label: 'Actions', field: 'actions', sort: 'disabled' });
            }

              const transformedData = {
                  columns: columns,
                  rows: fetchedData.map(item => ({
                      id: item.appointment_id,
                      date: item.date,
                      patient: item.patient_name,
                      doctor: item.doctor_name,
                      actions: (
                          <ManageAppointment
                          name={"Appointment"}
                          id={item.appointment_id}
                          patient_id={item.patient_id}
                          date={item.date}
                          doctor_id={item.doctor_id}
                          doctor_name={item.doctor_name}
                          patient_name={item.patient_name}
                          title={item.title}
                          desc={item.description}
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
                 <AddAppointment/>
              </div>
          }
          {role === "nurse"  &&
            <div className='add-btn-container'>
              <AddAppointment/>
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

export default AppointmentList;
