import React from "react";
import { Route, Switch, HashRouter } from "react-router-dom";
import Farm from "../containers/farm/Farm";
import Lot from "../containers/lot/Lot";
import DrawerMenu from "../components/drawerMenu/DrawerMenu";



const Root = () => {
    return (
        <HashRouter>
            <Switch>
                <DrawerMenu>
                    <Route exact path="/" component={Farm}/>
                    <Route exact path="/lote" component={Lot}/>
                </DrawerMenu>
            </Switch>
        </HashRouter>
    )

}

export default Root;
