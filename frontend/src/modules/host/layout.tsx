import { Toaster } from '@/components/ui/toaster';
import { StoreProvider } from '@/store/provider';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

const Layout = ({ children }: Props) => {
    return (
        <main>
            <Toaster />
            <StoreProvider>{children}</StoreProvider>
        </main>
    );
};
export default Layout;
