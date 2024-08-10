import React from 'react';
import { useState, useEffect } from 'react';
import { MDBDataTable } from 'mdbreact';
import { Folder, Delete, Update, Add } from '@mui/icons-material';
import Button from '../Buttons/Button';
import { tableData } from '../../utils/Data';
import AddMedicineCategory from './AddMedicineCategory';
import ManageMedicineCategory from './ManageMedicineCategory';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../api';



const MedicineCategory = () => {

  const role = localStorage.getItem("role").toLocaleLowerCase();
  const [data, setData] = useState({ columns: [], rows: [] });

  const dep = useSelector(state => state.count?.depValue) || [2];

   
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '......';
    }
    return text;
  };


  useEffect(() => {
      const fetchData = async () => {
          try {
            const response = await api.get('/medicine_categories', {
                withCredentials: true,
            });

            const fetchedData = response.data;

              const columns = [
                  { label: 'ID', field: 'id', sort: 'asc' },
                  { label: 'Category Name', field: 'name', sort: 'asc' },
                  { label: 'Description', field: 'description', sort: 'asc' },
              ];
              if (role === "pharmacist") {
                  columns.push({ label: 'Actions', field: 'actions', sort: 'disabled' });
              }

              const transformedData = {
                  columns: columns,
                  rows: fetchedData.map(item => ({
                      id: item.category_id,
                      name: item.category_name,
                      description: truncateText(item.description, 60),
                      actions: (
                          <ManageMedicineCategory
                            name={"Medicine Category"}
                            id={item.category_id}
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
           {role === "pharmacist"  &&
              <div className='add-btn-container'>
                  <AddMedicineCategory/>
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

export default MedicineCategory;
