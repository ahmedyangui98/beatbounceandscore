import React, { useEffect, useState } from 'react'
import { getServerData } from '../helper/helper'


const ResultTable = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        getServerData("http://localhost:4000/api/users/result", (res) => {
            setData(res)
        })
    })

  return (

    <div className="container">
         <h1 className='title text-light start'>Quiz Results :</h1>
    <div>
        <table>
            <thead className='table-header'>
                <tr className='table-row'>
                    <td>Type</td>
                    <td>Attemps</td>
                    <td>Earn Points</td>
                    <td>Result</td>
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
                            <td style={{ color : `${v?.achived ? "#2aff95" : "#ff2a66" }` }}>{v?.achived || ""}</td>
                        </tr>
                    ))
                }
                
            </tbody>
        </table>
    </div>
    </div> 
  )
}

export default ResultTable;
