import * as React from "react"

interface AttentionIconProps {
  className?: string;
}

const Attention: React.FC<AttentionIconProps> = (props: AttentionIconProps) => {
    return (
        <svg
            width={72}
            height={72}
            viewBox="0 0 72 72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={props.className}
        >
            <path
                d="M36 57.6c-11.907 0-21.6-9.693-21.6-21.6 0-11.907 9.693-21.6 21.6-21.6 11.907 0 21.6 9.693 21.6 21.6 0 11.907-9.693 21.6-21.6 21.6zM36 9a27 27 0 100 54.002A27 27 0 0036 9z"
                fill="var(--system-red)"
            />
            <path
                d="M33.3 44.1h5.4v5.4h-5.4v-5.4zM33.3 22.5h5.4v16.2h-5.4V22.5z"
                fill="var(--system-red)"
            />
        </svg>
    )
}

export default Attention
