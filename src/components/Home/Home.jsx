import React, { useContext } from 'react';
import AuthContext from '../../helpers/Context/AuthContext';

export default function Home() {
  const auth = useContext(AuthContext);
  const { isAuthenticated } = auth;
  return (
    <div className="container">
      {isAuthenticated() && (
        <h4>
          You are logged in!
          {auth.getIdToken()}
        </h4>
      )}
    </div>
  );
}
