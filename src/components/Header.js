import * as React from "react";
import "../styles/header.scss"

export default function Header(props)
{
    return(
        <header className="App-header">
            <img src={props.logoSrc} alt="logo" className="App-logo"></img>
            <h1 className="App-title"> {props.pageTitle}</h1>
        </header>
    );
};