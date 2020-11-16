// extrnal 
import React from "react";
import { Route, Switch, HashRouter } from "react-router-dom";
// internal
import Farm from "../containers/farm/Farm";
import Lot from "../containers/lot/Lot";
import LotWeight from "../containers/lotWeight/LotWeight";
import DrawerMenu from "../components/drawerMenu/DrawerMenu";

const Root = () => {
    return (
        <HashRouter>
            <Switch>
                <DrawerMenu>
                    <Route exact path="/" component={Farm}/>
                    <Route exact path="/lote" component={Lot}/>
                    <Route exact path="/calculo-peso" component={LotWeight}/>
                </DrawerMenu>
            </Switch>
        </HashRouter>
    )

}

export default Root;
