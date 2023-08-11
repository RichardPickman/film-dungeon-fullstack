import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { HealthBar } from '../../ui/HealthBar';
import { useDispatch, useSelector } from 'react-redux';
import { setNumber } from '@/store/reducers/creator';
import { RootState } from '@/store';

export const CurrentPlayerHealth = () => {
    const state = useSelector((state: RootState) => state.session);
    const dispatch = useDispatch();
    const hp = state.gameHealth;

    const onClick = (newHp: number) => dispatch(setNumber({ key: 'gameHealth', value: newHp }));

    return (
        <div className="flex flex-col w-full gap-4 items-center justify-between py-6">
            <div className="flex items-center gap-2 w-full justify-between">
                <Label>Здоровье игроков:</Label>
                <HealthBar>{state.gameHealth}</HealthBar>
            </div>
            <div className="flex items-center gap-2 w-full justify-center">
                <Button onClick={() => onClick(hp - 5)}>-5</Button>
                <Button onClick={() => onClick(hp - 1)}>-1</Button>
                <Button onClick={() => onClick(hp + 1)}>+1</Button>
                <Button onClick={() => onClick(hp + 5)}>+5</Button>
            </div>
        </div>
    );
};
