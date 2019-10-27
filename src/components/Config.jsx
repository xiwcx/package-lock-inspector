import React, { useEffect } from 'react';
import { useLocalStorage } from 'react-use';
import { CONFIG_DARK_THEME, CONFIG_LOCAL_STORAGE } from '../utils/config';
import Toggle from './Toggle';

function Config() {
    const [configDarkTheme, setConfigDarkTheme] = useLocalStorage(CONFIG_DARK_THEME, false);
    const [
        configLocalStorage,
        setConfigLocalStorage,
    ] = useLocalStorage(CONFIG_LOCAL_STORAGE, true);

    useEffect(() => document
        .querySelector('html')
        .setAttribute('data-theme', configDarkTheme ? 'dark' : 'light'));

    return (
        <aside className="layout-app__aside settings">
            <h1 className="settings__title">Settings</h1>

            <Toggle
                bool={configLocalStorage}
                setFunc={setConfigLocalStorage}
                label="Use local storage"
            />

            <Toggle
                bool={configDarkTheme}
                setFunc={setConfigDarkTheme}
                label="Use dark theme"
            />
        </aside>
    );
}

export default Config;
