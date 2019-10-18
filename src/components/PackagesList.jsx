import React from 'react';
import PropTypes from 'prop-types';
import PackageName from './PackageName';


const PackagesList = ({
    packages, // eslint-disable-line react/prop-types
    searchString,
}) => {
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
            <li className="package-list__item" key={packageName}>
                <div className="package">
                    <PackageName
                        packageName={packageName}
                        searchString={searchString}
                    />

                    <span className="package__version">{version}</span>
                </div>

                {nestedList}
            </li>
        );
    });

    return (
        <ul className="package-list">
            {listItems}
        </ul>
    );
};

PackagesList.propTypes = {
    searchString: PropTypes.string.isRequired,
};

export default PackagesList;
