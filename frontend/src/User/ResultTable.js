import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getServerData } from '../helper/helper'
import { Link } from 'react-router-dom';
import DarkFooter from '../Footers/DarkFooter';
import { Button, Col, FormGroup, Input, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { deleteresult } from '../redux/Action/authAction';


const ResultTable = () => {
    const user = useSelector((state) => state.Authreducer.user);
    const [data, setData] = useState([])
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    useEffect(() => {
        getServerData(`http://localhost:4000/api/users/result/${user._id}`, (res) => {
            setData(res)
        })
    }, [])

    const dispatch = useDispatch();

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this result?")) {
            // Send DELETE request to the server to delete the data
            dispatch(deleteresult(id));
            }

    }


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
            <td>{v?.type || ''}</td>
            <td>{v?.attempts || 0}</td>
            <td>{v?.points || 0}</td>
            <td>{v?.createdAt.slice(0, -14) || ""}</td>
            <td style={{ color : `${v?.achived==="Passed" ? "#2aff95" : "#ff2a66" }` }}>{v?.achived || ""}</td>
            <td><Link className='btn btn-info' to={`/resultdetail/${v.type}/${v._id}`}><i className="now-ui-icons location_world mr-1"></i></Link></td>
            <td><Button className="btn-neutral" color="link" type="button" onClick={() => handleDelete(v._id)}><i className="now-ui-icons location_world mr-1"></i></Button></td>
        </tr>
    ));

    return (
        <>
            <div className="container">
                <div className='start'>
                    <h1 style={{fontSize:55,color:'black', fontWeight: 'bold' }}>Quiz Result :</h1>
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
                                <td>Type</td>
                                <td>Attemps</td>
                                <td>Earn Points</td>
                                <td>Created At</td>
                                <td>Result</td>
                                <td>Details</td>
                                <td>Delete</td>

                            </tr>
                        </thead>
                        <tbody className='table-header'>
                            {tableRows.length > 0 ? tableRows : <tr><td colSpan="6"><h1>No Data Found</h1></td></tr>}
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
 
                </div>
            </div> 
            <DarkFooter/>
        </>
    )
}



export default ResultTable;
