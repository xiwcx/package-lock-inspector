import React from 'react';
import { useHistory } from 'react-router';
import useSearchString from '../hooks/search-string';

const getQueryString = (value) => (value ? `?query=${value}` : '');

function SearchInput() {
    const history = useHistory();
    const searchString = useSearchString();

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

export default SearchInput;
