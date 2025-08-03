import type { ButtonProps } from "../ui"

const Button = ({onClick, children, classname}:ButtonProps) => {
    return (
        <>
        <button className={classname} onClick={onClick}>{children}</button>
        </>
    )
}

export default Button