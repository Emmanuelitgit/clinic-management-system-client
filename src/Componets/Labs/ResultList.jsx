import React from 'react';
import { useState, useEffect } from 'react';
import { MDBDataTable } from 'mdbreact';
import { Folder, Delete, Update, Add } from '@mui/icons-material';
import Button from '../Buttons/Button';
import { tableData } from '../../utils/Data';
import AddResult from './AddResult';
import ManageResult from './ManageResult';
import { useDispatch, useSelector } from 'react-redux';
import ActionBtn from '../Buttons/ActionBtn';
import { Link, useNavigate } from "react-router-dom"
import { useLocation } from 'react-router-dom';


const ResultList = () => {

   const navigate = useNavigate()
    const role = localStorage.getItem("role").toLowerCase();
    const location = useLocation()
    const route = location.pathname.split("/")[1]

    const [data, setData] = useState({ columns: [], rows: [] });
    const dep = useSelector(state => state.count?.depValue) || [2];

    const handleView = (id) => {
      navigate(`/${route}/view-result/${id}`)
  }

  let type;

  if(role==="laboratorist"){
    type = "lab_result_list/lab"
  }else if(role === "doctor"){
    type = "lab_result_list"
  }else if(role === "radiographer"){
    type = "lab_result_list/scan"
  }

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
  
          const transformedData = {
            columns: [
              { label: 'ID', field: 'id', sort: 'asc',  },
              { label: 'Date', field: 'date', sort: 'asc' },
              { label: 'Laboratorist', field: 'laboratorist', sort: 'asc' },
              { label: 'Patient', field: 'patient', sort: 'asc' },
              { label: 'Test Name', field: 'test_name', sort: 'asc' },
              { label: 'Type', field: 'request_type', sort: 'asc' },
              ...(role === "laboratorist" || role === "radiographer" ? [{ label: 'Actions', field: 'actions', sort: 'disabled' }] : []),
              ...(role === "doctor" ? [{ label: 'View', field: 'view', sort: 'disabled' }] : []),
            ],
         
            rows: fetchedData.map(item => ({
              id: item.lab_report_id,
              date: item.date,
              laboratorist: item.laboratorist_name,
              patient: item.patient_name,
              test_name: item.test_name,
              request_type: item.request_type,
              actions:(
                <>
                <ManageResult
                 name={"Result"}
                 id={item.lab_report_id}
                 date={item.date}
                 laboratorist_name={item.laboratorist_name}
                 test_report={item.test_report}
                 patient_id={item.patient_id}
                />
                </>
              ),
              view:(
                <>
                <ActionBtn
                 id={item.lab_report_id}
                 backgroundColor={"#0390fc"}
                 icon={"Visibility"}
                 handleClick={() => handleView(item.patient_id)}
                 width={"80%"}
                 padding={"7%"}
                />
                </>
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
        {role === "laboratorist" && 
        <div className='add-btn-container'>
          <AddResult/>
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

export default ResultList;