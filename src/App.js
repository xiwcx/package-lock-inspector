import React from 'react';
import './App.scss';
import Aside from './components/Aside';
import Header from './components/Header';
import Main from './components/Main';

function App() {
    return (
        <div className="App">
            <Header />
            <Aside />
            <Main />
        </div>
    );
}

export default App;
