import React from 'react';
import PropTypes from 'prop-types';
import PackageName from './PackageName';


const PackagesList = ({ packages, searchString }) => {
    const listItems = Object.keys(packages).map((packageName) => {
        const { dependencies, version } = packages[packageName];

        const nestedList = dependencies
            ? (
                <PackagesList
                    packages={dependencies}
                    searchString={searchString}
                />
            )
            : null;

        return (
            <li key={packageName}>
                <PackageName
                    packageName={packageName}
                    searchString={searchString}
                />

                <span>{version}</span>

                {nestedList}
            </li>
        );
    });

    return (
        <ul>
            {listItems}
        </ul>
    );
};

PackagesList.propTypes = {
    packages: PropTypes.objectOf().isRequired,
    searchString: PropTypes.string.isRequired,
};

export default PackagesList;
