import { createBrowserRouter } from "react-router-dom";
import Home from "../containers/Home";
import Login from "../containers/Login";
import Cadastro from "../containers/Cadastro";
import Acesso from "../containers/Acessos";
import Usuarios from "../containers/Usuarios";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/home",
    element: <Home />
  },
  {
    path: "/cadastro",
    element: <Cadastro />
  },
  {
    path: "/acessos", // Corrigido aqui
    element: <Acesso />
  },
  {
    path: "/usuarios",
    element: <Usuarios />
  },
]);

export default router;