import React from 'react';
import Image from 'next/image';
import logo from '@/public/next.svg';
import {cn} from "../lib/utils";

const Logo = ({className = ""}) => {
    return (
        <div>
            <Image className={cn("max-w-[100px]", className)} src={logo} alt="logo"/>
        </div>
    );
};

export default Logo;
