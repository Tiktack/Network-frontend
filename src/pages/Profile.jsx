import React, { useContext, useEffect } from 'react';

import HttpClient from '../services/helpers/HttpClient';
import AuthContext from '../helpers/Context/AuthContext';

const Profile = () => {
  const auth = useContext(AuthContext);
  const getInfo = async () => {
    const client = new HttpClient(auth.getAccessToken());
    const result = await client.call('http://10.26.7.68:4000/api/user/getUserInfo').then(x => console.log(x.json()));
    console.log(result.json());
  };

  useEffect(() => {
    getInfo();
  });
  return <div>easy</div>;
};

export default Profile;
