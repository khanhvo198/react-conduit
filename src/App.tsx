import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import "./App.css";
import { getUser } from "./services/user.service";
import { CONDUIT_TOKEN, CONDUIT_USER } from "./shared/constants";
import { useAuthStore } from "./shared/data-access/auth.store";


function App() {
  const { setUser } = useAuthStore()
  const token = localStorage.getItem(CONDUIT_TOKEN);
  console.log(token)
  const { data } = useQuery({ queryKey: ["auth"], queryFn: getUser, enabled: !!token })

  if (data) {
    setUser(data.user, true);
    localStorage.setItem(CONDUIT_TOKEN, data.user.token)
    localStorage.setItem(CONDUIT_USER, JSON.stringify(data.user))
  }

  return (
    <Outlet />
  )
}

export default App;
