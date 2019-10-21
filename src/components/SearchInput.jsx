import React from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';


const getQueryString = (value) => (value ? `?query=${value}` : '');

function SearchInput({ searchString }) {
    const history = useHistory();

    const handleChange = (event) => history.push(getQueryString(event.target.value));

    return (
        <label className="search layout-controls__search" htmlFor="search-input">
            <span className="search__label">
                Search Package Names
            </span>

            <input
                className="search__input"
                id="search-input"
                onChange={handleChange}
                type="text"
                value={searchString}
            />
        </label>
    );
}

SearchInput.propTypes = {
    searchString: PropTypes.string.isRequired,
};

export default SearchInput;
