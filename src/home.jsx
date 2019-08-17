
import React from "react";
import pluginStore from "./global/DataStore";
import * as functions from "./global/functions";

const Home = () => (
    <div className='home'>
      <h1>Welcome</h1>
      <p>Available Plugins:</p>
      <ul>{functions.the_Plugins(pluginStore.getAll().registered.plugins)}</ul>
    </div>
  );

  export default Home;