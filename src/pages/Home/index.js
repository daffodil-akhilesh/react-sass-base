import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import LeftArrowIcon from '@react-fe-core/fe-ui-core/packages/SvgIcons/LeftArrowIcon';

import routesPath from '../../Routes/routes';
import { setUserDetails } from "../../utils";
import { getUserDetails } from "../../store/modules/userDetails";

const Home = (props) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.userDetails.isLoading);
  const isUserFetched = useSelector((state) => state.userDetails.isUserFetched);
  const firstName = useSelector((state) => state.userDetails.firstName);
  const lastName = useSelector((state) => state.userDetails.lastName);
  const email = useSelector((state) => state.userDetails.email);

  useEffect(() => {
    setUserDetails();
    !isUserFetched && getUserDetails()(dispatch);
  }, []);

  return (
    <div> <h1>Home</h1>
      <Link to={routesPath.LOGIN}><h2>LOGIN</h2></Link>
      <LeftArrowIcon height="60px" width="60px" color="blue" />
      {isLoading && <div>Loading</div>}
      {isUserFetched && (<div><h1>{firstName}</h1><h2>{lastName}</h2><h2>{email}</h2></div>)}
    </div>
  );
};

export default Home;
