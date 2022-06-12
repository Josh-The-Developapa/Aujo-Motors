import React, { useContext } from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import DropDown from "../DropDown/DropDown";
import Context from "../../Context/Context";
import MenuIcon from '@mui/icons-material/Menu';


function Header(props) {
    const ctx = useContext(Context);

    return (
        <div>
            {ctx.isDrop ? (
                <DropDown
                />
            ) : (
                ""
            )}
            <div className="navBar">
                <MenuIcon onClick={() => {
                    ctx.setIsDropVal(true);
                    console.log(ctx.isDrop)
                }} className='Menu' />
                <h1 style={{ color: 'white', paddingLeft: '30px' }}>Aujo Motors</h1>
                <NavLink to="/home" className="popo">
                    Home
                </NavLink>
                <NavLink to="/about" className="btn-n">
                    About
                </NavLink >
                <form action='http://localhost:5000/v1/create-checkout-session' method="POST">
                    <button className="btn-n" type="submit" style={{ padding: "12.5px" }}>Donate</button>
                </form>
            </div>
        </div>
    );
}

export default Header;
