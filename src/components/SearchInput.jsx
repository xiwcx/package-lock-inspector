import React from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';


const getQueryString = (value) => (value ? `?query=${value}` : '');

function SearchInput({ searchString }) {
    const history = useHistory();

    const handleChange = (event) => history.push(getQueryString(event.target.value));

    return (
        <label htmlFor="search-input">
            Package Name
            <input type="text" value={searchString} onChange={handleChange} id="search-input" />
        </label>
    );
}

SearchInput.propTypes = {
    searchString: PropTypes.string.isRequired,
};

export default SearchInput;
