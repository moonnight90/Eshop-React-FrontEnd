import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
const AuthLayout = ({ children, authenticated = true }) => {
  const is_login = useSelector((state) => state.auth.is_login);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    if (authenticated && authenticated !== is_login) {
      navigate("/login");
    } else if (!authenticated && authenticated !== is_login) {
      navigate("/");
    }
    setLoader(false);
  }, [is_login, navigate]);

  return loader ? <h1>Loading </h1> : <>{children}</>;
};

export default AuthLayout;


