import './Button.css';
import React from 'react';

interface ButtonProps {
    label: string;
    secondary?: boolean;
    navbar?: boolean;
    onClick?: () => void;
    btnStyle?: React.CSSProperties;
    btnLabelStyle?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({ label, secondary, onClick, btnStyle,btnLabelStyle,navbar }) => {
    return (
        <button
            style={{ ...btnStyle }}
            className={`myBtn ${secondary ? 'secondary' : ''} ${navbar ? 'navbarBtn' : ''}`}
            onClick={onClick}
        >
            <div className="myBtn__label" style={{...btnLabelStyle}}>{label}</div>
        </button>
    );
};

export default Button;