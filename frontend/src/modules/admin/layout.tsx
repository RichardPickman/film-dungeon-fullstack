import { QueryProvider } from '@/app/QueryProvider';
import { Toaster } from '@/components/ui/toaster';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body suppressHydrationWarning>
                <QueryProvider>
                    <Toaster />
                    {children}
                </QueryProvider>
            </body>
        </html>
    );
}
