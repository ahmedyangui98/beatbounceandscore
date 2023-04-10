import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getServerData } from '../helper/helper'
import { Link } from 'react-router-dom';
import DarkFooter from '../Footers/DarkFooter';


const ResultTable = () => {
    const user = useSelector((state) => state.Authreducer.user);
    const [data, setData] = useState([])
    useEffect(() => {
        getServerData(`http://localhost:4000/api/users/result/${user._id}`, (res) => {
            setData(res)
        })
    })
  return (
<>
    <div className="container">
      <div className='start'>
      <h1 style={{fontSize:55,color:'black', fontWeight: 'bold' }}>Quiz Result :</h1>
      </div>
        <br/>
        <div>
        <table >
            <thead className='table-header'>
                <tr className='table-row'>
                    <td>Type</td>
                    <td>Attemps</td>
                    <td>Earn Points</td>
                    <td>Created At</td>
                    <td>Result</td>
                    <td>Detail</td>

                </tr>
            </thead>
            <tbody className='table-header'>
                { !data ?? <div><h1>No Data Found</h1> </div>}
                {
                    data.map((v, i) => (
                        <tr className='table-body' key={i}>
                            <td>{v?.type || ''}</td>
                            <td>{v?.attempts || 0}</td>
                            <td>{v?.points || 0}</td>
                            <td>{v?.createdAt.slice(0, -14) || ""}</td>
                            <td style={{ color : `${v?.achived==="Passed" ? "#2aff95" : "#ff2a66" }` }}>{v?.achived || ""}</td>
                            <td><Link className='btn btn-info' to={`/resultdetail/${v.type}/${v._id}`}><i className="now-ui-icons location_world mr-1"></i></Link></td>

                        </tr>
                    ))
                }
                
            </tbody>
        </table>
        </div>
    </div> 
    <br/>
    <DarkFooter/>
    </>
  )
}

export default ResultTable;
