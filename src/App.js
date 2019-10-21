import React from 'react';
import './App.scss';
import Header from './components/Header';
import Main from './components/Main';
import Settings from './components/Settings';
import UseConfigLocalStorage from './hooks/config-local-storage';
import usePackages from './hooks/packages';


function App() {
    const [configLocalStorage, setConfigLocalStorage] = UseConfigLocalStorage();
    const [packages, setPackages] = usePackages();

    const handleConfigLocalStorageChange = () => setConfigLocalStorage(!configLocalStorage);

    return (
        <div className="layout-app">
            <Header />

            <Settings
                configLocalStorage={configLocalStorage}
                handleConfigLocalStorageChange={handleConfigLocalStorageChange}
            />

            <Main
                packages={packages}
                setPackages={setPackages}
            />
        </div>
    );
}

export default App;
