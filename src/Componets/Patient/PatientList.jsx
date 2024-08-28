import React from 'react';
import { useState, useEffect } from 'react';
import { MDBDataTable } from 'mdbreact';
import AddPatient from './AddPatient';
import ManagePatient from './ManagePatient';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../api';
import Swal from 'sweetalert2'



const PatientList = () => {

  const role = localStorage.getItem("role").toLowerCase();
  const [data, setData] = useState({ columns: [], rows: [] });
  const dep = useSelector(state => state.count?.depValue) || [2];

  const showAlert = () =>{
    Swal.fire({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success"
      });
  }

  useEffect(() => {
      const fetchData = async () => {
          try {
            // if(accessToken){
                const response = await api.get('/patients', {
                    withCredentials: true,
                });
  
                const fetchedData = response.data;
    
                  const columns = [
                      { label: 'ID', field: 'id', sort: 'asc' },
                      { label: 'PATIENT NAME', field: 'name', sort: 'asc' },
                      { label: 'AGE', field: 'age', sort: 'asc' },
                      { label: 'SEX', field: 'sex', sort: 'asc' },
                    //   { label: 'Blood Group', field: 'username', sort: 'asc' },
                      { label: 'BIRTH DATE', field: 'birth', sort: 'asc' },
                      { label: 'PHONE', field: 'phone', sort: 'asc' },
                  ];
                  if (role === "doctor") {
                      columns.push({ label: 'ACTIONS', field: 'actions', sort: 'disabled' });
                  }else if (role === "nurse") {
                    columns.push({ label: 'ACTIONS', field: 'actions', sort: 'disabled' });
                }
    
                  const transformedData = {
                      columns: columns,
                      rows: fetchedData.map(item => ({
                          id: item.patient_id,
                          name: item.name,
                          age: item.age,
                          sex:item.sex,
                          birth:item.birth_date,
                          phone:item.phone,
                          actions: (
                              <ManagePatient
                              name={"Patient"}
                              email={item.email}
                              address={item.address}
                              id={item.patient_id}
                              patient={item.name}
                              age={25}
                              sex={item.sex}
                              birth={item.birth_date}
                              phone={item.phone}
                              blood_group={item.blood_group}
                              profile={item.profile}
                               />
                          )
                      })),
                  };
    
                  setData(transformedData);
            // }
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };

      fetchData();
  }, [dep]);

  return (
      <div className=''>
          {role === "doctor"  &&
              <div className='add-btn-container'>
                  <AddPatient/>
              </div>
          }
           {role === "nurse"  &&
              <div className='add-btn-container'>
                  <AddPatient/>
              </div>
          }
          <MDBDataTable
              striped
              bordered
              searchLabel='Search patient name...'
              className='table-component'
              data={data}
              theadColor='green'
              theadTextWhite
              noBottomColumns
              searching
              displayEntries
              info
          />
      </div>
  );
}

export default PatientList;