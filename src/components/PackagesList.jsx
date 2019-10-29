import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PackageName from './PackageName';
import { GAevent } from '../utils/ga';


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
        const selectPackage = () => GAevent({
            category: 'Interaction',
            action: 'select package',
        });

        return (
            <li className="package-list__item" key={packageName}>
                <Link
                    className="package"
                    onClick={selectPackage}
                    to={`?query=${packageName}`}
                >
                    <PackageName
                        packageName={packageName}
                        searchString={searchString}
                    />

                    <span className="package__version">{version}</span>
                </Link>

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
