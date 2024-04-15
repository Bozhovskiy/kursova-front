import './Navbar.css';
import Button from "../Button/Button";
import React from "react";
interface INavbar {
    openModal: ()=>void
    openModalReport: ()=>void
}
const Navbar: React.FC<INavbar>  = ({openModal,openModalReport}) => {

    return (
        <div className="navbar">
            <Button onClick={openModal} navbar={true} label="Добавити потяг"/>
            <Button onClick={openModalReport} navbar={true} label="Сформувати звіт"/>
        </div>
    );
}

export default Navbar;
