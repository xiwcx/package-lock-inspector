import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useMeasure } from 'react-use';
import SearchInput from './SearchInput';
import { GAevent } from '../utils/ga';


function Inputs({ setPackages }) {
    const clearPackages = () => {
        GAevent({
            category: 'Interaction',
            action: 'clear packages',
        });

        return setPackages({});
    };
    const clearSearch = () => GAevent({
        category: 'Interaction',
        action: 'clear search',
    });
    const [ref, { width }] = useMeasure();
    const inputsContainerClasses = classNames({
        inputs: true,
        'inputs--md': width >= 800,
    });

    return (
        <div className={inputsContainerClasses} ref={ref}>
            <SearchInput />

            <Link
                className="inputs__button inputs__clear-search"
                onClick={clearSearch}
                to="/"
            >
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
