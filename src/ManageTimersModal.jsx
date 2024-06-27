

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: relative;
  background: #eea7a7;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 600px;
  max-height: 80%;
  overflow-y: auto;

  @media only screen and (min-width: 900px) {
    background: #994444;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
  color: white;

  &:hover {
    color: brown;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
`;

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 10px;
  background-color: #863c3c;
  color: white;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #863c3c;
    color: white;
  }
`;

const Button = styled.button`
  padding: 5px 1px;
  font-size: 1em;
  cursor: pointer;
  background-color: #dd9393;
  color: brown;
  border: none;
  border-radius: 50px;

  &:hover {
    background-color: #501919;
    color: white;
  }

  &:not(:last-child) {
    margin-right: 5px;
  }
`;

const ManageTimersModal = ({ onClose, onSelectTimer }) => {
  const [timers, setTimers] = useState([]);

  useEffect(() => {
    const savedTimers = JSON.parse(localStorage.getItem('timers')) || [];
    setTimers(savedTimers);
  }, []);

  const deleteTimer = (index) => {
    const newTimers = timers.filter((_, i) => i !== index);
    setTimers(newTimers);
    localStorage.setItem('timers', JSON.stringify(newTimers));
  };

  const selectTimer = (timer) => {
    onSelectTimer(timer);
    onClose();
  };

  const editTimer = (index) => {
    const title = prompt('Enter new title:', timers[index].title);
    const work = parseInt(prompt('Enter new work time (minutes):', timers[index].work));
    const shortBreak = parseInt(prompt('Enter new short break time (minutes):', timers[index].shortBreak));
    const longBreak = parseInt(prompt('Enter new long break time (minutes):', timers[index].longBreak));
    const sessionsBeforeLongBreak = parseInt(prompt('Enter sessions before long break:', timers[index].sessionsBeforeLongBreak));
    if (title && work && shortBreak && longBreak && sessionsBeforeLongBreak) {
      const newTimers = timers.map((timer, i) =>
        i === index ? { title, work, shortBreak, longBreak, sessionsBeforeLongBreak } : timer
      );
      setTimers(newTimers);
      localStorage.setItem('timers', JSON.stringify(newTimers));
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h1>Manage Timers</h1>
        <Table>
          <thead>
            <tr>
              <Th>Title</Th>
              <Th>Work Time (mins)</Th>
              <Th>Short Break Time (mins)</Th>
              <Th>Long Break Time (mins)</Th>
              <Th>Sessions Before Long Break</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {timers.map((timer, index) => (
              <tr key={index}>
                <Td>{timer.title}</Td>
                <Td>{timer.workTime}</Td>
                <Td>{timer.shortBreakTime}</Td>
                <Td>{timer.longBreakTime}</Td>
                <Td>{timer.sessionsBeforeLongBreak}</Td>
                <Td>
                  <Button onClick={() => selectTimer(timer)}>Select</Button>
                  <Button onClick={() => editTimer(index)}>Edit</Button>
                  <Button onClick={() => deleteTimer(index)}>Delete</Button>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button onClick={onClose}>Close</Button>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ManageTimersModal;
