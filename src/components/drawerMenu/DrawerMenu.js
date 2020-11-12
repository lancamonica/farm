import React, {useState} from 'react';
import { AppBar, IconButton } from 'material-ui';
import Headline from 'material-ui/svg-icons/action/view-headline';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

function DrawerMenu({children}) {
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);


    return (
        <>
            <AppBar
                title="Premix"
                iconElementLeft={
                    <IconButton
                        onClick={() => setIsOpenDrawer(true)}
                        // iconStyle={iconStyle}
                        // style={iconStyle}
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
                <MenuItem onClick={() => {}}>Menu Item</MenuItem>
                <MenuItem onClick={() => {}}>Menu Item 2</MenuItem>
                <MenuItem onClick={() => {}}>Menu Item 3</MenuItem>
            </Drawer>
            {children}
        </>
        
    )
}
  
export default DrawerMenu;