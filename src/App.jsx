import RoutesOfNavigation from "./routes/RoutesOfNavigation";
import LoginContext from "./context/LoginContext";
import { BrowserRouter } from "react-router";
import LoginState from "./context/LoginState";

export default function App() {
 
  return (
    <LoginState>
      <BrowserRouter>
        <RoutesOfNavigation/>
      </BrowserRouter>
    </LoginState>
  )
}
