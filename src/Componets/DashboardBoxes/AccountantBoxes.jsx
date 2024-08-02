import React from 'react'
import "./style.css";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInvoiceList} from '../../store/data';

const AccountantBoxes = () => {


    // const role = useSelector((state) => state.auth?.role?.toLowerCase());
    const dispatch = useDispatch()
    const role = localStorage.getItem('role').toLowerCase();
    const dep = useSelector(state => state.count?.depValue) || [2];
    const invoiceList = useSelector((state)=>state.data.invoiceList);


    useEffect(()=>{
        dispatch(getInvoiceList())
    }, [dep])

    const accountantBoxes = [
        {
          id:6,
          name:"Invoice/Take Payment",
          background:"bg-primary",
          link:'/accountant/invoice-list',
          total: invoiceList?.length
        },
      {
        id:7,
        name:"View Payment",
        background:"bg-warning",
        link:'/accountant/payment-list',
        total: invoiceList?.length
      },
      ]


  return (
    <div className=''>
        {role === "accountant" &&
        <div class="row">
            {accountantBoxes?.map((box)=>(
            <div className="col-xl-3 col-md-6">
                <div className={`card ${box.background} text-white mb-4`} style={{
                    height:'14.5vh'
                }}>
                    <div class="card-body">
                        <span className='text-lg'>{box?.name}</span>
                        <span style={{
                             position:"absolute",
                             top:"10%",
                             left:'80%',
                             fontSize:'18px',
                             fontWeight:600
                        }}>{box.total}</span>
                    </div>
                    <div class="card-footer d-flex align-items-center justify-content-between">
                        <a class="text-sm text-white stretched-link" href={box?.link}>View Details</a>
                        <div class="text-sm text-white"><i class="fas fa-angle-right"></i></div>
                    </div>
                </div>
            </div>
            ))}
            </div>
            }
    </div>
  )
}

export default AccountantBoxes