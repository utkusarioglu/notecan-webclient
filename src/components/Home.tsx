import React, {useCallback, useState, useEffect} from "react";
import _ from "lodash";
import { Firestore } from "../context/firebase";

import { makeStyles, Toolbar } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import { Navigation } from "./Navigation";
import { UserMenu } from "./UserMenu";
import { Notepad } from "./Notepad";




interface HomeProps {}



const useStyles = makeStyles((theme) => ({
        root: {
            height: '100vh',
            backgroundImage: 'url(/home-bg.svg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor:
                theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
        },
        logo: {
                height: "34px",
        },
        grow: {
            flexGrow: 1,
        }
    }));


function Home(props: HomeProps): JSX.Element {

    const classes = useStyles();
    
    let screen_data = DEFAULT;
    const [screenContent, setScreenContent] = useState<any>(DEFAULT);
    const [pageId, setPageId] = useState<string>("test-page");
    const page = Firestore.collection("pages").doc(pageId);

    useEffect(() => {
        page.onSnapshot((snapshot) => {
            const page_update = snapshot.data();
            !_.isEqual(screen_data, page_update) && setScreenContent(page_update);
        });
    }, [pageId]);

    // TODO type needed here
    const saveData = useCallback((data: any) => {
      screen_data = data;
      page.set(data);
    },[pageId]);

    return (
        <>
            <AppBar position="fixed">
                <Toolbar>
                    <Navigation setPageId={setPageId}/>
                    <div className={classes.grow} />
                    <UserMenu />
                </Toolbar>
            </AppBar>
            <Notepad saveData={saveData} screenContent={screenContent}/>    
        </>
    )
}

export default Home
        
const DEFAULT = {
        "time": 1564767102436,
        "blocks": [
            {
                "type": "paragraph",
                "data": {
                    "text": "Page loading..."
                }
            },
        ],
        "version": "2.14.0"
    };
