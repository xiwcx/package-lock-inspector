import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Toggle from './Toggle';

function Settings({
    configLocalStorage,
    handleConfigLocalStorageChange,
}) {
    const [darkTheme, setDarkTheme] = useState(false);

    function handleDarkThemeCheckboxChange() {
        setDarkTheme(!darkTheme);
    }

    useEffect(() => document
        .querySelector('html')
        .setAttribute('data-theme', darkTheme ? 'dark' : 'light'));

    return (
        <aside className="layout-app__aside settings">
            <h1 className="settings__title">Settings</h1>

            <Toggle
                bool={configLocalStorage}
                func={handleConfigLocalStorageChange}
                label="Use local storage"
            />

            <Toggle
                bool={darkTheme}
                func={handleDarkThemeCheckboxChange}
                label="Use dark theme"
            />
        </aside>
    );
}

Settings.propTypes = {
    configLocalStorage: PropTypes.bool.isRequired,
    handleConfigLocalStorageChange: PropTypes.func.isRequired,
};

export default Settings;
