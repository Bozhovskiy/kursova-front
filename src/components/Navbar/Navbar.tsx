import './Navbar.css';
import Button from "../Button/Button";
import React from "react";

interface INavbar {
    openModal: () => void
    openModalReport: () => void
}

const Navbar: React.FC<INavbar> = ({openModal, openModalReport}) => {

    return (
        <div className="navbar">
            <div style={{display:'flex',flexDirection:'row',gap:16}}>
                <h4 style={{color:'#272727',cursor:'pointer'}} onClick={() => {
                    window.location.href = '/'
                }}>Потяги</h4>
                <h4 style={{color:'#272727',cursor:'pointer'}} onClick={() => {
                    window.location.href = '/reports'
                }}>Звіти</h4>
            </div>
            <div style={{display:'flex',flexDirection:'row',gap:16}}>
                <Button onClick={openModal} navbar={true} label="Додати потяг"/>
                <Button onClick={openModalReport} navbar={true} label="Сформувати звіт"/>
            </div>
        </div>
    );
}

export default Navbar;
