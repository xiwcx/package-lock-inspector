import React, { useEffect, useState } from 'react';
import Toggle from './Toggle';

function Settings() {
    const [darkTheme, setDarkTheme] = useState(false);

    function handleDarkThemeCheckboxChange() {
        setDarkTheme(!darkTheme);
    }

    useEffect(() => document
        .querySelector('html')
        .setAttribute('data-theme', darkTheme ? 'dark' : 'light'));

    return (
        <aside className="settings">
            <h1 className="settings__title">Settings</h1>

            <Toggle
                bool={darkTheme}
                func={handleDarkThemeCheckboxChange}
                label="Dark Theme"
            />
        </aside>
    );
}

export default Settings;
