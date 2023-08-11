'use client';

import { Questions } from '@/modules/admin/elements/ui/Questions';
import { Provider } from './context';
import { ControlsMenu } from './elements/controls';
import { InstanceInformation } from './elements/information';

const Page = () => {
    return (
        <Provider>
            <div className="flex w-screen h-screen mx-auto gap-4">
                <div className="w-2/12">
                    <InstanceInformation />
                </div>
                <div className="w-full h-full overflow-y-auto flex flex-col gap-4 py-4">
                    <Questions />
                </div>
                <div className="w-2/12">
                    <ControlsMenu />
                </div>
            </div>
        </Provider>
    );
};

export default Page;
