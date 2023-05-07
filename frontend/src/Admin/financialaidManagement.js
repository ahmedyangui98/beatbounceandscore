import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'

import { NotificationContainer, NotificationManager } from 'react-notifications';
import { confirmAlert } from 'react-confirm-alert';
import { Link } from 'react-router-dom';
import DarkFooter from '../Footers/DarkFooter';
import { Button, Col, FormGroup, Input, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import 'react-confirm-alert/src/react-confirm-alert.css';
import{ deleteFinancialAidForm} from '../redux/Action/financialAidActions';
const FinancialAidAdmin = () => {
  const [financialAidData, setFinancialAidData] = useState([]);
  const [data, setData] = useState([])
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/financialaid/financialaidallapplications');
      setFinancialAidData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  // Filter the data based on the search query
  const filteredData = data.filter(item =>
    item.type.toLowerCase().includes(searchQuery.toLowerCase())
);

const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:4000/api/financialaid/${id}/approve`, { status: 'approved' });
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(`http://localhost:4000/api/financialaid/${id}/reject`, { status: 'rejected' });
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };
const dispatch = useDispatch();
const handleDelete = (id) => {
    const message = 'Are you sure you want to delete this form?';
    const title = 'Delete form';
    const timeout = 5000; // milliseconds

    confirmAlert({
      title,
      message,
      buttons: [
        {
          label: 'Yes',
          className: 'btn btn-success', 
          onClick: () => {
            dispatch(deleteFinancialAidForm(id));
          },
        },
        {
          label: 'No',
          className: 'btn btn-danger', 
          onClick: () => {
            
          },
        },
      ],
      timeout,
    });
  };


 // Paginate the filtered data
 const indexOfLastItem = currentPage * itemsPerPage;
 const indexOfFirstItem = indexOfLastItem - itemsPerPage;
 const paginatedData = filteredData.slice(indexOfFirstItem, indexOfLastItem);


  return (
    <div>
       <div className='start'>
                    <h1 style={{fontSize:55,color:'black', fontWeight: 'bold' }}>Financial aid Managment:</h1>
                </div>
      <table>
        <thead className='table-header'>
          <tr className='table-row'>
          <td><h3>#</h3></td>
          <td><h3>First Name</h3></td>
          <td><h3>Last Name</h3></td>
          <td><h3>Email</h3></td>
          <td><h3>Income</h3></td>
          <td><h3>Expenses</h3></td>
          <td><h3>Decision</h3></td>

          <td><h3>Delete</h3></td>
            
          </tr>
        </thead>
        <tbody className='table-header'>
        
          {   financialAidData.map((item ,i) => (
            <tr className='table-body' key={item} >
                 <td>{i+1}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.email}</td>
              <td>{item.income}</td>
              <td>{item.expenses}</td>
              <td>
              {item.status === 'pending' && (
                  <div>
                    <Button color="success" onClick={() => handleApprove(item._id)}>
                      Approve
                    </Button>
                    <Button color="danger" onClick={() => handleReject(item._id)}>
                      Reject
                    </Button>
                  </div>
                )}
                {item.status === 'approved' && <span className="text-success">Approved</span>}
                {item.status === 'rejected' && <span className="text-danger">Rejected</span>}
              </td>

              <td><Button className="btn btn-danger"  type="button" onClick={() => handleDelete(item._id)}><i class="fas fa-trash"></i></Button></td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FinancialAidAdmin;
