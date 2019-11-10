import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useLocalStorage, useMeasure } from 'react-use';
import { CONFIG_DARK_THEME, CONFIG_LOCAL_STORAGE } from '../utils/config';
import Toggle from './Toggle';


function Config() {
    const [configDarkTheme, setConfigDarkTheme] = useLocalStorage(
        CONFIG_DARK_THEME,
        window.matchMedia('(prefers-color-scheme: dark)').matches,
    );
    const [
        configLocalStorage,
        setConfigLocalStorage,
    ] = useLocalStorage(CONFIG_LOCAL_STORAGE, true);
    const [ref, { width }] = useMeasure();
    const asideContainerClasses = classNames({
        aside: true,
        'layout-app__aside': true,
        'aside--sm': width >= 500,
        'aside--md': width >= 600,
    });

    useEffect(() => document
        .querySelector('html')
        .setAttribute('data-theme', configDarkTheme ? 'dark' : 'light'));

    return (
        <aside className={asideContainerClasses} ref={ref}>
            <div className="aside__section">
                <h1 className="aside__title">Settings</h1>

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
            </div>

            <div className="aside__section">
                <h1 className="aside__title">About</h1>

                <p className="aside__text">
                    This app uses the browser to filter your&nbsp;
                    <code className="type-emphasis">package-lock.json</code>
                    &nbsp;files without sending your files to the server. If you&#39;d like you can
                    also opt out of storing your lock files in&nbsp;
                    <code className="type-emphasis">localStorage</code>
                    &nbsp;in the settings.
                </p>

                <p className="aside__text">
                    The&nbsp;
                    <a href="https://gitlab.com/welchcanavan/package-lock-inspector">source code</a>
                    &nbsp;is public. Written by&nbsp;
                    <a href="http://welchcanavan.com/">I. Welch Canavan</a>
                    .
                </p>
            </div>
        </aside>
    );
}

export default Config;
