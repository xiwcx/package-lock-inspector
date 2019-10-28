import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useMeasure } from 'react-use';
import SearchInput from './SearchInput';

function Inputs({ setPackages }) {
    const clearPackages = () => setPackages({});
    const [ref, { width }] = useMeasure();
    const inputsContainerClasses = classNames({
        inputs: true,
        'inputs--md': width >= 800,
    });

    return (
        <div className={inputsContainerClasses} ref={ref}>
            <SearchInput />

            <Link className="inputs__button inputs__clear-search" to="/">
                Clear search
            </Link>

            <button
                className="inputs__button inputs__clear-packages"
                onClick={clearPackages}
                type="button"
            >
                Clear packages
            </button>
        </div>
    );
}

Inputs.propTypes = {
    setPackages: PropTypes.func.isRequired,
};

export default Inputs;
