import { useContext, useState } from "react";
import { Alert } from "react-native";

import AuthContent from "../components/Auth/AuthContent";
import { login } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../store/auth-context";

function LoginScreen() {
  const { authenticate } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  async function loginHandler({ email, password }) {
    setLoading(true);
    try {
      const token = await login(email, password);
      authenticate(token);
    } catch (err) {
      Alert.alert(
        "Authentication failed!",
        "Could not log you in. Please check your credentials or try again later"
      );
    }
    setLoading(false);
  }

  if (loading) return <LoadingOverlay message="Logging you in..." />;

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
