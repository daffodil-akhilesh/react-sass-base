import React from "react";
import { Link } from "react-router-dom";
import routesPath from '../../Routes/routes';

const Home = (props) => {
  return (
    <div> <h1>Home</h1>
      <Link to={routesPath.LOGIN}><h2>LOGIN</h2></Link>
    </div>
  );
};

export default Home;
