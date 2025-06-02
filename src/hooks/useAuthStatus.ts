import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";

export const useAuthStatus = () => {
  const [user, loading, error] = useAuthState(auth);
  return { user, loading, error };
};
