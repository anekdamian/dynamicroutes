import React from "react";
import {EventEmitter} from "events";
import Dispatcher from "../dispatcher";
import dispatcher from "../dispatcher";

// function keyMaker(name){
//     var keyPrimitive = name.substring(0, 3);
//     var keySearch = this.state.projectDataArray.filter(obj => {
//         return obj.key === keyPrimitive
//       })[0];
//     if (keySearch.lenght !== 0){
//         var finalKey = keyPrimitive+"1";
//     } else {
//         var finalKey = keyPrimitive+(keySearch.lenght+1);
//     }
//     console.log(finalKey);
// }

class PluginStore extends EventEmitter{
    constructor(){
        super()
        this.plugins = {
          registered: require('../modules/manifest.json'),
          mounted: []
        }
    }
    mountPlugins(data){
      this.plugins.mounted.push({
        data
      });
      //console.log(this.plugins.mounted);
      this.emit("change");
    }
    getAll(){
        return this.plugins;
    }

    handleActions(action){
      console.log("Plugins Mounted", action)
    }
}

const pluginStore = new PluginStore;
export default pluginStore;
dispatcher.register(pluginStore.handleActions.bind(pluginStore));

class ProjectStore extends EventEmitter{
    
    constructor(){
        super()
        this.projects = require('../cache/projects.json');
    }
    
    createProject(data){
        this.projects.push({
            type: "project",
            id: Date.now(),
            key: "TES-1",
            properties: {
              title: data.title,
              address: data.address,
              city: data.city,
              state: data.state,
              zip: data.zip,
              country: "USA",
              components:[
                {
                  id: "234",
                  name: "plumbing"
                },
                {
                  id:"564",
                  name:"carpentry"
                },
                {
                  id:"289",
                  name:"legal"
                },
                {
                  id:"902",
                  name:"management"
                }
              ],
              tags:[
                {
                  id:"239",
                  name:"newtag"
                },
                {
                  id:"324",
                  name:"newtag"
                },
                {
                  id:"124",
                  name:"newtag"
                },
                {
                  id:"984",
                  name:"newtag"
                }                        
              ]
            },
            workflow: {
              status:[
                {
                name:data.status,
                display: data.status
                }
              ]
            },
            management: {
              projectManager: {
                name: data.projectManager,
                id: data["projectManager-id"]
              },
              contractor: {
                name: data.contractor,
                id: data["contractor-id"]
              },
              client: {
                name: data.client,
                id: data["client-id"]
              }
            }
          });
        
        this.emit("change");
    }

    getAll(){
        return this.projects;
    }
}

export const projectStore = new ProjectStore;


class AccountStore extends EventEmitter{
    constructor(){
        super()
        this.accounts = require('../cache/accounts.json');
    }

    getAll(){
        return this.accounts;
    }
}

export const accountStore = new AccountStore;