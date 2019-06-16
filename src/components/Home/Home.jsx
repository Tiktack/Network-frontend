import React, { useContext } from 'react';
import AuthContext from '../../helpers/Context/AuthContext';

export default function Home() {
  const auth = useContext(AuthContext);
  return (
    <div className="container">
      <h4>
        You are logged in!
        {auth.getAccessToken()}
      </h4>
    </div>
  );
}
