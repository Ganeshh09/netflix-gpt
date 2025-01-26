import { BG_IMG_URL } from "../utils/constants";
import GptMovieSuggestion from "./GptMovieSuggestion";
import GptSearchBar from "./GptSearchBar";

const GptSearch = ()=> {
    return (
       <div>
       <div className="absolute -z-10 bg-gradient-to-b">
            <img src={BG_IMG_URL}
            alt="backgroundimage"/>
        </div>
        <div>
            <GptSearchBar/>
            <GptMovieSuggestion/>
        </div>
        </div>
        
    )
};
export default GptSearch;