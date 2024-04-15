import React, {useEffect, useState} from 'react';
import toast, { Toaster, useToasterStore } from "react-hot-toast";
import Navbar from "./components/Navbar/Navbar";
import { Main, Train } from "./pages";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import {Modal, ModalReport} from "./components";

function App() {
    const { toasts } = useToasterStore();

    useEffect(() => {
        toasts
            .filter((t) => t.visible)
            .filter((_, i) => i >= 3)
            .forEach((t) => toast.dismiss(t.id));
    }, [toasts]);
    const [modal,setModal]=useState(false);
    const [modalReport,setModalReport]=useState(false);
    const openModal=()=>{setModal(true)}
    const closeModal=()=>{setModal(false)}
    const openModalReport=()=>{setModalReport(true)}
    const closeModalReport=()=>{setModalReport(false)}
    return (
        <div className={modal?"bg no-scroll":"bg"}>
            <BrowserRouter>
                <Navbar openModal={openModal} openModalReport={openModalReport} />
                {modal&&<Modal closeModal={closeModal}/>}
                {modalReport&&<ModalReport closeModal={closeModalReport}/>}
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/train/:id" element={<Train />} />
                </Routes>
                <Toaster />
            </BrowserRouter>
        </div>
    );
}

export default App;
