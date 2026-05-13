// Campo di ricerca riutilizzabile della hero con label e dropdown.
// Riceve i suggerimenti come children per rimanere generico.
function HeroSearchField({
    id,
    icon,
    label,
    value,
    inputClassName = "form-control custom-rounded",
    active,
    children,
    onFocus,
    onBlur,
    onChange,
}) {
    return (
        <div className="form-floating flex-fill position-relative">
            <input
                className={inputClassName}
                type="search"
                id={id}
                placeholder=" "
                value={value}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={onChange}
                autoComplete="off"
            />

            <label htmlFor={id}> <i className={`bi ${icon}`}></i> {label}</label>

            {active && children && (
                <div
                    className="hero-search-results position-absolute top-100 start-0 end-0 bg-white text-start shadow rounded-3 mt-2 overflow-hidden"
                    onMouseDown={(e) => e.preventDefault()}
                >
                    {children}
                </div>
            )}
        </div>
    );
}

export default HeroSearchField;
