import React from 'react';
import PackagesList from './PackagesList';
import filterPackages from '../utils/filter-packages';
import useSearchString from '../hooks/search-string';

function Packages({
    packages, // eslint-disable-line react/prop-types
}) {
    const searchString = useSearchString();

    // memoization
    const displayPackages = searchString
        ? filterPackages(packages, searchString)
        : packages;

    return (
        <PackagesList
            packages={displayPackages}
            searchString={searchString}
        />
    );
}

export default Packages;
