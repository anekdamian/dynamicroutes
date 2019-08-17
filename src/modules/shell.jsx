import React, {Suspense}from "react";
import pluginStore from "../global/DataStore";
import * as functions from "../global/functions";

class PluginShell extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        modules: {
          registered: pluginStore.getAll().registered.plugins,
          mounted: pluginStore.getAll().mounted,
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
                        import(`./${p.path+'/'+p.file}`)
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
        const filterParams = this.props.match.params['component'];

        const forms = this.state.modules.registered;
        //we iterate through the modules and React.createElemet`s 
        const list = this.state.modules.mounted
            ? this.state.modules.mounted.map((e, i) =>
                React.createElement(e, { key: forms[i].title }, null)
            )
            : [];

        return(
            <div className='home'>
                <p>{filterParams}</p>

                {list.map(e => e)}

            {console.log(this.state.modules.registered)}
            </div>
        )
    }

}
  export default PluginShell;