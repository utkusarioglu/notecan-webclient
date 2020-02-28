import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";

import { SectionLink } from "./SectionLink";
import {AuthContext} from "../context/Auth"
import {Firestore} from "../context/firebase";


interface NavigationProps {
    setPageId: (page_id: string) => void,
}

interface ITree {
    page_id?: string,
    title: string,
    children?: Array<ITree>
}

interface INavItemMember {
    title: string
}

const useStyles = makeStyles((theme) => ({
    logo: {
        height: "34px",
    }
}));





function Navigation(props: NavigationProps): JSX.Element {

    const classes = useStyles();
    const auth = useContext(AuthContext);
    const uid = auth.currentUser?.uid

    const LOGO_NAV = {
        main: (
            <img 
                src="/logo.svg"
                alt="NoteCan logo"
                className={classes.logo} />
        ),
        members: [
            {
                title: "something"
            },
            {
                title: "something 2"
            }
        ]
    };
    const INIT_NAV = [
        LOGO_NAV,
        {
            main: "...",
            members: [],
        }
    ];


    const [navItems, setNavItems] = useState<any[]>(INIT_NAV);

    console.log("nawitems", navItems)

    useEffect(() => {
        Firestore.collection("trees").doc(uid).onSnapshot((snapshot) => {
            const data = snapshot.data();
            const members: INavItemMember[] | undefined = data?.children?.map((child: ITree) => {
                return {
                    title: child.title,
                    pageId: child.page_id,
                }
            })
            if(members && members.length > 0) {
                
                setNavItems([LOGO_NAV, {
                    main: "...",
                    members,
                }])
            }
        });
    }, []);
    
    return (
        <Breadcrumbs aria-label="breadcrumb">
            {navItems.map((item) => 
                <SectionLink 
                    key={item.pageId} 
                    main={item.main} 
                    members={item.members} 
                    openPage={(id: string) => props.setPageId(id)}
                    />
            )}
        </Breadcrumbs>
    )
}

export {
    Navigation,
}