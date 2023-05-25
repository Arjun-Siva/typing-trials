import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { ScoresContextProvider } from './context/ScoreContext';
import { ArenaContextProvider } from './context/ArenaContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
        <ScoresContextProvider>
            <ArenaContextProvider>
                <App />
            </ArenaContextProvider>
        </ScoresContextProvider>
    </AuthContextProvider>
);