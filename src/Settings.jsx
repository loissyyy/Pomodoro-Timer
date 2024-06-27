
import React, { useState } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;


const ModalContent = styled.div`
  position: relative;
  background: #2e405c;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 600px;
  max-height: 80%;
  overflow-y: auto;

`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #eea7a7;
  border: none;
  font-size: 1.5em;
  cursor: pointer;

  &:hover {
    color: brown;
  }
`;

const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #2d405e; /* Light background color */
  padding: 20px;
  border-radius: 10px;
  margin: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const InputField = styled.input`
  padding: 10px;
  margin: 10px 0;
  border: 2px solid #254174;
  background-color: #4a6aa5 ;
  color: #e4d7d7;
  border-radius: 5px;
  font-size: 1em;
  width: 100%;

  &:focus {
    border-color: #f8f2f2;
    outline: none;
  }
`;

const Label = styled.label`
  font-size: 1em;
  color: #f5efef;
  margin-bottom: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 10px 0;
  background-color: #273a58;
  color: #dfe8f8;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: #223147;
  }

  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

const Settings = ({
  setWorkTime,
  setShortBreakTime,
  setLongBreakTime,
  setSessionsBeforeLongBreak,
  setTitle,
  onClose,
}) => {
  const [work, setWork] = useState('');
  const [shortBreak, setShortBreak] = useState(''); 
  const [longBreak, setLongBreak] = useState('');
  const [sessions, setSessions] = useState(''); 
  const [timerTitle, setTimerTitle] = useState('');

  const handleSubmit = () => {
    if (timerTitle && work > 0) {
      setWorkTime(parseInt(work));
      setShortBreakTime(parseInt(shortBreak));
      setLongBreakTime(parseInt(longBreak));
      setSessionsBeforeLongBreak(parseInt(sessions));
      setTitle(timerTitle);
      alert('Timer saved successfully!');
      setWork('');
      setShortBreak('');
      setLongBreak('');
      setSessions('');
      setTimerTitle('');
      onClose();
    } else {
      alert('Please set a title and work time.');
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <SettingsContainer>
          <Label>Title:</Label>
          <InputField
            type="text"
            value={timerTitle}
            onChange={(e) => setTimerTitle(e.target.value)}
            placeholder="Timer Title"
          />
          <Label>Work Time (minutes):</Label>
          <InputField
            type="number"
            value={work}
            onChange={(e) => setWork(e.target.value)}
            placeholder="Work Time (mins)"
          />
          <Label>Short Break Time (minutes):</Label>
          <InputField
            type="number"
            value={shortBreak}
            onChange={(e) => setShortBreak(e.target.value)}
            placeholder="Short Break Time (mins)"
          />
          <Label>Long Break Time (minutes):</Label>
          <InputField
            type="number"
            value={longBreak}
            onChange={(e) => setLongBreak(e.target.value)}
            placeholder="Long Break Time (mins)"
          />
          <Label>Sessions Before Long Break:</Label>
          <InputField
            type="number"
            value={sessions}
            onChange={(e) => setSessions(e.target.value)}
            placeholder="Sessions Before Long Break"
          />
          <Button onClick={handleSubmit}>Create timer</Button>
        </SettingsContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Settings;
