import React from 'react';
import PropTypes from 'prop-types';


const PackageName = ({ packageName, searchString }) => {
    if (packageName.includes(searchString)) {
        const indexOfSubString = packageName.indexOf(searchString);
        const indexOfSubStringEnd = indexOfSubString + searchString.length;

        return (
            <span className="package__name">
                {packageName.slice(0, indexOfSubString)}

                <mark className="package__match">
                    {packageName.slice(indexOfSubString, indexOfSubStringEnd)}
                </mark>

                {packageName.slice(indexOfSubStringEnd, packageName.length)}
            </span>
        );
    }

    return (
        <span className="package__name">
            {packageName}
        </span>
    );
};

PackageName.propTypes = {
    packageName: PropTypes.string.isRequired,
    searchString: PropTypes.string.isRequired,
};

export default PackageName;
