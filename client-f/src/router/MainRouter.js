import React from "react";
import { Routes, Route } from "react-router";
import Home from "../page/Home";
import NavbarHeader from "../components/Navbar/NavbarHeader";
import CreateUserList from "../page/CreateUserList";
import Viewdetails from "../page/Viewdetails";
import Usereditbyid from "../page/Usereditbyid";

const MainRouter = () => {
  return (
    <>
      <NavbarHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-user-list" element={<CreateUserList />} />
        <Route path="/user-edit-paege/:id" element={<Usereditbyid />} />
        <Route path="/view-details/:id" element={<Viewdetails />} />
      </Routes>
    </>
  );
};

export default MainRouter;
