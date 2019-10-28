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
        <>
            {/* no idea why this is getting set off ¯\_(ツ)_/¯ */}
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label className="inputs__text-label" htmlFor="search-input">
                Search Package Names
            </label>

            <input
                className="inputs__text"
                id="search-input"
                onChange={handleChange}
                type="text"
                value={searchString}
            />
        </>
    );
}

export default SearchInput;
