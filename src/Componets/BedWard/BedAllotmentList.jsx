import React from 'react';
import { useState, useEffect } from 'react';
import { MDBDataTable } from 'mdbreact';
import { Folder, Delete, Update, Add } from '@mui/icons-material';
import Button from '../Buttons/Button';
import { tableData } from '../../utils/Data';
import AddAllotment from './AddAllotment';
import ManageAllotment from './ManageAllotment';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';


const BedAllotmentList = () => {

  const role = localStorage.getItem("role").toLowerCase();
  const [data, setData] = useState({ columns: [], rows: [] });
  const dep = useSelector(state => state.count?.depValue) || [2];


  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await fetch('http://localhost:5000/bed_allotments', {
                method: 'GET',
                credentials: 'include', // Important for including cookies
            });
              if (!response.ok) {
                  throw new Error('Failed to fetch data');
              }
              const fetchedData = await response.json();

              const columns = [
                { label: 'ID', field: 'id', sort: 'asc',  },
                { label: 'Bed Type', field: 'bed_type', sort: 'asc' },
                { label: 'Bed Number', field: 'bed_number', sort: 'asc' },
                { label: 'Patient', field: 'patient', sort: 'asc' },
                { label: 'Allotment Date', field: 'allotment', sort: 'asc' },
                { label: 'Discharge Date', field: 'discharge', sort: 'asc' },
              ];
              if (role === "doctor") {
                  columns.push({ label: 'Actions', field: 'actions', sort: 'disabled' });
              }else if(role === "nurse"){
                 columns.push({ label: 'Actions', field: 'actions', sort: 'disabled' });
              }

              const transformedData = {
                  columns: columns,
                  rows: fetchedData.map(item => ({
                      id: item.allotment_id,
                      bed_type: item.bed_type,
                      bed_number: item.bed_number,
                      patient: item.patient_name,
                      allotment:item.allotment_date,
                      discharge:item.discharge_date,
                      actions: (
                          <ManageAllotment
                          name={"Bed Allotment"}
                          id={item.allotment_id}
                          patient_id={item.patient_id}
                          discharge_date={item.discharge_date}
                          allotment_date={item.allotment_date}
                          bed_id={item.alloted_bed_id}
                          patient_name={item.patient_name}
                          bed_number={item.bed_number}
                          bed_type={item.bed_type}
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
                  <AddAllotment/>
              </div>
          }
          {role === "nurse"  &&
            <div className='add-btn-container'>
               <AddAllotment/>
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

export default BedAllotmentList;
