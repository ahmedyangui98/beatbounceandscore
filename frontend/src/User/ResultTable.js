import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getServerData } from '../helper/helper'
import { Link } from 'react-router-dom';
import DarkFooter from '../Footers/DarkFooter';
import { Badge, Button, Card, Col, FormGroup, Input, Pagination, PaginationItem, PaginationLink, Progress } from 'reactstrap';
import { deleteresult } from '../redux/Action/authAction';
import { confirmAlert } from 'react-confirm-alert';



const ResultTable = () => {
  const user = useSelector((state) => state.Authreducer.user);
  const [data, setData] = useState([])
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

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
          className: 'btn btn-success',
          onClick: () => {
            dispatch(deleteresult(id));
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
        scrollMarginRight: 10,
        display: "flex",
        backgroundColor: "#17a2b8",
        borderRadius: 25,
        border: "solid",
        color: "black",
        position: "relative", // added to enable hover effect
        overflow: "hidden", // added to enable hover effect
      }}
      key={i}
    >
      <div
        className="card-body"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <h3 className="card-title">
          <h1 style={{ textTransform: "capitalize" }}>
            {v?.type === "musique" ? (
              "Music"
            ) : (
              v?.type.charAt(0).toUpperCase() + v?.type.substring(1) || ""
            )}
          </h1>

        </h3>
        <h6>Attempts :</h6>  <h6 className="card-text">{v?.attempts || 0}</h6>
        <h6>Earn Points :</h6><h6 className="card-text"> {v?.points || 0}</h6>
        <h6>Created At : </h6><h6 className="card-text">{v?.createdAt.slice(0, -14) || ""}</h6>
        <h6>Status :</h6>{" "}
        <h5 className="card-text">
          {v?.achived === "Passed" ? (
            <Badge color="success" className="mr-1">
              Passed
            </Badge>
          ) : (
            <Badge color="danger" className="mr-1">
              Failed
            </Badge>
          )}
        </h5>

      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
        <Link className="btn btn-outline-warning btn-round" to={`/resultdetail/${v.type}/${v._id}`}>
          <i className="fas fa-info-circle"> detail</i>
        </Link>
        <Button className="btn btn-outline-danger btn-round" onClick={() => handleDelete(v._id)}>
          <i className="fas fa-trash"> delete</i>
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
          <h1 style={{ fontSize: 55, color: 'black', fontWeight: 'bold' }}>Quiz Result :</h1>
        </div>
        <br />
        <div>
          <Col lg="3" sm="6">
            <FormGroup>
              <Input
                defaultValue=""
                placeholder="Search by type"
                type="text"
                style={{ borderRadius: 80 }}
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
          <br />
        </div>
      </div>
      <DarkFooter />
    </>
  )
}



export default ResultTable;
