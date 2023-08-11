import { cn } from '@/lib/utils';

export const Header = ({ text, className }: { text: string; className?: string }) => (
    <div className={cn('w-full', className)}>
        <h2 className="text-lg text-center">{text}</h2>
    </div>
);
