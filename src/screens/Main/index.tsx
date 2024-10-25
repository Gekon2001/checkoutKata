import { useNavigate } from "react-router-dom";

import { MainContainer, Button } from "./styles";

const Admin = () => {
 const navigate = useNavigate();
 return (
  <MainContainer>
   <Button onClick={() => navigate("/cart")}>Cart</Button>
   <Button onClick={() => navigate("/admin")}>Admin</Button>
  </MainContainer>
 );
};

export default Admin;
