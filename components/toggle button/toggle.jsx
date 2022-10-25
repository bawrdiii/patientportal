

export const Toggle = ({ labelOnclick, value, refLabel, refSpan }) => {






    return (
        <div className="toggler">
            <label
                htmlFor="toggle"
                id="toggle-label"
                className="toggle-label"
                ref={refLabel}
                onClick={labelOnclick}>
                <input type="checkbox"
                    name="switch"
                    id="toggle"
                    value={value}
                    title="dark / light"
                    className="switch"
                />
                <span className="toggle-span" ref={refSpan} id="toggle-span"></span>
            </label>


        </div >
    )
}