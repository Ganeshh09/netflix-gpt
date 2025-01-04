import { IMG_CDN } from "../utils/constants";

const MovieCard = ({posterPath}) => {
    return <div>
        <img alt="moiecard"
        src={IMG_CDN +posterPath}/>
    </div>
};

export default MovieCard;