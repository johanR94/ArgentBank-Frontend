import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../actions/login.actions";
import Form from "../components/Form";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.login?.error);
  const token = useSelector((state) => state.login?.token);
  const [rememberMe, setRememberMe] = React.useState(false);
  const handleLogin = (formData) => {
    const { email, password } = formData;
    dispatch(login(email, password, rememberMe));
  };

  // Redirigez vers la page de profil si le token est défini
  React.useEffect(() => {
    if (token && window.location.pathname !== "/profile") {
      navigate("/profile");
    }
  }, [token]);
  const fields = React.useMemo(
    () => [
      { name: "email", type: "email", label: "Email" },
      { name: "password", type: "password", label: "Password" },
    ],
    []
  );
  const handleRememberMe = (e) => {
    setRememberMe(e.target.checked);
  };
  return (
    <div className="sign-in-content">
      <h1>Sign In</h1>
      <Form fields={fields} onSubmit={handleLogin} buttonText="Sign In">
        <div className="input-remember">
          <input
            type="checkbox"
            id="remember-me"
            checked={rememberMe}
            onChange={handleRememberMe}
          />
          <label htmlFor="remember-me">Remember me</label>
        </div>
      </Form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
