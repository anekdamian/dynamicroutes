import React from 'react';
import {NavLink, Link} from 'react-router-dom';
import dispatcher from "../dispatcher";

export function the_Navigation(data){
    return data.map((item) =>
    <li><NavLink key={item.path} exact to={`/${item.path}`}>{item.display}</NavLink></li>
    );
  };


  export function the_PluginNavigation(data){
    return data.map((item) =>
    <li><Link key={item.path} exact to={`/${item.path}`}>{item.display}</Link></li>
    );
  };
  
export function the_Plugins(object) {
    return object.map((item, key) =>
      <li key={item.path} className={item.path}>{item.display}</li>
    );
}
  