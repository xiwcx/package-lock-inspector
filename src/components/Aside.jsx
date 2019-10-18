import React, { useEffect, useState } from 'react';

function Aside() {
    const [darkTheme, setDarkTheme] = useState(true);

    function handleDarkThemeCheckboxChange() {
        setDarkTheme(!darkTheme);
    }

    useEffect(() => document
        .querySelector('html')
        .setAttribute('data-theme', darkTheme ? 'dark' : 'light'));

    return (
        <aside>
            <h1>Settings</h1>

            <label htmlFor="dark-theme-checkbox">
                Dark Theme

                <input
                    checked={darkTheme}
                    className="filled-in"
                    id="dark-theme-checkbox"
                    onChange={handleDarkThemeCheckboxChange}
                    type="checkbox"
                />
            </label>
        </aside>
    );
}

export default Aside;
