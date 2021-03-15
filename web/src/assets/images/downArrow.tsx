import * as React from 'react';

interface ArrowDownProps {
    className?: string;
    onClick?: (e?: any) => void;
}

export const ArrowDown: React.FC<ArrowDownProps> = (props: ArrowDownProps) => {
    return (
        <svg onClick={props.onClick} className={props.className} width="15" height="34" viewBox="0 0 15 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M9 29.1084L13.2375 25L15 26.7126L7.5 34L0 26.7126L1.7625 25L6 29.1084V0H9V29.1084Z" fill="var(--primary-cta-color)"/>
        </svg>
    );
};
