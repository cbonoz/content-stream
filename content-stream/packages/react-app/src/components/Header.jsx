import { PageHeader } from "antd";
import React from "react";
import { APP_SUBTITLE } from "../util/constants";
import logo from "./../assets/contentstream_logo.png";

// displays a page header

export default function Header() {
  return (
    <a href="#" target="_blank" rel="noopener noreferrer">
      <PageHeader
        title={
          <span>
            <img src={logo} className="nav-logo" />
          </span>
        }
        subTitle={APP_SUBTITLE}
        style={{ cursor: "pointer" }}
      />
    </a>
  );
}
