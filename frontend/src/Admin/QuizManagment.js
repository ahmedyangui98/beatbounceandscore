import React, { useEffect, useState } from "react";
import { getServerData } from "../helper/helper";
import { Col, FormGroup } from "react-bootstrap";
import { Button, Input } from "reactstrap";
import { Link } from "react-router-dom";
import DarkFooter from "../Footers/DarkFooter";
import { confirmAlert } from "react-confirm-alert";

const QuizManagment = () => {
    const [data, setData] = useState([])
    const [searchQuery, setSearchQuery] = useState('');


    useEffect(() => {
        getServerData(`http://localhost:4000/api/users/questions`, (res) => {
            setData(res)
        })
    }, [])

    const handleDeleteQuiz = (quizId) => {
        const message = 'Are you sure you want to delete this Quiz ?';
        const title = 'Delete Quiz ';
        const timeout = 5000; // milliseconds

        confirmAlert({
          title,
          message,
          buttons: [
            {
              label: 'Yes',
              
              onClick: () => {
                // Send DELETE request to the server to delete the data
                fetch(`http://localhost:4000/api/users/questions/${quizId}`, {
            method: 'DELETE',
          })
            .then(() => {
              // Remove the quiz from the data state
              setData(data.filter((quiz) => quiz._id !== quizId));
            })
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
    
    const filteredQuestions = data.reduce((accumulator, quiz) => {
        quiz.questions.forEach((question) => {
          if (question.question.toLowerCase().includes(searchQuery.toLowerCase())) {
            const type = quiz.type.toLowerCase();
            if (!accumulator[type]) {
              accumulator[type] = [];
            }
            accumulator[type].push({ quiz, question });
          }
        });
        return accumulator;
      }, {});
    
      if (Object.keys(filteredQuestions).length === 0) {
        return (
          <div className="container">
            <Link className='btn btn-info' to={`/quizAdmin`}><i class="fas fa-info-circle"></i>Add Quiz</Link>

            <div className='start'>
              <h1 style={{fontSize:55,color:'black', fontWeight: 'bold' }}>Quiz Management :</h1>
            </div>
            <Col lg="3" sm="6">
              <FormGroup>
                <Input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                   style={{borderRadius:80}} placeholder="Search for a question"/>
              </FormGroup>
            </Col>
            <p>No data found.</p>
          </div>
        );
      }
    
      return (
        <>
        <div className="container">
         <Link className='btn btn-info' to={`/quizAdmin`}><i class="fas fa-info-circle"></i>Add Quiz</Link>

          <div className='start'>
            <h1 style={{fontSize:55,color:'black', fontWeight: 'bold' }}>Quiz Management :</h1>
          </div>
          <br/>

          <div >
          <Col lg="3" sm="6" >
            <FormGroup>
              <Input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                 style={{borderRadius:80}} placeholder="Search for a question"/>
            </FormGroup>
          </Col>
          </div>
          <br/>

          {Object.entries(filteredQuestions).map(([type, questions]) => (
            <div key={type}>
              <h2>{type.charAt(0).toUpperCase() + type.slice(1)}</h2>
              <table>
  <thead className='table-header'>
    <tr className='table-row'>   
      <td><h3>№</h3></td>
      <td><h3>Question</h3></td>
      <td><h3>Options</h3></td>
      <td><h3>Action</h3></td>
    </tr>
  </thead>
  <tbody className='table-header'>
  {questions.map(({ quiz, question }, index) => {
  // check if this is the first question or if the quiz ID has changed
  const isFirstQuestion = index === 0;
  const previousQuizId = isFirstQuestion ? null : questions[index - 1].quiz._id;
  const isQuizIdChanged = quiz._id !== previousQuizId;

  // display the quiz ID if it has changed
  const quizIdCell = isQuizIdChanged ? (
    <td rowSpan={quiz.questions.length}>{quiz._id}</td>
  ) : null;

  // display the delete button if quiz ID has changed
  const deleteButtonCell = isQuizIdChanged ? (
    <td rowSpan={quiz.questions.length}>
      <Button
        className="btn btn-danger btn-round"
        onClick={() => handleDeleteQuiz(quiz._id)}
        style={{ marginLeft: "10px" }}
      >
        Delete
      </Button>
    </td>
  ) : null;

  // display the question and options
  return (
    <tr className='table-body' key={question.id}>
      <td>- {question.id} </td>
      <td>{question.question.substring(0, 25)}</td>
      <td>{question.options.join(", ").substring(0, 25)}</td>
      {/*quizIdCell*/}
      {deleteButtonCell}
    </tr>
  );
})}
  </tbody>
</table>
            </div>
          ))}
        </div>
        <br/>
        <DarkFooter/>
        </>
      );    
    
};

export default QuizManagment;
