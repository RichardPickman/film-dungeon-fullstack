interface Props {
    size?: number;
    color?: string;
}

export const Plus = ({ size = 12, color = '#000' }: Props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke={color}
            width={size}
            height={size}
        >
            <path
                fill={color}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
            />
        </svg>
    );
};
