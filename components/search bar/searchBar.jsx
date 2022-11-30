

const SearchBar = ({ search, searchHandler, searchLabel }) => {


    return (
        <section className="d-flex flex-form search-container">
            <input type="text" name="search" className="input input-info" id="search-bar"
                value={search}
                onChange={searchHandler}
            />
            <label htmlFor="search-bar" className="form-label label-info" ref={searchLabel}>
                Search
            </label>
        </section>
    )
}
export default SearchBar