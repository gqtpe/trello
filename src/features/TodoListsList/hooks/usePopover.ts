import React from "react";

export const usePopover = () => {

    const [anchorEl, setAnchorEl] = React.useState<SVGSVGElement | null>(null);

    const handleClick = (event: React.MouseEvent<SVGSVGElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return {handleClick, anchorEl, open, handleClose}
}