
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Confetti from 'react-confetti';

const TimerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px;
`;

const TimerHeader = styled.h2`
  font-size: 1em;
  color: black; 
  margin-bottom: 10px;

  @media only screen and (min-width: 900px) {
    color: #d4b9a7;
  }
`;

const TimeDisplay = styled.p`
  font-size: 6em;
  color: ${(props) => (props.isBreak ? 'lightcoral' : props.isActive ? 'red' : 'black')};
  margin: 10px 0;
`;

const Button = styled.button`
  padding: 5px 5px;
  margin: 10px 5px;
  background-color: #9e7f7f;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;

  &:hover {
    background-color: #5a1313;
  }
`;

const Message = styled.div`
  font-size: 1.5em;
  color: #633333;
  margin-top: 20px;
`;

const SessionCompleteMessage = styled.p`
  font-size: 1.5em;
  color: #08176e;
  margin-top: 10px;
`;

const Timer = ({
  workTime,
  shortBreakTime,
  longBreakTime,
  sessionsBeforeLongBreak,
  isActive,
  setIsActive,
  isBreak,
  setIsBreak,
  sessionComplete,
  setSessionComplete,
  showConfetti,
  setShowConfetti
}) => {
  const [timeLeft, setTimeLeft] = useState(workTime * 60); // Convert work time to seconds
  const [sessionCount, setSessionCount] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 1) return prev - 1;

        clearInterval(timerInterval);
        if (!isBreak) {
          setSessionCount((prev) => prev + 1);
          if (sessionCount + 1 === sessionsBeforeLongBreak) {
            if (longBreakTime > 0) {
              setIsBreak(true);
              setTimeLeft(longBreakTime * 60); // Long break time in seconds
            } else {
              setIsActive(false); // Stop timer after completing sessions without long break
              setSessionComplete(true);
            }
          } else if (sessionCount + 1 > sessionsBeforeLongBreak) {
            setIsActive(false); // Stop timer after completing sessions and long break
            setSessionComplete(true);
            setShowConfetti(true);
          } else {
            if (shortBreakTime > 0) {
              setIsBreak(true);
              setTimeLeft(shortBreakTime * 60); // Short break time in seconds
            } else {
              setTimeLeft(workTime * 60); // Work time in seconds
            }
          }
        } else {
          setIsBreak(false);
          setTimeLeft(workTime * 60); // Work time in seconds
        }

        return 0;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [isActive, timeLeft, showConfetti, isBreak, sessionCount, sessionsBeforeLongBreak, workTime, shortBreakTime, longBreakTime]);

  const startTimer = () => {
    setIsActive(true);
  };

  const stopTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setSessionComplete(false);
    setTimeLeft(workTime * 60);
    setSessionCount(0);
    setShowConfetti(false);
    
  };

  return (
    <TimerContainer>
      <TimerHeader>{isBreak ? 'Break Time' : 'Work Time'}</TimerHeader>
      <TimeDisplay isBreak={isBreak} isActive={isActive}>{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</TimeDisplay>
      <div>
        <Button onClick={startTimer} disabled={isActive}>Start</Button>
        <Button onClick={stopTimer} disabled={!isActive}>Stop</Button>
        <Button onClick={resetTimer}>Reset</Button>
      </div>
      {isBreak && <Message>Take a break!!!</Message>}
      {sessionComplete && <SessionCompleteMessage>All sessions complete!</SessionCompleteMessage>}
    </TimerContainer>
  );
};

export default Timer;
