import React from 'react';
import { useLocation } from 'react-router';
import PackageLockDrop from './PackageLockDrop';
import PackagesList from './PackagesList';
import SearchInput from './SearchInput';
import filterPackages from '../utils/filter-packages';
import usePackages from '../hooks/packages';
import useSearchString from '../hooks/search-string';

function Main() {
    const location = useLocation();
    const [packages, setPackages] = usePackages();
    const searchString = useSearchString(location);

    // memoization
    const displayPackages = searchString
        ? filterPackages(packages, searchString)
        : packages;
    const packagesList = packages.length
        ? null
        : (
            <PackagesList
                packages={displayPackages}
                searchString={searchString}
            />
        );

    return (
        <main>
            <SearchInput searchString={searchString} />

            <PackageLockDrop setPackages={setPackages} />

            {packagesList}
        </main>
    );
}

export default Main;
