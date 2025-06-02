import RoutesOfNavigation from "./routes/RoutesOfNavigation";
import LoginContext from "./context/LoginContext"; // --> También es valido para utilizar el context
import { BrowserRouter } from "react-router";
import LoginState from "./context/LoginState";
import { PrimeReactProvider} from "primereact/api"

export default function App() {
 

  return (
    <PrimeReactProvider>
      <LoginState>
        <BrowserRouter>
          <RoutesOfNavigation/>
        </BrowserRouter>
      </LoginState>
    </PrimeReactProvider>
  )
}
