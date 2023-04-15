import React, { useState } from 'react';
import { Button, Card, Input, Label } from 'reactstrap';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { FormSelect } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { add_quiz } from '../redux/Action/authAction';
import DarkFooter from '../Footers/DarkFooter';

const QuizAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState({
    questions: [],
    answers: [],
    type: ''
  });
  const [quizType, setQuizType] = useState('');

  const handleQuestionChange = (questionIndex, field, value) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[questionIndex] = {
      ...updatedQuestions[questionIndex],
      [field]: value
    };
    setQuiz({
      ...quiz,
      questions: updatedQuestions,
      type: quizType
    });
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...quiz.questions];
    const updatedOptions = [...updatedQuestions[questionIndex].options];
    updatedOptions[optionIndex] = value;
    updatedQuestions[questionIndex] = {
      ...updatedQuestions[questionIndex],
      options: updatedOptions
    };
    setQuiz({
      ...quiz,
      questions: updatedQuestions,
      type: quizType
    });
  };

  const handleAddQuestion = () => {
    setQuiz({
      ...quiz,
      questions: [
        ...quiz.questions,
        {
          id: quiz.questions.length + 1,
          question: '',
          options: ['', '', '']
        }
      ]
    });
  };

  const handleRemoveQuestion = (questionIndex) => {
    const updatedQuestions = quiz.questions.filter((q, index) => index !== questionIndex);
    setQuiz({
      ...quiz,
      questions: updatedQuestions,
      type: quizType
    });
  };

  const handleAnswerChange = (answerIndex, value) => {
    const updatedAnswers = [...quiz.answers];
    updatedAnswers[answerIndex] = value;
    setQuiz({
      ...quiz,
      answers: updatedAnswers,
      type: quizType
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const hasEmptyQuestion = quiz.questions.some(question => question.question.trim() === '');
    const hasEmptyAnswer = quiz.answers.some(answer => answer === undefined || answer === null|| answer === '');
    const hasEmptyType = quiz.type === undefined ||  quiz.type === null||  quiz.type === '';

    if (quiz.questions.length !== 10) {
      NotificationManager.error('Error message', 'You need to add 10 questions!', 2500);
      return;
    } else if (hasEmptyQuestion || hasEmptyAnswer) {
      NotificationManager.warning('Warning message', 'All questions and answers must be filled!', 2500);
      return;
    } else if (hasEmptyType) {
      NotificationManager.warning('Warning message', 'Quiz Type must be filled!', 2500);
      return;
    }
    NotificationManager.success('Success', 'Quiz added successfully');

    dispatch(add_quiz(quiz, navigate));
    setQuiz({
      questions: [],
      answers: [],
      type: ''
    });
  };

  return (
    <>

    <div className='container' style={{paddingTop:100}}>
    <Card className='result flex-center' style={{backgroundColor:'#17a2b8',borderRadius:10,border:'solid'}}>
    <div className='start'>

      <form onSubmit={handleSubmit}>
      <h1 style={{fontSize:55,color:'black', fontWeight: 'bold' }}>Add Quiz :</h1>
        <br/>
        <br />
        {quiz.questions.map((question, index) => (
          <div key={index}>
            <Label>
              Question {index + 1}:
              <Input
                type="text"
                value={question.question}
                onChange={(event) => handleQuestionChange(index, 'question', event.target.value)}
              />
            </Label>
            <br />
            {question.options.map((option, optionIndex) => (
              <Label key={optionIndex}>
                Option {optionIndex + 1}:
                <Input
                  type="text"
                  value={option}
                  onChange={(event) =>
                    handleOptionChange(index, optionIndex, event.target.value)
                  }
                />
              </Label>
            ))}
            <br />
            <Label>
  Correct answer:

  <FormSelect value={quiz.answers[index]}  onChange={(event) =>
      handleAnswerChange(index, parseInt(event.target.value, 10))}>
    <option value="">--Select Response--</option>
    <option value="0">Response 1</option>
    <option value="1">Response 2</option>
    <option value="2">Response 3</option>

  </FormSelect>
</Label>
            
            <Button type="button"  className="btn-round" size="lg" onClick={() => handleRemoveQuestion(index)}>
              Remove question
            </Button>
          </div>
        ))}

<br/>
            <Label>
  Quiz type:
  <FormSelect value={quizType} onChange={(event) => setQuizType(event.target.value)}>
    <option value="">--Select type--</option>
    <option value="sport">Sport</option>
    <option value="musique">Musique</option>
    <option value="dance">Dance</option>

  </FormSelect>
</Label>
        <br />
        <Button type="button"  style={{backgroundColor:'blue'}} className="btn-round" size="lg" onClick={handleAddQuestion}>
          Add question
        </Button>
        <br />
        <Button type="submit"  style={{backgroundColor:'#4CAF50'}} className="btn-round" size="lg">Save quiz</Button>
      
      </form>
    </div>
    </Card>

    </div>
    <br/>
    <NotificationContainer/>
    <DarkFooter/>
    </>

  );
};

export default QuizAdmin;