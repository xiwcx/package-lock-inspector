import React from 'react';
import './App.scss';
import { useDebounce } from 'react-use';
import { useLocation } from 'react-router';
import Config from './components/Config';
import Header from './components/Header';
import Inputs from './components/Inputs';
import Packages from './components/Packages';
import PackageLockDrop from './components/PackageLockDrop';
import usePackages from './hooks/packages';
import { GAinit, GApageview } from './utils/ga';

GAinit();

function App() {
    const [packages, setPackages] = usePackages();
    const hasPackages = !!Object.keys(packages).length;
    const location = useLocation();
    const content = hasPackages
        ? (
            <>
                <Inputs setPackages={setPackages} />

                <Packages packages={packages} />
            </>
        )
        : <PackageLockDrop setPackages={setPackages} />;

    useDebounce(
        () => GApageview(location),
        1000,
        [location],
    );

    return (
        <div className="layout-app">
            <Header />

            <Config />

            <main className="layout-app__main main">
                { content }
            </main>
        </div>
    );
}

export default App;
