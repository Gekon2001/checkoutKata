import { Route, Routes } from "react-router-dom";

import Admin from "./screens/Admin";
import Main from "./screens/Main";
import Cart from "./screens/Cart";

function App() {
 return (
  <Routes>
   <Route path="/" element={<Main />} />
   <Route path="/admin" element={<Admin />} />
   <Route path="/cart" element={<Cart />} />
  </Routes>
 );
}

export default App;
