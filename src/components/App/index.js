import React from "react";
import { Route, Routes } from 'react-router-dom';
import routes from "../../Routes";
import './App.scss';

const App = () => (
    <Routes>
      {
        routes.map((route, index) => {
          const { path, element: Element, exact } = route;
          return (<Route path={path} element={<Element />} key={index} exact={exact} />);
        })
      }
    </Routes>
);

export default App;