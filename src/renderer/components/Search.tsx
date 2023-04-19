export interface ISearchProps {
  query: string;
  setQuery: (query:string) => void
}

const Search = (props: ISearchProps) => {
  return (
    <div className="form-control w-full max-w-xs mt-8">
      <input
        type="text"
        placeholder="Search for company name ..."
        className="input input-bordered w-full max-w-xs"
        value={props.query}
        onChange={(e) => props.setQuery(e.target.value)}
      />
    </div>
  );
}

export default Search
