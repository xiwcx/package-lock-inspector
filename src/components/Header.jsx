import React from 'react';

const Header = () => (
    <header className="layout-app__header header">
        <h1 className="header__title">Package Lock Inspector</h1>

        <h2 className="header__subtitle">
            Visualize and search&nbsp;

            <abbr title="Node Package Manager">NPM</abbr>

            &nbsp;lock files
        </h2>
    </header>
);

export default Header;
