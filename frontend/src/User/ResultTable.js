import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getServerData } from '../helper/helper'
import { Link } from 'react-router-dom';
import DarkFooter from '../Footers/DarkFooter';
import { Button, Card, Col, FormGroup, Input, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { deleteresult } from '../redux/Action/authAction';
import { confirmAlert } from 'react-confirm-alert';



const ResultTable = () => {
    const user = useSelector((state) => state.Authreducer.user);
    const [data, setData] = useState([])
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    useEffect(() => {
        getServerData(`http://localhost:4000/api/users/result/${user._id}`, (res) => {
            setData(res)
        })
    }, [])

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
    const cardElements = paginatedData.map((v, i) => (
        <Card
        style={{
            width: "24rem",
            height: "auto",
            margin: "0.8rem",
            scrollMarginRight:10,

            display: "flex",
            backgroundColor: '#17a2b8',
            borderRadius: 25,
            border: 'solid',
            color: 'black'
          }}
        key={i}
      >
        <div className="card-body">
          <h5 className="card-title">
            <h2>{v?.type.charAt(0).toUpperCase() + v?.type.substring(1) || ''}</h2>
          </h5>
          <h6 className="card-text">Attempts: {v?.attempts || 0}</h6>
          <h6 className="card-text">Earn Points: {v?.points || 0}</h6>
          <h6 className="card-text">Created At: {v?.createdAt.slice(0, -14) || ""}</h6>
          <h6 className="card-text" style={{ color: `${v?.achived==="Passed" ? "#2aff95" : "#ff2a66"}` }}>
            Result: {v?.achived || ""}
          </h6>
          <Link className='btn btn-info' to={`/resultdetail/${v.type}/${v._id}`}>
            <i className="fas fa-info-circle"></i>
          </Link>
          <Button className='btn btn-danger' onClick={() => handleDelete(v._id)}>
            <i className="fas fa-trash"></i>
          </Button>
        </div>
      </Card>
      ));
      
      // Render the cards
      const cards = (
        <div className="card-deck">
          {cardElements.length > 0 ? cardElements : <h1>No Data Found</h1>}
        </div>
      );

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
                    placeholder="Search by type"
                    type="text"
                    style={{borderRadius:80}}
                    value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  ></Input>
                </FormGroup>
              </Col>
              {cards}
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
