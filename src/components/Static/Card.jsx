import { useRouter } from "next/router";
import { AiFillStar } from "react-icons/ai"
import { BsFillPlayFill } from "react-icons/bs"
import Link from "next/link";

export default function Card({ value = "movies", type = "vertical", movie }) {
    const router = useRouter();
    const verticalImage = value !== 'actors' ?
        (value === "actors" ? ("https://image.tmdb.org/t/p/w400" + movie?.profile_path) : ("https://image.tmdb.org/t/p/w400" + movie?.poster_path)) :
        (movie?.profile_path ? (value === "actors" ? ("https://image.tmdb.org/t/p/w400" + movie?.profile_path) : ("https://image.tmdb.org/t/p/w400" + movie?.poster_path)) : `https://avatars.dicebear.com/api/personas/${movie?.name?.replace(/ /g, '-')}.svg`)
    const backdropImage = "https://image.tmdb.org/t/p/original" + movie?.backdrop_path;

    const HorizontalCard = () => {
        return <>
            <div className="group cursor-pointer">
                <div
                    style={{ '--card-banner': "url(" + (verticalImage) + ")" }}
                    className="relative rounded-lg group-hover:scale-[1.03] w-full lg:w-[180px] h-[300px] p-4 movie-card transition-all group-hover:shadow-2xl duration-200">
                    <div className="rounded-lg absolute w-full h-full left-0 top-0 bg-black/20 group-hover:bg-black/50 transition-all duration-200" />
                    <div className="text-center relative flex w-full h-full justify-center items-center text-white">
                        <p className="opacity-0 transition-all duration-200 group-hover:opacity-100 mt-2 text-base font-medium">{movie?.title || movie?.name}</p>
                        {value !== "actors" && value !== "seasons" && (
                            <div className="absolute top-0 left-0 opacity-100">
                                <p className="flex items-center gap-1"><AiFillStar className="text-yellow-500" />{movie?.vote_average}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    }
    const VerticalCard = () => {
        return <>
            <div className="group cursor-pointer">
                <div
                    style={{ '--card-banner': "url(" + backdropImage + ")" }}
                    className="relative rounded-lg group-hover:scale-[1.03] w-full h-36 p-4 movie-card transition-all group-hover:shadow-2xl duration-200">
                    <div className="rounded-lg absolute w-full h-full left-0 top-0 bg-black/20 group-hover:bg-black/50 transition-all duration-200" />
                    <div className="relative flex w-full h-full justify-center items-center">
                        <div className="text-center relative flex w-full h-full justify-center items-center text-white opacity-0 transition-all duration-200 group-hover:opacity-100">
                            <p className="mt-2 text-lg font-medium">{movie?.title || movie?.name}</p>
                        </div>
                    </div>
                </div>

            </div>
        </>
    }
    const HorticalCard = () => {
        return <>
            <div className="group cursor-pointer">
                <div style={{ '--card-banner': "url(" + backdropImage + ")" }} className="backdrop-blur-lg relative rounded-lg group-hover:scale-[1.03] w-[310px] movie-card transition-all group-hover:shadow-2xl duration-200">
                    <div className="relative flex w-[full] h-full justify-start items-center">
                        <div className="rounded-b-lg relative p-4 flex gap-4 bg-gradient-to-t from-black via-black to-transparent w-full h-full">
                            <img className="w-24 rounded-md shadow-lg" src={verticalImage} />
                            <div className="flex w-full flex justify-end flex-col text-white">
                                <p className="text-white font-medium text-sm">{movie?.title || movie?.name}</p>
                                <p className="flex items-center gap-1"><AiFillStar className="text-yellow-500" />{movie?.vote_average}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    }
    const RenderCards = () => {
        return <>
            {value !== "seasons" ? (
                <>
                    {type === "horizontal" &&
                        <Link href={`/${value}/` + movie?.id} passHref>
                            <a>
                                <HorizontalCard />
                            </a>
                        </Link>
                    }
                    {type === "vertical" &&
                        <Link href={`/${value}/` + movie?.id} passHref>
                            <a>
                                <VerticalCard />
                            </a>
                        </Link>
                    }
                    {type === "hortical" &&
                        <Link href={`/${value}/` + movie?.id} passHref>
                            <a>
                                <HorticalCard />
                            </a>
                        </Link>
                    }
                </>
            ) : (
                <>
                    {type === "horizontal" &&
                        <a>
                            <HorizontalCard />
                        </a>
                    }
                    {type === "vertical" &&
                        <a>
                            <VerticalCard />
                        </a>
                    }
                    {type === "hortical" &&
                        <a>
                            <HorticalCard />
                        </a>
                    }
                </>
            )}

        </>
    }
    return <>
        {value !== "actors" && movie?.poster_path && (
            <RenderCards />
        )}
        {value === "actors" && (
            <RenderCards />
        )}
    </>
}