import { HiLocationMarker } from "react-icons/hi";


function Search({filter,setFilter}){
    return <div className="flexCenter search-bar">
    <HiLocationMarker color="var(--blue)" size={25} />
    <input type="text" value={filter} onChange={(e)=>setFilter(e.target.value)}/>
    <button className="button">Search</button>
  </div>
}
export default Search;