import React from 'react';
import PropTypes from 'prop-types';

const Toggle = ({ bool, setFunc, label }) => {
    const checkboxId = `${label.split(' ').join('-').toLowerCase()}-checkbox`;

    return (
        <div className="toggle">
            <input
                checked={bool}
                className="toggle__checkbox visually-hidden"
                id={checkboxId}
                onChange={() => setFunc(!bool)}
                type="checkbox"
            />

            <label
                className="toggle__label"
                htmlFor={checkboxId}
            >
                {label}
            </label>
        </div>
    );
};

Toggle.propTypes = {
    bool: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    setFunc: PropTypes.func.isRequired,
};

export default Toggle;
