import React from 'react';
import PropTypes from 'prop-types';
import SearchInput from './SearchInput';

function Inputs({ setPackages }) {
    const clearPackages = () => setPackages({});

    return (
        <div className="layout-controls">
            <SearchInput />

            <button
                className="clear-button"
                onClick={clearPackages}
                type="button"
            >
                Clear
            </button>
        </div>
    );
}

Inputs.propTypes = {
    setPackages: PropTypes.func.isRequired,
};

export default Inputs;
