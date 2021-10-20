import {NavDropdown} from "react-bootstrap";
import React, { Component } from "react";

class Auth extends Component {
    render() {
        return (
            <span>
                <NavDropdown expand="lg" bg="light" variant="light" id="basic-nav-dropdown" href={"/profile"} title={"Mark Otto"}>
                    <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/signout">Sign Out</NavDropdown.Item>
                </NavDropdown>
            </span>

        );
    }
}

export default Auth;
