import { MonsterInfo } from '@/components/About';
import { Header } from '../Header';

interface Props {
    monster: Monster;
    refetch: () => void;
    bossId?: number;
}

export const MonsterInformation = ({ monster, bossId, refetch }: Props) => {
    return (
        <div className="w-2/12">
            <div className="flex flex-col">
                <Header text="Монстр" />
                <div className="m-2">
                    <MonsterInfo
                        monster={monster}
                        bossId={bossId}
                        refetch={refetch}
                    />
                </div>
            </div>
        </div>
    );
};
