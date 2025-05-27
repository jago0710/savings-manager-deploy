import { onSignOut } from "../firebase/auth";

export default function closeSession() {
    window.location.href = "/";
    onSignOut()
  }  