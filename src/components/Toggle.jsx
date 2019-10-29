import React from 'react';
import PropTypes from 'prop-types';
import { GAevent } from '../utils/ga';

const Toggle = ({ bool, setFunc, label }) => {
    const checkboxId = `${label.split(' ').join('-').toLowerCase()}-checkbox`;
    const toggle = () => {
        GAevent({
            category: 'Interaction',
            action: `toggle ${label}`,
            value: !bool ? 1 : 0,
        });

        return setFunc(!bool);
    };

    return (
        <div className="toggle">
            <input
                checked={bool}
                className="toggle__checkbox visually-hidden"
                id={checkboxId}
                onChange={toggle}
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
