import React, { useContext } from "react";
import { useLocation } from "react-router";
import "./Navbar.css";
import { useNavigate } from "react-router";
import { productContext } from "../../App";

const SidebarData = [
  {
    id: 1,
    title: "Home",
    path: "company",
    icon: "bx-wallet",
  },
  {
    id: 2,
    title: "Buy",
    path: "buy",
    icon: "bx-dollar-circle",
  },
  {
    id: 3,
    title: "Sell",
    path: "sell",
    icon: "bx-dollar-circle",
  },
  {
    id: 4,
    title: "All Data",
    path: "alldata",
    icon: "bx-file",
  },
];

export const Navbar = () => {
  const { setSearch, search } = useContext(productContext);
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      <div className="df-navbar-top-div">
        <div className="df-navbar-header-title">Diamond Management System</div>
        {/* <div>
          <input
            className="df-navbar-search"
            id="search"
            type="search"
            placeholder="Search..."
            autofocus
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              // setSearch(e.target.value);
            }}
          />
          
        </div> */}
        <input
          class="search__input"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            // setSearch(e.target.value);
          }}
          type="text"
          placeholder="Search..."
        />
      </div>

      <nav class="sidebar close">
        <div class="menu-bar">
          <div class="menu">
            <ul class="menu-links">
              {SidebarData.map((item, i) => {
                const active =
                  location.pathname.includes(`${item.path}`) && "selected";

                return (
                  <li class="nav-link" key={i}>
                    <div
                      // href={`${item.path}`}
                      className={`sidebar-button ${active}`}
                      onClick={() => {
                        navigate(`/${item.path}`);
                      }}
                    >
                      <i class={`bx ${item.icon} icon`}></i>
                      <span class="text nav-text">{item.title}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
