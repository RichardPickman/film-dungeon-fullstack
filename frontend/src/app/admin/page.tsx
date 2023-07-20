'use client';

import { Plus } from '@/assets/icons/plus';
import { Card } from '@/components/Card';
import { RootState } from '@/store';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    addBoss,
    addQuestion,
    removeDungeon,
    removeBoss,
    removeQuestion,
} from '@/store/reducers/creator';
import { Dungeons } from './elements/Dungeons';
import { Button } from '@/components/ui/button';

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

const Page = () => {
    const { dungeons } = useSelector((state: RootState) => state.creator);
    const dispatch = useDispatch();
    const [id, setId] = useState(0);

    const [bossIndex, setBossIndex] = useState(0);
    const [currentBoss, setCurrentBoss] = useState();

    return (
        <div className="flex flex-col w-full h-full">
            <div className="flex flex-col gap-4 max-w-5xl w-full mx-auto">
                {/* Dungeons */}
                <Dungeons />
                {/* Dungeon items */}
                <div className="flex flex-nowrap w-full h-32 gap-2 justify-center">
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </div>
                {/* Current dungeon question */}
                <div className="flex flex-nowrap w-full h-32 gap-2 justify-center">
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </div>
            </div>
        </div>
    );
};
export default Page;
