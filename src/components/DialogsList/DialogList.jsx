import React, { useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Outer } from './DialogList.styled';
import { getDialogList } from '../../redux/actions/dialogList.action';
import AuthContext from '../../helpers/Context/AuthContext';

function DialogList(props) {
  const auth = useContext(AuthContext);

  useEffect(() => {
    props.getDialogList(auth.getAccessToken());
  }, []);

  return (
    <div>
      <ul>
        {props.dialogList.map(x => (
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


const mapStateToProps = state => ({
  dialogList: state.dialogList
});

const mapDispatchToProps = { getDialogList };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DialogList);
