import {
    ContextMenu,
    ContextMenuCheckboxItem,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuRadioGroup,
    ContextMenuRadioItem,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
    className: string;
    onDelete: () => void;
}

export function DeleteContextMenu({ children, className, onDelete }: Props) {
    return (
        <ContextMenu>
            <ContextMenuTrigger className={className}>{children}</ContextMenuTrigger>
            <ContextMenuContent className="w-64">
                <ContextMenuItem
                    inset
                    onClick={onDelete}
                >
                    Удалить
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    );
}
