import { NavLink } from "react-router-dom";
import { HeaderContainer } from "./styles";

const Header = () => {
 return (
  <HeaderContainer>
   <NavLink
    to={"/cart"}
    className={({ isActive, isPending }) =>
     isPending ? "pending" : isActive ? "active" : ""
    }
   >
    Cart
   </NavLink>
   <NavLink
    to={"/admin"}
    className={({ isActive, isPending }) =>
     isPending ? "pending" : isActive ? "active" : ""
    }
   >
    Admin
   </NavLink>
  </HeaderContainer>
 );
};

export default Header;
