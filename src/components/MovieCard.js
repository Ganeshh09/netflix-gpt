import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
    return (
        <div className="w-36 pr-4">
            <img 
                alt="Movie Poster" 
                src={IMG_CDN_URL + posterPath} 
                className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-200 ease-in-out"
            />
        </div>
    );
};

export default MovieCard;
