import { useSelector } from "react-redux";
import lang from "../utils/languageConstants";

const GptSearchBar = ()=> {

    const langKey = useSelector((store)=>store.config.lang)


    return (
        <div className="pt-[10%] flex justify-center ">
            <form className="bg-black w-1/2  m-3 grid grid-cols-12 ">
                <input type="text" className="col-span-9 p-4 m-2  text-black bg-white rounded-sm  " placeholder={lang[langKey].gptSearchPlaceholder}/>
                <button className="col-span-3 p-4 m-2 text-white bg-red-600 rounded-lg">{lang[langKey].Search}</button>
            </form>
        </div>
    )
};
export default GptSearchBar;    