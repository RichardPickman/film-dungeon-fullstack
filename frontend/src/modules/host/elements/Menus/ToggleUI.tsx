import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RootState } from '@/store';
import { toggleUi } from '@/store/reducers/creator';
import { useDispatch, useSelector } from 'react-redux';

export const ToggleUserInterface = () => {
    const state = useSelector((state: RootState) => state.session);
    const dispatch = useDispatch();
    const isHidden = state.isUiHidden;

    const toggle = () => dispatch(toggleUi());

    if (isHidden) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 text-center">
                <Label id="resume">Интерфейс скрыт!</Label>
                <Button
                    id="resume"
                    onClick={toggle}
                >
                    Показать интерфейс
                </Button>
            </div>
        );
    }

    if (!isHidden) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 text-center">
                <Label id="resume">Интерфейс не скрыт!</Label>
                <Button
                    id="resume"
                    onClick={toggle}
                >
                    Скрыть интерфейс
                </Button>
            </div>
        );
    }
};
