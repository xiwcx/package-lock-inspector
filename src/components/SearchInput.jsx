import React, { useState, useEffect } from 'react';
import { useDebounce } from 'react-use';
import { useHistory } from 'react-router';
import useSearchString from '../hooks/search-string';

const getQueryString = (value) => (value ? `?query=${value}` : '');

function SearchInput() {
    const history = useHistory();
    const searchString = useSearchString();
    const [settled, setSettled] = useState(true);
    const handleChange = (event) => (settled
        ? history.push(getQueryString(event.target.value))
        : history.replace(getQueryString(event.target.value)));

    useEffect(
        () => setSettled(false),
        [searchString],
    );

    useDebounce(
        () => setSettled(true),
        1000,
        [searchString],
    );

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
