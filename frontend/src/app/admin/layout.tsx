"use client";

import { Toaster } from "@/components/ui/toaster";
import { QueryProvider } from "../QueryProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <QueryProvider>
                <body>
                    <Toaster />
                    {children}
                </body>
            </QueryProvider>
        </html>
    );
}
