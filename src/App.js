import React from 'react';
import './App.scss';
import Header from './components/Header';
import Main from './components/Main';
import Settings from './components/Settings';

function App() {
    return (
        <div className="App">
            <Header />
            <Settings />
            <Main />
        </div>
    );
}

export default App;
