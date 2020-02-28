import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props: MenuProps) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles(theme => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

interface SectionLinkProps {
    main: JSX.Element | string,
    members?: IMemberProps[],
    openPage: (id: string) => void,
}

interface IMemberProps {
    title: string,
    pageId: string,
}

function SectionLink(props: SectionLinkProps): JSX.Element {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const buildMembers = (members?: IMemberProps[]): JSX.Element | null => {

        return (members && members.length > 0) 
            ? (
                <StyledMenu
                    id="customized-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    {
                        members.map((member, index) => 
                            (
                                <StyledMenuItem
                                    onClick={() => props.openPage(member.pageId)} 
                                    key={index}>
                                    <ListItemText primary={member.title} />
                                </StyledMenuItem>
                            ))

                    }
                </StyledMenu>
            )
            : null
    }

    return (
        <div>
            <Button
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="contained"
                // color="primary"
                onClick={handleClick}
            >
                {props.main}
            </Button>
            {buildMembers(props.members)}
        </div>
    );
}


export { 
    SectionLink,
}