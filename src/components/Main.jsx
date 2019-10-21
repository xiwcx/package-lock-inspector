import React from 'react';
import { useLocation } from 'react-router';
import PropTypes from 'prop-types';
import PackageLockDrop from './PackageLockDrop';
import PackagesList from './PackagesList';
import SearchInput from './SearchInput';
import filterPackages from '../utils/filter-packages';
import useSearchString from '../hooks/search-string';

function Main({ packages, setPackages }) {
    const location = useLocation();
    const searchString = useSearchString(location);
    const clearPackages = () => setPackages({});

    // memoization
    const hasPackages = !!Object.keys(packages).length;
    const displayPackages = hasPackages && searchString
        ? filterPackages(packages, searchString)
        : packages;
    const content = hasPackages
        ? (
            <>
                <div className="layout-controls">
                    <SearchInput searchString={searchString} />

                    <button
                        className="clear-button"
                        onClick={clearPackages}
                        type="button"
                    >
                        Clear
                    </button>
                </div>

                <PackagesList
                    packages={displayPackages}
                    searchString={searchString}
                />
            </>
        )
        : <PackageLockDrop setPackages={setPackages} />;

    return (
        <main className="layout-app__main main">
            {content}
        </main>
    );
}

Main.propTypes = {
    packages: PropTypes.string.isRequired,
    setPackages: PropTypes.string.isRequired,
};

export default Main;
