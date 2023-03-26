import React, { useState } from "react";
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText,
} from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { FaUserAlt, FaUsers } from "react-icons/fa";
import { MdAccessTimeFilled } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { HiOfficeBuilding } from "react-icons/hi";
import { useNavigate } from "react-router";

export const Navbar = () => {
  const navigate = useNavigate();
  return (
    <SideNav
      style={{ background: "#cdc6eb" }}
      onSelect={(selected) => {
        // Add your code here
      }}
    >
      <SideNav.Toggle />
      <SideNav.Nav>
        <NavItem
          eventKey="home"
          onClick={() => {
            navigate("/company");
          }}
        >
          <NavIcon style={{ opacity: "1" }}>
            <HiOfficeBuilding style={{ fill: "black" }} />
          </NavIcon>
          <NavText style={{ color: "black" }}>Company</NavText>
        </NavItem>
        <NavItem
          selected
          eventKey="charts"
          onClick={() => {
            navigate("/bill");
          }}
        >
          <NavIcon style={{ opacity: "1" }}>
            <MdAccessTimeFilled style={{ fill: "black" }} />
          </NavIcon>
          <NavText style={{ color: "black" }}>Buy</NavText>
        </NavItem>
        <NavItem selected eventKey="charts">
          <NavIcon style={{ opacity: "1" }}>
            <FaUsers style={{ fill: "black" }} />
          </NavIcon>
          <NavText style={{ color: "black" }}>Sell</NavText>
        </NavItem>
        <NavItem selected eventKey="charts">
          <NavIcon style={{ opacity: "1" }}>
            <BiLogOut style={{ fill: "black" }} />
          </NavIcon>
          <NavText style={{ color: "black" }}>Reports</NavText>
        </NavItem>
      </SideNav.Nav>
    </SideNav>
  );
};
