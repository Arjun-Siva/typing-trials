import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { ScoresContextProvider } from './context/ScoreContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
        <ScoresContextProvider>
            <App />
        </ScoresContextProvider>
    </AuthContextProvider>
);