import  { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext"

const ProtectedRoute = ({ element }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate(); 

  useEffect(() => {
    if (!user) {
      navigate("/login"); 
    }
  }, [user, navigate]);

  return user ? element : null; 
};

export default ProtectedRoute;
