import React from 'react';

function MainLayout({children}) {
    return (
        <div>
            <main>{children}</main>
        </div>
    );
}

export default MainLayout;
