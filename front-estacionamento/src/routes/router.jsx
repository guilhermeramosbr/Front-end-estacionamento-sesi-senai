import { createBrowserRouter } from "react-router-dom";
import Home from "../containers/Home";
import Login from "../containers/login";
import Cadastro from "../containers/Cadastro";
import Acesso from "../containers/Acessos";

const router = createBrowserRouter([
  {
    path: "/",
    element:< Login/>
  },
  {
    path: "/home",
    element:< Home/>
  },
  {
    path: "/cadastro",
    element:< Cadastro/>
  },
  {
    path: "/acesso",
    element:< Acesso/>
  },

  
])

export default router;