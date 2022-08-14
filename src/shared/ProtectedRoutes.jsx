import React, { useContext, useMemo } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";

function ProtectedRoute({ requiresLogin, component }) {
  const { loggedInUser } = useContext(UserContext);
  const redirect = useMemo(
    () => (requiresLogin ? "/login" : "/search"),
    [requiresLogin]
  );

  const authorized = useMemo(() => {
    return (requiresLogin && loggedInUser) || (!requiresLogin && !loggedInUser);
  }, [requiresLogin, loggedInUser]);

  return (
    <>
      {!authorized && <Navigate to={redirect} />}
      {authorized && <>{component}</>}
    </>
  );
}

export default ProtectedRoute;
