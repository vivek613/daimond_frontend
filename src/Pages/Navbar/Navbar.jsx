import React, { useState } from "react";
import { useLocation } from "react-router";
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
import { useNavigate } from "react-router";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <div className="df-navbar-top-div">
        <div className="df-navbar-header-title">Diamond Management System</div>
      </div>
      <SideNav
        style={{
          background: "#ededed",
          top: "55px",
          borderRight: "1px solid #cbcbcb",
        }}
        onSelect={(selected) => {
          // Add your code here
        }}
      >
        <SideNav.Nav className="df-side-bar-main-menu">
          <NavItem
            eventKey="home"
            onClick={() => {
              navigate("/company");
            }}
            className={
              location.pathname.includes("company")
                ? "df-normal-icon-selected"
                : "df-normal-icon"
            }
          >
            <NavIcon style={{ opacity: "1" }}>
              <div className="df-title-icon-sidebar">
                <div className="df-side-bar-icon">
                  <MdAccessTimeFilled style={{ fill: "black" }} />
                </div>
                <p className="df-side-bar-title">Company</p>
              </div>
            </NavIcon>
          </NavItem>
          <NavItem
            selected
            eventKey="charts"
            className={
              location.pathname.includes("buy")
                ? "df-normal-icon-selected"
                : "df-normal-icon"
            }
          >
            <NavIcon
              style={{ opacity: "1" }}
              onClick={() => {
                navigate("/buy");
              }}
            >
              <div className="df-title-icon-sidebar">
                <div className="df-side-bar-icon">
                  <MdAccessTimeFilled style={{ fill: "black" }} />
                </div>
                <p className="df-side-bar-title">Buy</p>
              </div>
            </NavIcon>
          </NavItem>
          <NavItem
            selected
            eventKey="charts"
            onClick={() => {
              navigate("/sell");
            }}
            className={
              location.pathname.includes("sell")
                ? "df-normal-icon-selected"
                : "df-normal-icon"
            }
          >
            <NavIcon style={{ opacity: "1" }}>
              <div className="df-title-icon-sidebar">
                <div className="df-side-bar-icon">
                  <FaUsers style={{ fill: "black" }} />
                </div>
                <p className="df-side-bar-title">Sell</p>
              </div>
            </NavIcon>
          </NavItem>
          <NavItem
            selected
            eventKey="charts"
            onClick={() => {
              navigate("/company");
            }}
            className={
              location.pathname.includes("reports")
                ? "df-normal-icon-selected"
                : "df-normal-icon"
            }
          >
            <NavIcon style={{ opacity: "1" }}>
              <div className="df-title-icon-sidebar">
                <div className="df-side-bar-icon">
                  <BiLogOut style={{ fill: "black" }} />
                </div>
                <p className="df-side-bar-title">Reports</p>
              </div>
            </NavIcon>
          </NavItem>
        </SideNav.Nav>
      </SideNav>
    </>
  );
};
