import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  // only for validate jwt
  // const { setAuthState } = useAuthStore()
  // useEffect(() => {
  //   const token = localStorage.getItem(CONDUIT_TOKEN)
  //   setAuthState(undefined, false)
  // }, [])


  return (
    <Outlet />
  )
}

export default App;
