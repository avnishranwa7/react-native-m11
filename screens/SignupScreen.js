import { useContext, useState } from "react";
import { Alert } from "react-native";

import AuthContent from "../components/Auth/AuthContent";
import { createUser } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../store/auth-context";

function SignupScreen() {
  const { authenticate } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  async function signupHandler({ email, password }) {
    setLoading(true);
    try {
      const token = await createUser(email, password);
      authenticate(token);
    } catch (err) {
      setLoading(false);
      Alert.alert(
        "Signup failed!",
        "Could not log you in. Please check your input or try again later"
      );
    }
  }

  if (loading) return <LoadingOverlay message="Creating user..." />;

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
