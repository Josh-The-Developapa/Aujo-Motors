import React, { useContext } from "react";
import "./DropDown.css";
import { NavLink } from "react-router-dom";
import Context from "../../Context/Context";

function DropDown(props) {
    const ctx = useContext(Context);

    return (
        <div>
            <div
                className="tsBG"
                onClick={() => {
                    ctx.setIsDropVal(false)
                }}
            ></div>
            <div className="dropdown">
                <h1>Aujo Motors</h1>
                <NavLink to="/home" >
                    <button className="btnn" onClick={() => {
                        ctx.setIsDropVal(false)
                    }}>Home</button>
                </NavLink>
                <form action='http://localhost:5000/v1/create-checkout-session' method="POST">
                    <button className="btnn" type="submit">Donate</button>
                </form>
                <NavLink to="/about">
                    <button className="btnn" onClick={() => {
                        ctx.setIsDropVal(false)
                    }}>About</button>
                </NavLink>
            </div>
        </div>
    );
}


export default DropDown;
