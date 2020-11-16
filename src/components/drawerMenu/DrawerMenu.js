// external
import React, {useState, useEffect} from 'react';
import { AppBar, IconButton } from 'material-ui';
import Headline from 'material-ui/svg-icons/action/view-headline';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Redirect } from 'react-router-dom';

function DrawerMenu({children}) {
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [route, setRoute] = useState('');
    const [isRedirect, setIsRedirect] = useState(false);

    useEffect(() => {
        if(isRedirect) {
            setIsOpenDrawer(false);
            setIsRedirect(false);
        }
        
    }, [isRedirect])

    function redirectRoute(param) {
        setRoute(param);
        setIsRedirect(true);
    }


    return (
        <>
        { isRedirect ? <Redirect to={route}/> : null}
            <AppBar
                title="Premix"
                iconElementLeft={
                    <IconButton
                        onClick={() => setIsOpenDrawer(true)}
                    >
                        <Headline/>
                    </IconButton>
                  }
            />
            <Drawer
                docked={false}
                width={200}
                containerStyle={{marginTop: 50}}
                open={isOpenDrawer}
                onRequestChange={() => setIsOpenDrawer(false)}
                >
                <MenuItem onClick={() => redirectRoute("/")}>Fazenda</MenuItem>
                <MenuItem onClick={() => redirectRoute("/lote")}>Lote</MenuItem>
                <MenuItem onClick={() => redirectRoute("/calculo-peso")}>Pesagem</MenuItem>
            </Drawer>
            {children}
        </>
        
    )
}
  
export default DrawerMenu;