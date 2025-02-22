function Button({ name, to }) {
    return (
        <a href={to}>
            <button>{name}</button>
        </a>
    );
}

export default Button;
