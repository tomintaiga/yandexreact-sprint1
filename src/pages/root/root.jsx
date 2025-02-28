import React from "react";
import AppHeader from "../../components/app-header/app-header";
import curStyle from "./root.module.css";

const Root = ({children}) => {
    return (
        <div className={curStyle.root_div}>
            <AppHeader />
            { children }
        </div>
    )
}

export default Root;