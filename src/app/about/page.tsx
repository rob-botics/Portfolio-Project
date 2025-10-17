/* eslint-disable @next/next/no-img-element */
'use client'
import dynamic from "next/dynamic";
import "@/app/styles/portfolio.css";
import Map from "../components/Map";
import Playlist from '../components/PlaylistSlider';
import { PageWrapper } from "../components/PageWrapper";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp, library } from '@fortawesome/fontawesome-svg-core'
import React, { useEffect,useState,useRef, ReactElement } from "react"

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import Music from "../components/Music";
import LazyRenderer from "../components/LazyRenderer";
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
library.add(fas, far, fab)

const Slider = dynamic(() => import('../components/Slider'), {
  ssr: false,
  loading: () => <div className='loader'><FontAwesomeIcon style={{fontSize: '75px'}} icon={"fa-solid fa-spinner" as IconProp}  spinPulse size="2xl" /></div>,
});

type VideoItem = {
  id: string;
  img: string;
  title: string;
  iframe: ReactElement;
};
type Restuarant = {
    id: string
    latitude: number
    longitude: number
    zoom: number
    img: string
    address: string
    website: string
}
type PopularMedia = {
    id: string
    name: string
    poster_path: string
    title: string
    first_air_date: string
    release_date: string
    overview: string
}
const About = () => {
    const dialogRefs = useRef<Record<string, HTMLDialogElement | null>>({});
    const tvshows: VideoItem[] = [
        {id: 'gumball', img: '/img/media/gumball.jpg', title: 'The Amazing World of Gumball', iframe: <iframe loading="lazy" className="yt-clip" src="https://www.youtube.com/embed/TiHD0r3az9A?start=57" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>},
        {id: 'pit', img: '/img/media/thepitt.jpg', title: 'The Pitt', iframe: <iframe loading="lazy" className="yt-clip" src="https://www.youtube.com/embed/ufR_08V38sQ?si=z24eK3eDELZbCwi3" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>},
        {id: 'stranger things', img: '/img/media/stranger_things.jpg', title: 'Stranger Things', iframe: <iframe loading="lazy" className="yt-clip" src="https://www.youtube.com/embed/Zn_LrARtGoQ?si=mMbLoo72uOTaQVQq" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>},
        {id: 'avatar', img: '/img/media/avatar.jpg', title: 'Avatar: The Last Airbender', iframe: <iframe loading="lazy" className="yt-clip" src="https://www.youtube.com/embed/npFVqEhh-lQ?start=199&end=252" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>},
        {id: 'bob burgers', img: '/img/media/bobsburgers.jpg', title: 'Bob\'s Burgers', iframe: <iframe loading="lazy" className="yt-clip" src="https://www.youtube.com/embed/DWSJdxoJu4E?si=NmoK4hwsiTnFCy1y" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>},
        {id: 'greys', img: '/img/media/greys.jpg', title: 'Grey\'s Anatomy', iframe: <iframe loading="lazy" className="yt-clip" src="https://www.youtube.com/embed/q7ZCcwKjg4w?start=75" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>}
    ]
    const movies: VideoItem[] =[
        {id: 'goofy', img: '/img/movies/goofy-movie.jpg', title: 'The Goofy Movie', iframe: <iframe className="yt-clip" src="https://www.youtube.com/embed/EsNS5gnUTj4?start=5" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>},
        {id: 'pixar', img: '/img/movies/pixar.jpg', title: 'The Incredibles', iframe: <iframe loading="lazy" className="yt-clip" src="https://www.youtube.com/embed/quXf_jvnU4M?" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>},
        {id: 'avatar', img: '/img/movies/avatar.jpg', title: 'Avatar', iframe: <iframe loading="lazy" className="yt-clip" src="https://www.youtube.com/embed/tTHA_D13W0M?" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>},
        {id: 'ultron', img: '/img/movies/ultron.jpg', title: 'The Avengers: Ultron', iframe: <iframe loading="lazy" className="yt-clip" src="https://www.youtube.com/embed/geqQSuFHFfk" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>},
        {id: 'bd', img: '/img/movies/baby-driver.jpg', title: 'Baby Driver', iframe: <iframe loading="lazy"  className="yt-clip" src="https://www.youtube.com/embed/6XMuUVw7TOM?start=134" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>},
        {id: 'skyfall', img: '/img/movies/skyfall.jpg', title: 'James Bond: Skyfall', iframe: <iframe loading="lazy" className="yt-clip" src="https://www.youtube.com/embed/pAFPsXl0jgg" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>}
    ]
    const animes: VideoItem[] = [
        {id: 'frieren', img: '/img/anime/frieren.jpg', title: 'Frieren', iframe: <iframe loading="lazy" className="yt-clip" src="https://www.youtube.com/embed/YHCqcyX9N3s?si=4-hnuX2lNAh_1urM&end=189" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>},
        {id: 'kaiju', img: '/img/anime/kaiju.jpg', title: 'Kaiju No.8', iframe: <iframe loading="lazy" className='yt-clip' src="https://www.youtube.com/embed/RQO8ayzm6fI?si=xMP1LNfoHs8_dJhI" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>},
        {id: 'solo', img: '/img/anime/sololeveling.jpg', title: 'Solo Leveling', iframe: <iframe loading="lazy" className="yt-clip" src="https://www.youtube.com/embed/IrHTT2IEKpE?si=gS5PRkhcImq_FbkB&amp;start=235" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>},
        {id: 'onepiece', img: '/img/anime/onepiece.jpg', title: 'One Piece', iframe: <iframe loading="lazy" className="yt-clip" src="https://www.youtube.com/embed/Y5OhfH-KLfk?si=y-lG9zwfyn0-8qlb" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>},
        {id: 'onepunch', img: '/img/anime/onepunch.jpg', title: 'One Punch Man', iframe: <iframe loading="lazy" className="yt-clip" src="https://www.youtube.com/embed/kptzzq0Ho0o?si=z5LFE6EbQAWcSZ52&amp;start=140" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>},
        {id: 'myhero', img: '/img/anime/myhero.jpg', title: 'My Hero Academia', iframe: <iframe loading="lazy" className='yt-clip' src="https://www.youtube.com/embed/wlE7KOUXYQY?si=fkbz9SXxZdn4P1yl" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}
    ]

    const restaurants: Restuarant[] = [
        {id: 'Default', latitude:39.50 , longitude:-98.35, zoom: 2.5, img: '', address: '', website: ''},
        {id: 'The Taco Spot', latitude:32.7538 , longitude: -97.0962, zoom: 15, img: '/img/restaurants/thetacospot.jpg', address: '1301 N Collins St #202, Arlington, TX 76011', website: 'https://www.tacospotaz.com'},
        {id: 'Whiskey Cake', latitude:32.92 , longitude: -96.99, zoom: 15, img: '/img/restaurants/whiskeycake.jpg', address: '3225 Regent Blvd, Irving, TX 75063', website: 'https://www.whiskeycake.com'},
        {id: 'Piranha Killer Ramen', latitude:32.6807373 , longitude: -97.1076331, zoom: 15, img: '/img/restaurants/piranha.jpg', address: '309 Curtis Mathes Way Suite 149, Arlington, TX 76018', website: 'https://www.piranhakillerramen.com'},
        {id: '54th Street', latitude:32.5741576 , longitude: -97.1170734, zoom: 15, img: '/img/restaurants/54th.jpg', address: '600 U.S. 287 Frontage Rd, Mansfield, TX 76063', website: 'https://www.54thstreetrestaurants.com'},
        {id: 'Cris & John', latitude:32.9823727 , longitude: -96.8028612, zoom: 15, img: '/img/restaurants/crisandjohn.jpg', address: '6090 Campbell Rd #136, Dallas, TX 75248', website: 'https://www.crisandjohn.com'},
        {id: 'Carve', latitude:40.7600855 , longitude: -73.9874237, zoom: 15, img: '/img/restaurants/carve.jpg', address: '760 8th Avenue SE corner of 47th Street and, 8th Ave, New York, NY 10036', website: 'https://www.carve.cc'},
        {id: 'Sickies Burgers and Brews', latitude:32.8642037 , longitude: -97.3137655, zoom: 15, img: '/img/restaurants/sickies.jpg', address: '6770 Fossil Bluff Dr, Fort Worth, TX 76137', website: 'https://www.sickiesburgers.com/locations/fwtx/'},
        {id: 'Sixty Vines', latitude:32.7941916 , longitude: -96.8040813, zoom: 15, img: '/img/restaurants/sixtyvines.jpg', address: ' 500 Crescent Ct Suite 160, Dallas, TX 75201', website: 'https://www.sixtyvines.com'},
        {id: 'Vidorra', latitude:32.7022447 , longitude: -97.0272873, zoom: 15, img: '/img/restaurants/vidorra.jpg', address: '2959 S State Hwy 161, Grand Prairie, TX 75052', website: 'https://www.vidorracocina.com'}
    ]

    const [selectedRestaurant, setSelectedRestaurant] = useState(restaurants[0])
    const handleCoordinates = (e:  React.MouseEvent<HTMLButtonElement>) => {
        const mapBtns = document.querySelector('.map-btns') as HTMLElement

        const restaurant = restaurants.find(r => r.id === e.currentTarget.name);
        Array.from(mapBtns.children).forEach(btn => {
            const button = btn as HTMLButtonElement

            if(button.name === (restaurant as Restuarant).id)
                button.classList.add('active')
            else
                button.classList.remove('active')
            setSelectedRestaurant(restaurant as Restuarant)
        })
    };
    const [openDialogId, setOpenDialogId] = useState<string | null>(null);

    const handleOpenClose = (isOpen: 'open' | 'close', id: string) => {
        if(isOpen === 'open') {
            dialogRefs.current[id]?.showModal();
            console.log(dialogRefs.current)
            setOpenDialogId(id);
        } else {
            dialogRefs.current[id]?.close();
            setOpenDialogId(null);
        }
    };
    const handleOutsideModalClick = (e: React.MouseEvent<HTMLDialogElement>, id: string) => {
        const dialog = dialogRefs.current[id] as HTMLDialogElement;
        const dialogDimensions = dialog.getBoundingClientRect()
        // If the clicked element is the dialog itself (backdrop)
        if (e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
        ) 
        dialog.close();   
        setOpenDialogId(null);         
    };  

    const [trendingMovies, setTrendingMovies] = useState<PopularMedia[] | undefined>([])
    const [popularShows, setPopularShows] = useState<PopularMedia[] | undefined>([])

    useEffect(() => {
        document.title = 'Robert A. Morrison - About'
        const show_url = `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1&region=US`
        const fetchShows = async () =>{
            try {
                const res = await fetch( show_url );
                const data = await res.json();
                setPopularShows(data.results.slice(0,5) || ['empty']);
            } catch(err){
                console.log("Error fetching movies:", err)
            }
        }
        fetchShows()

        const movie_url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1&region=US`
        const fetchMovies = async () =>{
            try {
                const res = await fetch( movie_url );
                const data = await res.json();
                setTrendingMovies(data.results.slice(0,5) || ['empty']);
            } catch(err){
                console.log("Error fetching movies:", err)
            }
        }
        fetchMovies()
    },[])

    return(
        <PageWrapper>
            <section>
                <LazyRenderer>
                    <div className='section-title'><h2>About Me</h2></div>
                    <div className='flex-container'>
                        <div className={`slider-container`}><Slider page={'about/me'}/></div> <br/>
                        <div className='paragraph'>
                            Hello, My name is Robert Morrison and I&apos;m a Web Developer. As I begin my career, I want to be apart of a work environment that allows me to continue
                            learning and the room to grow as a web developer. I want to be a valuable asset to my work environment and make an impact with the work that I will do.
                            Hopefully one day I will be able to inspire other young minds of the next generation to pursue the ever growing industry of technology.
                            <br/><br/>
                            I am an active person, always striving to experience and try new things. My hobbies include playing volleyball, learning the guitar, y me gusta 
                            aprendiendo español. I collect pins and beanies. My favorite foods consist of 1) Honey Buns 2) Pasta 3) Tacos. And yeah that&apos;s a little bit about me. 😁✌️
                        </div>
                    </div>
                </LazyRenderer>
            </section>
            <div style={{position: 'relative', zIndex:0}}>
                <svg className="wave-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path  d="M0,256L60,224C120,192,240,128,360,101.3C480,75,600,85,720,117.3C840,149,960,203,1080,224C1200,245,1320,235,1380,229.3L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
                </svg>
            </div>
            <section className="secondary-bg">
                <LazyRenderer>
                    <div className='section-title'><h2>Family and Friends</h2></div>
                    <div className='flex-container ff-container'>
                        <div className='paragraph2'>
                            This section is just a little S/O to all my wonderful friends. You guys have been so supportive throughout the years as I have continue to navigate
                            my way through coding. Always cheering me on in every aspect of my life and as I grind toward my dreams. You guys always show me love and know how 
                            to put a smile on my face. I appreciate each and everyone of you. Your presence in my life brings me great joy and my gratitude for you all knows no
                            bounds. <br/><br/>
                            It is a blessing I get to call each and every single one of you my friend. I cannot wait to see what the future has in store for all of you beautiful
                            souls. Even though I dont&apos; have pictures of everyone this message is intended for, just know that I will cherish you all FOREVER! 😄
                        </div><br/>
                        <div className={`slider-container2`}><Slider page={'about/ff'}/></div> 
                    </div>
                </LazyRenderer>
            </section> 
            <section className="secondary-bg">
                <LazyRenderer>
                    <div className='section-title'><h2>Pets</h2></div>
                    <div className='flex-container'>
                        <div className={`slider-container`}><Slider page={'about/pets'}/></div> <br/>
                        <div className="paragraph3">
                            <p>
                                Living with Jax and Quinn is like sharing an apartment with a retired mob boss and his unhinged intern. Jax, my creamy tabby king, walks
                                around like he owns the deed to every room. The orange-and-white gentleman is refined, composed, and has perfected the art of lying down 
                                dramatically in sunbeams like he’s starring in his own slow-motion indie film. He judges everything I do—from how I open treats to my sock 
                                choices—with the kind of silent authority that says, “You could be doing better.” Meanwhile, the little chaos goblin (aka the tiny 
                                tortoiseshell/calico hurricane mix), Quinn, is a walking serotonin factory with zero impulse control. She zooms, screams, attacks invisible
                                ghosts, then passes out on my lap like she just ran a marathon... which, emotionally, she probably did.
                                <br/><br/>
                                Despite their chaos, they’re a weirdly perfect team. Jax pretends he’s above it all, but when no one’s watching (or so he thinks), he curls up
                                next to Quinn like a soft little croissant of affection. Quinn, for her part, is obsessed with him—when she’s not trying to bite his tail. 
                                They fight like siblings, nap like children, and conspire like criminals. They’ve fully taken over my life, and frankly, I’m just their 
                                underpaid assistant with thumbs. I wouldn&apos;t trade this unfiltered fluff-and-chaos duo for anything... except maybe five uninterrupted minutes
                                of sitting without someone walking across my keyboard.
                            </p>
                        </div>
                    </div>
                </LazyRenderer>
            </section> 
            <div style={{position: 'relative'}}>
                <svg className="wave-svg-bottom" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fillOpacity="1" d="M0,256L60,224C120,192,240,128,360,101.3C480,75,600,85,720,117.3C840,149,960,203,1080,224C1200,245,1320,235,1380,229.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
                </svg>
            </div>
            <section>
                <LazyRenderer section={'music'}>
                    <Music />
                </LazyRenderer>
            </section>
            <div style={{position: 'relative'}}>
                <svg className='wave-svg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fillOpacity="1" d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,128C840,96,960,64,1080,64C1200,64,1320,96,1380,112L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
                </svg>
            </div>
            <section className="secondary-bg">
                <LazyRenderer section={'playlist'}>
                    <div className="playlist">
                        <div><Playlist/></div>
                        <div className='section-title'>
                            <h2>Playlists</h2>
                        </div>
                    </div>
                </LazyRenderer>
            </section>
            <div style={{position: 'relative'}}>
                <svg className='wave-svg-bottom' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fillOpacity="1" d="M0,192L60,213.3C120,235,240,277,360,282.7C480,288,600,256,720,208C840,160,960,96,1080,74.7C1200,53,1320,75,1380,85.3L1440,96L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
                </svg>
            </div>
            <section>
                <LazyRenderer>
                    <div className='flex-container'>
                        <div className="media-favorites">
                            <div className='section-title2'><h2>Favorite T.V Shows</h2></div>
                            <div className='tv-shows'>
                                {tvshows.map((show, index) => (
                                    <div className='media' key={show.id}>
                                        <span>{index + 1}.</span>
                                        <img
                                        className='media-img'
                                        onClick={() => handleOpenClose('open', show.id)}
                                        src={show.img}
                                        alt={show.title}
                                        />
                                        <dialog
                                        data-modal
                                        ref={(dialog) => {(dialogRefs.current[show.id] = dialog)}}
                                        onClick={(e) => handleOutsideModalClick(e, show.id)}
                                        >
                                        {openDialogId === show.id ? show.iframe : ''}
                                        <FontAwesomeIcon
                                            icon={"fa-solid fa-square-xmark" as IconProp}
                                            size="2xl"
                                            onClick={() => handleOpenClose('close', show.id)}
                                        />
                                        </dialog>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {(popularShows?.length ?? 0) > 0 ? (
                            <div className='trending-media'>
                                <h2 className='section-title'>Popular Shows To Watch!</h2>
                                <small>* This section is used to practice integrating APIs. The API used is TMDB API *</small>
                                <div className="table-container">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Title</th>
                                            <th>Poster</th>
                                            <th>Date</th>
                                            <th>Overview</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {popularShows?.map((show, index) => (
                                            <tr key={show.id}>
                                                <td>{index + 1}</td>
                                                <td><span>{show.name}</span></td>
                                                <td><img src={show.poster_path ? `https://image.tmdb.org/t/p/w780${show.poster_path}` : 'https://via.placeholder.com/780x439?text=No+Image' } alt={show.title}/></td>
                                                <td>{show.first_air_date}</td>
                                                <td>{show.overview}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                </div>
                            </div>
                            ) : <FontAwesomeIcon style={{fontSize: '75px'}} icon={"fa-solid fa-spinner" as IconProp}  spinPulse size="2xl" />
                        }
                    </div>
                </LazyRenderer>
            </section>
            <div style={{position: 'relative'}}>
                <svg className="wave-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path  d="M0,256L60,224C120,192,240,128,360,101.3C480,75,600,85,720,117.3C840,149,960,203,1080,224C1200,245,1320,235,1380,229.3L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
                </svg>
            </div>
            <section className="section-placeholder-large secondary-bg" >
               <LazyRenderer>
                    <div className='flex-container'>
                        <div className="media-favorites movie-container">
                            <div className='section-title2'><h2>Favorite Movies</h2></div>
                            <div className='movies'>
                                {movies.map((movie, index) => (
                                    <div className='media' key={movie.id}>
                                        <span>{index+1}.</span>
                                        <img className='media-img' onClick={() => handleOpenClose('open',movie.id)} src={movie.img} alt={movie.title}/>
                                        <dialog data-modal ref={(dialog) => {(dialogRefs.current[movie.id] = dialog)}} onClick={(e) => handleOutsideModalClick(e, movie.id)}>
                                            {openDialogId === movie.id ? movie.iframe : ''}
                                            <FontAwesomeIcon icon={"fa-solid fa-square-xmark" as IconProp} size="2xl" onClick={() => handleOpenClose('close',movie.id)}/>
                                        </dialog>
                                    </div>
                                ))}
                            </div>
                        </div>
                        { (trendingMovies?.length ?? 0) > 0 ? (
                            <div className='trending-media'>
                                <h2 className='section-title'>Popular Movies Out Now!</h2>
                                <small>* This section is used to practice integrating APIs. The API used is TMDB API *</small>
                                <div className="table-container">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Title</th>
                                                <th>Poster</th>
                                                <th>Date</th>
                                                <th>Overview</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {trendingMovies?.map((movie,index) => (
                                                <tr key={movie.id}> 
                                                    <td>{index+1}</td>
                                                    <td><span>{movie.title}</span></td>
                                                    <td><img src={movie.poster_path ? `https://image.tmdb.org/t/p/w780${movie.poster_path}`: 'https://via.placeholder.com/780x439?text=No+Image'} alt={movie.title}/></td>
                                                    <td>{movie.release_date}</td>
                                                    <td>{movie.overview}</td>
                                                </tr>
                                            ))}  
                                        </tbody> 
                                    </table>
                                </div>
                            </div>
                            ) : <FontAwesomeIcon style={{fontSize: '75px'}} icon={"fa-solid fa-spinner" as IconProp}  spinPulse size="2xl" />
                        }
                    </div>
               </LazyRenderer>
            </section>
            <div style={{position: 'relative'}}>
                <svg className="wave-svg-bottom" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fillOpacity="1" d="M0,256L60,224C120,192,240,128,360,101.3C480,75,600,85,720,117.3C840,149,960,203,1080,224C1200,245,1320,235,1380,229.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
                </svg>
            </div>
            <section>
                <LazyRenderer>
                    <div className='media-favorites'>
                        <div className='section-title2'><h2>Favorite Anime</h2></div>
                        <div className='animes'>
                            {animes.map((anime, index) => (
                                <div className='media' key={anime.id}>
                                    <span>{index+1}.</span>
                                    <img className='media-img' onClick={() => handleOpenClose('open',anime.id)} src={anime.img} alt={anime.title}/>
                                        <dialog data-modal ref={(dialog) => {(dialogRefs.current[anime.id] = dialog)}} onClick={(e) => handleOutsideModalClick(e, anime.id)}>
                                            {openDialogId === anime.id ? anime.iframe : ''}
                                            <FontAwesomeIcon icon={"fa-solid fa-square-xmark" as IconProp} size="2xl" onClick={() => handleOpenClose('close',anime.id)}/>
                                        </dialog>
                                </div>
                            ))}
                        </div>
                    </div>
                </LazyRenderer>
            </section>
            <div style={{position: 'relative'}}>
                <svg className='wave-svg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fillOpacity="1" d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,128C840,96,960,64,1080,64C1200,64,1320,96,1380,112L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
                </svg>
            </div>
            <section className="secondary-bg">
                <LazyRenderer>
                    <div className='section-title'><h2>Favorite Food Places</h2></div>
                    <div className="flex-container" > 
                        {/* map first breakpoint 850px */}
                        {<>
                        <Map restaurant={selectedRestaurant} />
                        <div className="map-btns">
                            {restaurants.map(r => (
                                r.id !== 'Default' && 
                                <button key={r.id} name={r.id}  onClick={(e) => handleCoordinates(e)}>
                                    {r.id}
                                </button>
                            ))}
                        </div>
                        </>}
                        
                    </div>
                </LazyRenderer>
            </section>
        </PageWrapper>
    )
}
export default About