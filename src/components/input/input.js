import React from 'react';

import './input.css';

export default function Input() {
    return <div>
        <span className="operator-name" data-testid="operator-name"></span>
        <span>+38 0</span>
        <input
            className="operator-input"
            type="text"
            data-testid="operator-input"
            />
        <span className="check-icon" data-testid="check-icon"> - </span>
        <input
            className="phone-input"
            type="text"
            data-testid="phone-input"
             />
    </div>;
}
