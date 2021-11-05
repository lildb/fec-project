import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

export const QuestionModal = ({ setOpen, handleAddQuestion }) => {
  // const [localData, setLocalData] = useState(question);
  const [newQuestion, setNewQuestion] = useState({
    question_body: '',
    asker_name: '',
    question_helpfulness: 66666,
    email: '',
    answers: {},
  });

  return (
    ReactDOM.createPortal(
      <>
        <ModalShadow />
        <Modal>
          <h4>
            Ask Your Question
          </h4>
          <h5>
            About the [Procut Name Here]
          </h5>
          <QuestionForm
            setNewQuestion={setNewQuestion}
            newQuestion={newQuestion}
            handleAddQuestion={handleAddQuestion}
            setOpen={setOpen}
          />
        </Modal>
      </>,
      document.getElementById('app-modal'),
    )
  );
};

export const AnswerModal = ({ question, setIsAdd, handleAddAnswer }) => {
  const [newAnswer, setNewAnswer] = useState({
    body: '',
    answerer_name: '',
    date: '2018-01-04T00:00:00.000Z', // need refactor;
    helpfulness: 333,
    email: '',
    photos: [],
  });
  return (
    ReactDOM.createPortal(
      <>
        <ModalShadow />
        <Modal>
          <h4>
            Submit Your Answer
          </h4>
          <h5>
            [Procut Name Here --- to be added]:
            {question.question_body}
          </h5>
          <AnswerForm
            newAnswer={newAnswer}
            setNewAnswer={setNewAnswer}
            handleAddAnswer={handleAddAnswer}
            setIsAdd={setIsAdd}
          />
        </Modal>
      </>,
      document.getElementById('app-modal'),
    )
  );
};

export const QuestionForm = ({
  setOpen,
  newQuestion,
  setNewQuestion,
  handleAddQuestion,
}) => {
  const handleSumbit = (e) => {
    e.preventDefault();
    handleAddQuestion(newQuestion);
    setOpen(false);
  };
  return (
    <form>
      <Container1>
        <LabelArea htmlFor="question">
          Your Question
        </LabelArea>
        <LargeText
          id="question"
          type="text"
          maxlength="1000"
          onChange={(e) => setNewQuestion({ ...newQuestion, question_body: e.target.value })}
        />
      </Container1>
      <Container1>
        <LabelArea htmlFor="nickname">
          Your Nickname
        </LabelArea>
        <InputArea
          id="nickname"
          type="text"
          maxlength="60"
          placeholder="Example: jackson11!"
          onChange={(e) => setNewQuestion({ ...newQuestion, asker_name: e.target.value })}
        />
        <Notes>
          For privacy reasons, do not use your full name or email address
        </Notes>
      </Container1>
      <Container1>
        <LabelArea htmlFor="email">
          Your Email
        </LabelArea>
        <InputArea
          id="email"
          type="email"
          maxlength="60"
          placeholder="Why did you like the product or not?"
          onChange={(e) => setNewQuestion({ ...newQuestion, email: e.target.value })}
        />
        <Notes>
          For authentication reasons, you will not be emailed
        </Notes>
      </Container1>
      <SubmitInput
        type="submit"
        value="Submit Question"
        onClick={handleSumbit}
      />
    </form>
  );
};

export const AnswerForm = ({
  newAnswer,
  setNewAnswer,
  setIsAdd,
  handleAddAnswer,
}) => {
  const handleAnswerSumbit = (e) => {
    e.preventDefault();
    handleAddAnswer(newAnswer);
    setIsAdd(false);
  };

  return (
    <form>
      <Container1>
        <LabelArea htmlFor="yourAnswer">
          Your Answer
        </LabelArea>
        <LargeText
          id="yourAnswer"
          type="text"
          maxlength="1000"
          onChange={(e) => setNewAnswer({ ...newAnswer, body: e.target.value })}
        />
      </Container1>
      <Container1>
        <LabelArea htmlFor="yourNickname">
          What is your nickname
        </LabelArea>
        <InputArea
          id="yourNickname"
          type="text"
          maxlength="60"
          placeholder="Example: jack543!"
          onChange={(e) => setNewAnswer({ ...newAnswer, answerer_name: e.target.value })}
        />
        <Notes>
          For privacy reasons, do not use your full name or email address
        </Notes>
      </Container1>
      <Container1>
        <LabelArea htmlFor="yourEmail">
          Your Email
        </LabelArea>
        <InputArea
          id="yourEmail"
          type="email"
          maxlength="60"
          placeholder="Example: jack@email.com"
          onChange={(e) => setNewAnswer({ ...newAnswer, email: e.target.value })}
        />
        <Notes>
          For authentication reasons, you will not be emailed
        </Notes>
      </Container1>
      <Container1>
        <LabelArea htmlFor="photos">
          Upload your photos
        </LabelArea>
        <InputArea
          id="photos"
          type="file"
          accept="image/*"
          multiple
        />
      </Container1>
      <SubmitInput
        type="submit"
        value="Submit Answer"
        onClick={handleAnswerSumbit}
      />
    </form>
  );
};

const ModalShadow = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0px;
  background-color: black;
  opacity: 0.7;
  z-index: 4;
`;
const Modal = styled.div`
  max-width: 600px;
  background-color: white;
  position: fixed;
  top: 75px;
  z-index: 5;
  max-height: calc(100% - 200px);
  left: calc(50% - 250px);
  display: flex;
  flex-direction: column;
  @media (max-width: 600px) {
    left: 0px;
    margin: 0px 10px;
    padding: 10px;
  }
`;
const Container1 = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
`;

const LabelArea = styled.label`
  padding: 0 0 5px;
`;
const InputArea = styled.input`
  width: 500px;
  height: 33px;
`;
const LargeText = styled.textarea`
  width: 500px;
  height: 99px;
`;
const Notes = styled.div`
  padding: 3px 0 0;;
`;
const SubmitInput = styled.input`
  padding: 10px;
`;

// 1.3.5.4.     Submit question (button)
// A button by which the question can be submitted.

// Upon selecting this button the form’s inputs should be validated.
//  If there are any invalid entries, the submission should be prevented,
//  and a warning message will appear.
// This message should be titled “You must enter the following:

// This error will occur if :
// Any mandatory fields are blank
// The email address provided is not in correct email format
