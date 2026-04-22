'use client'
import React from 'react';
import {Button} from "./ui/button";
import {toast} from "sonner";

function Test(props) {

    const handleClick = (mode) => {
        mode ? toast.success("Success") : toast.error("Error");

    }

    return (
        <div>
            <Button onClick={() => handleClick(false)}>Click me</Button>
        </div>
    );
}

export default Test;
