import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function ScrollDownButton() {
  const [isVibrating, setIsVibrating] = useState(false);

  const handleButtonClick = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const handleVibrationAnimation = () => {
    setIsVibrating(true);
  };

  const handleVibrationAnimationEnd = () => {
    setIsVibrating(false);
  };

  const scrollDownBtnStyle = {
    position: 'fixed',
    bottom: '20px',
    left: '300px',
    backgroundColor: '#ffffff',
    border: 'none',
    borderRadius: '20%',
    width: '200px',
    height: '100px',
    fontSize: '50px',
    color: '#000012',
    animation: `${isVibrating ? 'vibration 0.3s infinite alternate' : ''}`,
    animationTimingFunction: 'ease-in-out',
  };

  const vibrationKeyframes = `
    @keyframes vibration {
      from {
        transform: translateY(-2px);
      }
      to {
        transform: translateY(2px);
      }
    }
  `;

  return (
    <>
      <IconButton
        style={scrollDownBtnStyle}
        onClick={handleButtonClick}
        onAnimationStart={handleVibrationAnimation}
        onAnimationEnd={handleVibrationAnimationEnd}
        size="large"
      >
        <ExpandMoreIcon />
      </IconButton>
      <style>{vibrationKeyframes}</style>
    </>
  );
}

export default ScrollDownButton;
