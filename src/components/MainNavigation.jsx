import React from "react";
import * as functions from "../global/functions";
import {globalData} from  "../global/importer";
import pluginStore from "../global/DataStore";

const Navigation = () => (
    <nav>
      <ul className="mainNav">
        {functions.the_Navigation(globalData.mainNav)}
        {functions.the_Navigation(pluginStore.getAll().registered.plugins)}
      </ul>
      <div className="clearfix"></div>
    </nav>
  );

export default Navigation;