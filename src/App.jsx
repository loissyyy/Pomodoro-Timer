
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Confetti from 'react-confetti';
import Timer from './Timer';
import Settings from './Settings';
import ManageTimersModal from './ManageTimersModal';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url('img02.jpg'); 
  background-size: cover;
  background-position: center;
  overflow: hidden;


  @media only screen and (min-width: 900px) {
     background-image: url('images/img01.jpg');
     background-size: cover;
  }
`;

const Header = styled.h1`
  color: #0d0f0e;
  margin-bottom: 20px;
  font-size: 4em;


`;


const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 5px 5px;
  font-size: 1em;
  cursor: pointer;
  background-color: #9e7f7f;
  color: #c9dcf8;
  border: none;
  border-radius: 50px;
  margin: 10px 5px;

  &:hover {
    background-color: #2e405c;
    color: white;
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
    setWorkTime(timer.workTime);
    setShortBreakTime(timer.shortBreakTime);
    setLongBreakTime(timer.longBreakTime);
    setSessionsBeforeLongBreak(timer.sessionsBeforeLongBreak);
    setTitle(timer.title);
    setShowConfetti(false);
  };

  const saveTimer = () => {
    const timers = JSON.parse(localStorage.getItem('timers')) || [];
    const newTimer = { title, workTime, shortBreakTime, longBreakTime, sessionsBeforeLongBreak };
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
        showConfetti={showConfetti}
        setShowConfetti={setShowConfetti}
      />
      <ButtonContainer>
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
      </ButtonContainer>  
      {isManageModalOpen && (
        <ManageTimersModal onClose={() => setIsManageModalOpen(false)} onSelectTimer={handleSelectTimer} />
      )}
    </Container>
  );
};

export default App;
