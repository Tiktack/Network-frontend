import React, { useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Outer } from './Dialogs.styled';
import { getDialogList } from '../../redux/actions/dialogList.action';
import AuthContext from '../../helpers/Context/AuthContext';

export default function Dialogs() {
  const auth = useContext(AuthContext);

  const dialogList = useSelector(state => state.dialogList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDialogList(auth.getAccessToken()));
  }, []);

  return (
    <div>
      <ul>
        {dialogList.map(x => (
          <li key={x.id}>
            <Link to={`/dialog/${x.id}`}>
              <Outer>{x.name}</Outer>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
