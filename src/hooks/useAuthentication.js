import { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthContext from '../helpers/Context/AuthContext';
import { loginWithAccessToken, loginWithExternals } from '../redux/actions/autentication.action';

const useAuthentication = () => {
  const router = useSelector(state => state.router);
  const auth = useContext(AuthContext);
  const dispatch = useDispatch();

  const loginWithAuth = () => {
    const auth0 = auth.getAuth();
    auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken) {
        auth.setSession(authResult);
        dispatch(loginWithExternals(authResult.accessToken));
      } else throw new Error(err);
    });
  };

  useEffect(() => {
    if (router.location.pathname.includes('callback')) {
      if (/access_token|error/.test(router.location.hash)) {
        loginWithAuth();
      }
    } else {
      const token = localStorage.getItem('token');
      if (token !== '' && token !== null) {
        dispatch(loginWithAccessToken(token));
      }
    }
  }, []);
};

export default useAuthentication;
