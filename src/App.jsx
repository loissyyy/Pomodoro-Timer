

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Confetti from 'react-confetti';
import Timer from './Timer';
import Settings from './Settings';
import ManageTimersModal from './ManageTimersModal';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f0e5e5;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Header = styled.h1`
  color: #6a4a4a;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  background-color: brown;
  color: white;
  border: none;
  border-radius: 5px;
  margin: 10px 5px;

  &:hover {
    background-color: #5a1313;
  }
`;

const App = () => {
  const [workTime, setWorkTime] = useState(25); // Default work time in minutes
  const [shortBreakTime, setShortBreakTime] = useState(5); // Default short break time in minutes
  const [longBreakTime, setLongBreakTime] = useState(15); // Default long break time in minutes
  const [sessionsBeforeLongBreak, setSessionsBeforeLongBreak] = useState(4); // Default sessions before long break
  const [title, setTitle] = useState('Tick-Tock');
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSelectTimer = (timer) => {
    setWorkTime(timer.work);
    setShortBreakTime(timer.shortBreakTime);
    setLongBreakTime(timer.longBreakTime);
    setSessionsBeforeLongBreak(timer.sessionsBeforeLongBreak);
    setTitle(timer.title);
    setShowConfetti(false);
  };

  const saveTimer = () => {
    const timers = JSON.parse(localStorage.getItem('timers')) || [];
    const newTimer = { title, work: workTime, shortBreakTime, longBreakTime, sessionsBeforeLongBreak };
    timers.push(newTimer);
    localStorage.setItem('timers', JSON.stringify(timers));
    alert('Timer saved successfully!');
  };

  return (
    <Container>
      {showConfetti && <Confetti width={dimensions.width} height={dimensions.height} />}
      <Header>{title}</Header>
      <Timer
        workTime={workTime}
        shortBreakTime={shortBreakTime}
        longBreakTime={longBreakTime}
        sessionsBeforeLongBreak={sessionsBeforeLongBreak}
        isActive={isActive}
        setIsActive={setIsActive}
        isBreak={isBreak}
        setIsBreak={setIsBreak}
        sessionComplete={sessionComplete}
        setSessionComplete={(complete) => {
          setSessionComplete(complete);
          if (complete) setShowConfetti(true);
        }}
      />
      <Button onClick={() => setIsSettingsModalOpen(true)}>Create Timer</Button>
      {isSettingsModalOpen && (
        <Settings
          setWorkTime={setWorkTime}
          setShortBreakTime={setShortBreakTime}
          setLongBreakTime={setLongBreakTime}
          setSessionsBeforeLongBreak={setSessionsBeforeLongBreak}
          setTitle={setTitle}
          onClose={() => setIsSettingsModalOpen(false)}
        />
      )}
      <Button onClick={saveTimer}>Save Timer</Button>
      <Button onClick={() => setIsManageModalOpen(true)}>Manage Timers</Button>
      {isManageModalOpen && (
        <ManageTimersModal onClose={() => setIsManageModalOpen(false)} onSelectTimer={handleSelectTimer} />
      )}
    </Container>
  );
};

export default App;
