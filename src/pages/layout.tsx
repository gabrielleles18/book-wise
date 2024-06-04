import StyledComponentsRegistry from '../lib/registry'
import React from "react";

export default function RootLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <StyledComponentsRegistry>
            {children}
        </StyledComponentsRegistry>
    )
}
