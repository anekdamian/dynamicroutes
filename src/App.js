import React from 'react';
import './assets/css/App.css';
import ProjectForm from "./modules/core/forms/new-project-form";
import NewPostForm from "./modules/core/forms/new-post-form";
import ProjectLoop from "./modules/core/loops/project-loop";
import { Switch, Route } from "react-router-dom";
import pluginStore from "./global/DataStore";
import Navigation from "./components/MainNavigation";
import Home from "./home";
import PluginShell from "./modules/shell";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modules: {
        registered: pluginStore.getAll().registered.plugins,
        mounted: pluginStore.getAll().mounted
      }
    }
  }

  componentDidMount = () => {
    //we get elements list from any source to redux-store
            //this.props.getForms();
    //access redux-store to the list
            const forms = pluginStore.getAll().registered.plugins;
    //make deep object copy
            const updatedState = { ...this.state };
            updatedState.modules.mounted = [];
            if (forms) {
    //here is the very dynamic import magic: we map the import list and prepare to store the imports in Component`s state
                const importPromises = forms.map(p =>
                    import(`./modules/${p.path+'/'+p.file}`)
                        .then(module => {
                          pluginStore.mountPlugins(module.default)
                          updatedState.modules.mounted.push(module.default)
                        })
                )
    //wait till all imports are getting resolved
                Promise.all(importPromises)
                    .then(res =>
    //then run setState
                        this.setState({ ...updatedState }, () => {
                            //console.log(this.state);
                        }))
            }
        }

  render(){
    const forms = this.state.modules.registered;
    //we iterate through the modules and React.createElemet`s 
            const list = this.state.modules.mounted
                ? this.state.modules.mounted.map((e, i) =>
                    React.createElement(e, { key: forms[i].title }, null)
                )
                : [];
    return(
      <div className='App'>
      <Navigation />
      <Main />
      {console.log(pluginStore.getAll().mounted)}
      {/* {list.map(e => e)} */}
    </div>
    );
  }
}
export default App;


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modules: {
        registered: pluginStore.getAll().registered.plugins,
        mounted: pluginStore.getAll().mounted,
      }
    }
  }
  render(){

    return(
      <div>
        {/* {console.log(this.state.modules.mounted)} */}
  <Switch>
    {/* pluginStore.getAll().mounted.filter(obj => {return obj.data.name === item.component}) */}
    <Route exact path='/' component={Home}></Route>
    <Route exact path='/projectlist/:filter' component={ProjectLoop}></Route>
    <Route exact path='/newproject/:type/:id' component={ProjectForm}></Route>
    <Route exact path='/newpost/:type' component={NewPostForm}></Route>
    {/* <Route exact path='/ex/:component' component={PluginShell}></Route> */}
    {this.state.modules.registered.map(item => <Route exact path={item.path} component={item.Component}/>)}
  </Switch>
  </div>
    )
  }
};