import { useEffect, useState } from "react";
import { useLoginMutation } from "../features/auth/authApi";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import styles from "../styles/auth.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token) || localStorage.getItem("token");


  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password }).unwrap();
      dispatch(setUser(response));
      navigate("/");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className={styles.authContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.inputField}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.inputField}
        />
        <a href="#" className={styles.forgotPassword}>Forgot password?</a>
        <button type="submit" className={styles.submitButton} disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
        <p className={styles.authFooter}>
          Don’t have an account? <Link to="/sign-up">Signup</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
