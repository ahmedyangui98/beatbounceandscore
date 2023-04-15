import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getServerData } from '../helper/helper'
import { Link } from 'react-router-dom';
import DarkFooter from '../Footers/DarkFooter';
import { Button, Col, FormGroup, Input, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { deleteresult, getusers } from '../redux/Action/authAction';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';




const QuizResults = () => {
    const user = useSelector((state) => state.Authreducer.user);
    const [data, setData] = useState([])
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    useEffect(() => {
        getServerData(`http://localhost:4000/api/users/result`, (res) => {
            setData(res)
        })
    }, [])
    useEffect(() => {
        dispatch(getusers());
      }, []);
     
      const users = useSelector((state) => state.Authreducer.users);
    // const users = useSelector((state) => state.Authreducer.userss);
//  console.log(users)

    const getUserById = (_id) => {
        // Assuming you have a list of users with their IDs and usernames in your application state
      
        // Find the user with the given ID
        const user = users.find((user) => user._id === _id);
      
        const str = user ? `${user.firstname} ${user.lastname}` : '';
        // Return the username if the user is found, or an empty string otherwise
        return str ;
      }

    const dispatch = useDispatch();

    const handleDelete = (id) => {
        const message = 'Are you sure you want to delete this result?';
        const title = 'Delete Result';
        const timeout = 5000; // milliseconds

        confirmAlert({
          title,
          message,
          buttons: [
            {
              label: 'Yes',
              
              onClick: () => {
                // Send DELETE request to the server to delete the data
                dispatch(deleteresult(id));
              },
            },
            {
              label: 'No',
              onClick: () => {
                // code to execute if user cancels the deletion
                console.log('Deletion canceled.');
              },
            },
          ],
          timeout,
        });
      };

    // Filter the data based on the search query
    const filteredData = data.filter(item =>
        item.type.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Paginate the filtered data
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const paginatedData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    // Render the table rows
    const tableRows = paginatedData.map((v, i) => (
        <tr className='table-body' key={i}>
            <td>{i+1}</td>
            <td>{v?.type || ''}</td>
            <td>{getUserById(v?.username) || ''}</td>
            <td>{v?.attempts || 0}</td>
            <td>{v?.points || 0}</td>
            <td>{v?.createdAt.slice(0, -14) || ""}</td>
            <td style={{ color : `${v?.achived==="Passed" ? "#2aff95" : "#ff2a66" }` }}>{v?.achived || ""}</td>
            <td><Link className='btn btn-info' to={`/resultdetail/${v.type}/${v._id}`}><i class="fas fa-info-circle"></i></Link></td>
            <td><Button className="btn btn-danger"  type="button" onClick={() => handleDelete(v._id)}><i class="fas fa-trash"></i></Button></td>
        </tr>
    ));

    return (
        <>
            <div className="container">
                <div className='start'>
                    <h1 style={{fontSize:55,color:'black', fontWeight: 'bold' }}>Quiz Results Managment:</h1>
                </div>
                <br/>
                <div>
                <Col lg="3" sm="6">
                <FormGroup>
                  <Input
                    defaultValue=""
                    placeholder="Seach by type"
                    type="text"
                    style={{borderRadius:80}}
                    value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  ></Input>
                </FormGroup>
              </Col>
                    <table >
                        <thead className='table-header'>
                            <tr className='table-row'>
                                <td><h3>#</h3></td>
                                <td><h3>Type</h3></td>
                                <td><h3>UserName</h3></td>
                                <td><h3>Attemps</h3></td>
                                <td><h3>Earn Points</h3></td>
                                <td><h3>Created At</h3></td>
                                <td><h3>Result</h3></td>
                                <td><h3>Details</h3></td>
                                <td><h3>Delete</h3></td>

                            </tr>
                        </thead>
                        <tbody className='table-header'>
                            {tableRows.length > 0 ? tableRows : <tr><td colSpan="9"><h1>No Data Found</h1></td></tr>}
                        </tbody>
                    </table>
                    <div className='start'>
                    <Pagination>
                        <PaginationItem disabled={currentPage <= 1}>
                            <PaginationLink previous onClick={() => setCurrentPage(currentPage - 1)} />
                          </PaginationItem>
                            {[...Array(Math.ceil(filteredData.length / itemsPerPage))].map((_, i) =>
                         <PaginationItem active={i + 1 === currentPage} key={i}>
                         <PaginationLink onClick={() => setCurrentPage(i + 1)}>
                         {i + 1}
                        </PaginationLink>
                         </PaginationItem>)}
                         <PaginationItem disabled={currentPage >= Math.ceil(filteredData.length / itemsPerPage)}>
                         <PaginationLink next onClick={() => setCurrentPage(currentPage + 1)} />
                         </PaginationItem>
                    </Pagination>
                    </div>  
                    <br/>
                    <NotificationContainer/>

                </div>
            </div> 
            <DarkFooter/>
        </>
    )
}



export default QuizResults;
