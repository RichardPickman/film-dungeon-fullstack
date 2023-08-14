import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { CreatorContext } from '@/modules/admin/context';
import { RootState } from '@/store';
import { setBoolean, togglePause } from '@/store/reducers/creator';
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const Pause = () => {
    const state = useSelector((state: RootState) => state.session);
    const dispatch = useDispatch();
    const isPaused = state.isPaused;

    const toggle = () => dispatch(togglePause());

    if (isPaused) {
        return (
            <div className="flex items-center justify-center gap-2">
                <Label id="resume">Игра на паузе</Label>
                <Button
                    id="resume"
                    onClick={toggle}
                >
                    Возобновить
                </Button>
            </div>
        );
    }

    if (!isPaused) {
        return (
            <div className="flex items-center justify-center gap-2">
                <Label id="resume">Игра идет!</Label>
                <Button
                    id="resume"
                    onClick={toggle}
                >
                    Пауза
                </Button>
            </div>
        );
    }
};
