import React from "react";
import { Route, Switch, HashRouter } from "react-router-dom";
import Farm from "../containers/farm/Farm";
import DrawerMenu from "../components/drawerMenu/DrawerMenu";



const Root = () => {
    return (
        <HashRouter>
            <Switch>
                <DrawerMenu>
                    <Route exact path="/" component={Farm}/>
                </DrawerMenu>
            </Switch>
        </HashRouter>
    )

}

export default Root;
