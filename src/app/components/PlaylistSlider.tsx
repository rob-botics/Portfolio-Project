/* eslint-disable @next/next/no-img-element */
import 'swiper/css';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import React, { RefObject, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Image from 'next/image';
import Link from 'next/link';
import type { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
type SpotifyPlaylist = {
    href: string
    items: {
        track: {
        id: string;
        name: string;
        album: { 
            name: string
             images: {url: string}[]
        };
        preview_url: string | null;
        artists: { name: string }[];
        };
    }[];
    total: number
}
type Deezer = {
    title: string
    audio: {preview: string}
    artist: string
    album: string
}
export default function Playlist() {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const [ninetysPlaylist, setNinetysPlaylist] = useState<SpotifyPlaylist | null>(null);
    const [twoThousandsPlaylist, setTwoThousandsPlaylist] = useState<SpotifyPlaylist | null>(null);
    const [tensPlaylist, setTensPlaylist] = useState<SpotifyPlaylist | null>(null);
    const [replayPlaylist, setReplayPlaylist] = useState<SpotifyPlaylist | null>(null);
    const [dancePlaylist, setDancePlaylist] = useState<SpotifyPlaylist | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [ninetysPreviews, setNinetysPreviews] = useState<Deezer[]>([]);
    const [twoThousandsPreviews, setTwoThousandsPreviews] = useState<Deezer[]>([]);
    const [tensPreviews, setTensPreviews] = useState<Deezer[]>([]);
    const [replayPreviews, setReplayPreviews] = useState<Deezer[]>([]);
    const [dancePreviews, setDancePreviews] = useState<Deezer[]>([]);

    async function fetchPreviews(playlist: SpotifyPlaylist, previews: (data: Deezer[]) => void) {
        const newPreviews: Deezer[] = []
        if (playlist?.items) 
            for (const item of playlist.items) {
                const track = item.track.name;
                const artist = item.track.artists[0].name;
                const album = item.track.album.name
                console.log('Name:', track)
                try {
                    const res = await fetch(`/api/spotify/deezer?artist=${artist}&track=${track}&album=${album}`);
                    const audio = await res.json();
                    newPreviews.push({title: track, audio: audio, artist: artist, album: album});
                } catch (err) {
                    console.log(err)
                }
            }
        previews(newPreviews)
    }

    useEffect(() => {
        let isMounted = true
        async function fetchPlaylist(playlist_id: string, playlistName: string, playlist: (data: SpotifyPlaylist) => void, previews: (data: Deezer[]) => void){
            console.log('fetchPlaylist called');
            const cached = sessionStorage.getItem(playlistName)
            if(!cached){
                try {
                    // Step 1: Get a valid access token from your server
                    const tokenRes = await fetch('/api/spotify/token');
                    const tokenData = await tokenRes.json();
                    
                    if (!tokenRes.ok) 
                        throw new Error(tokenData.error || 'Failed to get token');

                    const accessToken = tokenData.access_token;
                    const expireTime = tokenData.expires_in;
                    localStorage.setItem("accessToken", accessToken)
                    localStorage.setItem("expireTime", expireTime)
                    // Step 2: Use the token to fetch the playlist from Spotify API
                    const playlistRes = await fetch(`api/spotify/playlist?token=${accessToken}&id=${playlist_id}`);

                    if (!playlistRes.ok) 
                        throw new Error('Failed to fetch playlist');

                    const playlistData = await playlistRes.json();
                    if(!isMounted)
                        sessionStorage.setItem(playlistName, JSON.stringify(playlistData))
                    else{
                        playlist(playlistData);
                        sessionStorage.setItem(playlistName, JSON.stringify(playlistData))
                        fetchPreviews(playlistData, previews)
                    }
                    
                } catch (err) {
                    if (err instanceof Error) {
                        setError(err.message);
                    } else {
                        setError(String(err));
                    }
                }
            } else {
                if(!isMounted)
                    sessionStorage.setItem(playlistName, cached)
                else{
                    playlist(JSON.parse(cached) as SpotifyPlaylist);
                    sessionStorage.setItem(playlistName, cached)
                    fetchPreviews(JSON.parse(cached), previews)
                }
            }
        }
        fetchPlaylist('3Lg4q5MNWK8S88kys3xUpW', '80s/90s', setNinetysPlaylist, setNinetysPreviews)
        fetchPlaylist('76ZcBZaDVdQzFagWDPnfJV', '2000s', setTwoThousandsPlaylist, setTwoThousandsPreviews)
        fetchPlaylist('0n4SwmoL5haRE6DwTtuEEl', '2010s', setTensPlaylist, setTensPreviews)
        fetchPlaylist('41WOgAwM4nT0EEkbPT6JhY', 'Replay', setReplayPlaylist, setReplayPreviews)
        fetchPlaylist('0hJlXXbgjvoprGYatkIPR0', 'Dance', setDancePlaylist, setDancePreviews)
        return () => { isMounted = false; };
    }, []);
    
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [hasInteracted, setHasInteracted] = useState(false);
    const ninetysRef = useRef<HTMLAudioElement | null>(null);
    const twoThousandsRef = useRef<HTMLAudioElement | null>(null);
    const tensRef = useRef<HTMLAudioElement | null>(null);
    const replayRef = useRef<HTMLAudioElement | null>(null);
    const danceRef = useRef<HTMLAudioElement | null>(null);

    // Play next track when current ends
    const handleTrackEnd = (previews: Deezer[], audioRef: RefObject<HTMLAudioElement | null>) => {
        const index: number = currentTrackIndex;
        if (index < previews.length - 1) {
            setCurrentTrackIndex(prev => prev + 1);
            handlePlaylistClick(index+1, null, previews, audioRef)
        }
        else {
            console.log('End of playlist');
            setCurrentTrackIndex(0);
            handlePlaylistClick(0, 'loop', previews, audioRef)
        }
        console.log('Index: ',index, currentTrackIndex)  
    };
    // Auto-play on index change
    const handlePlaylistClick = (index: number, element: string | null, previews: Deezer[], audioRef: RefObject<HTMLAudioElement | null>) => {
        setIsPlaying(index)
        console.log('Click:', index, currentTrackIndex, hasInteracted)
        if (audioRef.current && previews[index]?.audio?.preview ) {
            const audioEl = audioRef.current;
            const newSrc = element === 'loop' || (hasInteracted === false && index === 0) ? previews[0].audio.preview : previews[index].audio.preview;

            if ((audioEl.src.endsWith(newSrc)) || (element === 'pause' || element === 'play') && hasInteracted === true) 
                if (!audioEl.paused) {
                    audioEl.pause(); 
                    setIsPlaying(null)
                }
                else 
                    audioEl.play().catch(err => console.warn("Play failed:", err));
            else {
                audioEl.src = newSrc;
               
                setHasInteracted(true)
                audioEl.play().catch(err => console.warn("Autoplay failed:", err));
            }            
        }
    };
    const [isPlaying, setIsPlaying] = useState<number | null>(null)
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);
    const prevSlideIndexRef = useRef<number>(0);

    if (error) return <p>Error: {error}</p>;
    if(!ninetysPlaylist || ninetysPreviews.length === 0) 
        return <div className='loader'><FontAwesomeIcon style={{fontSize: '75px'}} icon={"fa-solid fa-spinner" as IconProp}  spinPulse size="2xl" /></div>
    return (
    <>
        <small>* This section is used to practice integrating APIs. The API used is Spotify API and Deezer API. *</small>
        {<>
            <Swiper
                loop={true}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="playlist-slider "
                onSlideChange={(swiper) => {
                    const newIndex = swiper.realIndex;
                    console.log('Prev: ',newIndex, prevSlideIndexRef.current)
                    if (newIndex !== prevSlideIndexRef.current) {
                        setIsPlaying(null);
                        setCurrentTrackIndex(0);
                        setActiveSlideIndex(newIndex);
                        prevSlideIndexRef.current = newIndex;
                    }
                    console.log('Prev: ',newIndex, prevSlideIndexRef.current)
                }}
            >
                <SwiperSlide>
                    {activeSlideIndex === 0 && <div className='playlist-container'>
                        <div className='playlist-header'>
                            <Image width={150} height={150} style={{borderRadius: '4px', width: 'auto'}} src={'/img/playlist/80s-90s.png'} alt='80s/90s Are & Bee'/>
                            <div className='playlist-info'>
                                <h3>80s/90s HipHop and Are & Bee</h3>
                                <Link className='full-playlist' target='_blank' href={`https://open.spotify.com/playlist/${ninetysPlaylist?.href.split('/playlists/')[1].split('/tracks')[0]}`}>Full Playlist</Link>
                                <p className='playlist-total'>Total Tracks: {ninetysPlaylist?.total}</p>
                                <div>
                                    { isPlaying === currentTrackIndex ? <FontAwesomeIcon data-name='pause-play' onClick={(e) => {setIsPlaying(currentTrackIndex); setCurrentTrackIndex(currentTrackIndex); handlePlaylistClick(currentTrackIndex, (e.currentTarget as SVGSVGElement).getAttribute('data-name'), ninetysPreviews, ninetysRef)}} icon={"fa-solid fa-pause" as IconProp} size='2xl'/>
                                    : <FontAwesomeIcon data-name='pause-play' onClick={(e) => {setIsPlaying(null); setCurrentTrackIndex(currentTrackIndex); handlePlaylistClick(currentTrackIndex, (e.currentTarget as SVGSVGElement).getAttribute('data-name'), ninetysPreviews, ninetysRef)}} icon={"fa-solid fa-play" as IconProp} size='2xl'/>
                                    }
                                </div>
                            </div>
                        </div>
                        <ul>
                        {ninetysPlaylist?.items.map((item, index:number) => (
                            <li key={item.track.id}>
                                <div className='track'>
                                    <div className='track-info'>
                                        <p>{item.track.name} <br/> by {item.track.artists[0].name}</p> 
                                        <p>Album: {item.track.album.name}</p> 
                                    </div>
                                    <div className='preview-container'>
                                        <img style={{borderRadius: '4px'}} src={item.track.album.images[2].url} alt={item.track.name}/>
                                        { isPlaying === index ? <FontAwesomeIcon style={{cursor: 'pointer'}} onClick={() => {setIsPlaying(index); setCurrentTrackIndex(index); handlePlaylistClick(index, null, ninetysPreviews, ninetysRef)}} icon={"fa-solid fa-circle-pause" as IconProp} size='2xl'/>
                                            : <FontAwesomeIcon style={{cursor: 'pointer'}} onClick={() => {setIsPlaying(null); setCurrentTrackIndex(index); handlePlaylistClick(index, null, ninetysPreviews, ninetysRef)}} icon={"fa-solid fa-circle-play" as IconProp} size='2xl'/>
                                        }
                                    </div>
                                </div>         
                            </li>
                        ))}
                        </ul>
                        <audio ref={ninetysRef} onEnded={() => handleTrackEnd(ninetysPreviews, ninetysRef)} controls/>
                    </div>}
                </SwiperSlide>
                <SwiperSlide>
                    {activeSlideIndex ===1 && <div className='playlist-container'>
                        <div className='playlist-header'>
                            <img src={'/img/playlist/2000sBangers.png'} alt='2000s Bangers'/>
                            <div className='playlist-info'>
                                <h3>2000s Bangers</h3>
                                <Link className='full-playlist' target='_blank' href={`https://open.spotify.com/playlist/${twoThousandsPlaylist?.href.split('/playlists/')[1].split('/tracks')[0]}`}>Full Playlist</Link>
                                <p className='playlist-total'>Total Tracks: {twoThousandsPlaylist?.total}</p>
                                <div>
                                    { isPlaying === currentTrackIndex ? <FontAwesomeIcon data-name='pause-play' onClick={(e) => {setIsPlaying(currentTrackIndex); setCurrentTrackIndex(currentTrackIndex); handlePlaylistClick(currentTrackIndex, (e.currentTarget as SVGSVGElement).getAttribute('data-name'), twoThousandsPreviews, twoThousandsRef)}} icon={"fa-solid fa-pause" as IconProp} size='2xl'/>
                                    : <FontAwesomeIcon data-name='pause-play' onClick={(e) => {setIsPlaying(null); setCurrentTrackIndex(currentTrackIndex); handlePlaylistClick(currentTrackIndex, (e.currentTarget as SVGSVGElement).getAttribute('data-name'), twoThousandsPreviews, twoThousandsRef)}} icon={"fa-solid fa-play" as IconProp} size='2xl'/>
                                    }
                                </div>
                            </div>
                        </div>
                        <ul>
                        {twoThousandsPlaylist?.items.map((item, index:number) => (
                            <li key={item.track.id}>
                                <div className='track'>
                                    <div className='track-info'>
                                        <p>{item.track.name} <br/> by {item.track.artists[0].name}</p> 
                                        <p>Album: {item.track.album.name}</p> 
                                    </div>
                                    <div className='preview-container'>
                                        <img style={{borderRadius: '4px'}} src={item.track.album.images[2].url} alt={item.track.name}/>
                                        { isPlaying === index ? <FontAwesomeIcon style={{cursor: 'pointer'}} onClick={() => {setIsPlaying(index); setCurrentTrackIndex(index); handlePlaylistClick(index, null, twoThousandsPreviews, twoThousandsRef)}} icon={"fa-solid fa-circle-pause" as IconProp} size='2xl'/>
                                            : <FontAwesomeIcon style={{cursor: 'pointer'}} onClick={() => {setIsPlaying(null); setCurrentTrackIndex(index); handlePlaylistClick(index, null, twoThousandsPreviews, twoThousandsRef)}} icon={"fa-solid fa-circle-play" as IconProp} size='2xl'/>
                                        }
                                    </div>
                                </div>         
                            </li>
                        ))}
                        </ul>
                        <audio ref={twoThousandsRef} onEnded={() => handleTrackEnd(twoThousandsPreviews, twoThousandsRef)} controls/>
                    </div>}
                </SwiperSlide>
                <SwiperSlide>
                    { activeSlideIndex === 2 && <div className='playlist-container'>
                        <div className='playlist-header'>
                            <Image width={150} height={150} style={{borderRadius: '4px', width: 'auto'}} src={'/img/playlist/2010sBops.png'} alt='2010s Bops'/>
                            <div className='playlist-info'>
                                <h3>2010 Bops</h3>
                                <Link className='full-playlist' target='_blank' href={`https://open.spotify.com/playlist/${tensPlaylist?.href.split('/playlists/')[1].split('/tracks')[0]}`}>Full Playlist</Link>
                                <p className='playlist-total'>Total Tracks: {tensPlaylist?.total}</p>
                                <div>
                                    { isPlaying === currentTrackIndex ? <FontAwesomeIcon data-name='pause-play' onClick={(e) => {setIsPlaying(currentTrackIndex); setCurrentTrackIndex(currentTrackIndex); handlePlaylistClick(currentTrackIndex, (e.currentTarget as SVGSVGElement).getAttribute('data-name'), tensPreviews, tensRef)}} icon={"fa-solid fa-pause" as IconProp} size='2xl'/>
                                    : <FontAwesomeIcon data-name='pause-play' onClick={(e) => {setIsPlaying(null); setCurrentTrackIndex(currentTrackIndex); handlePlaylistClick(currentTrackIndex, (e.currentTarget as SVGSVGElement).getAttribute('data-name'), tensPreviews, tensRef)}} icon={"fa-solid fa-play" as IconProp} size='2xl'/>
                                    }
                                </div>
                            </div>
                        </div>
                        <ul>
                        {tensPlaylist?.items.map((item, index:number) => (
                            <li key={item.track.id}>
                                <div className='track'>
                                    <div className='track-info'>
                                        <p>{item.track.name} <br/> by {item.track.artists[0].name}</p> 
                                        <p>Album: {item.track.album.name}</p> 
                                    </div>
                                    <div className='preview-container'>
                                        <img style={{borderRadius: '4px'}} src={item.track.album.images[2].url} alt={item.track.name}/>
                                        { isPlaying === index ? <FontAwesomeIcon style={{cursor: 'pointer'}} onClick={() => {setIsPlaying(index); setCurrentTrackIndex(index); handlePlaylistClick(index, null, tensPreviews, tensRef)}} icon={"fa-solid fa-circle-pause" as IconProp} size='2xl'/>
                                            : <FontAwesomeIcon style={{cursor: 'pointer'}} onClick={() => {setIsPlaying(null); setCurrentTrackIndex(index); handlePlaylistClick(index, null, tensPreviews, tensRef)}} icon={"fa-solid fa-circle-play" as IconProp} size='2xl'/>
                                        }
                                    </div>
                                </div>         
                            </li>
                        ))}
                        </ul>
                        <audio ref={tensRef} onEnded={() => handleTrackEnd(tensPreviews, tensRef)} controls/>
                    </div>}
                </SwiperSlide>
                <SwiperSlide>
                    {activeSlideIndex === 3 && <div className='playlist-container'>
                        <div className='playlist-header'>
                            <Image width={150} height={150} style={{borderRadius: '4px', width: 'auto'}} src={'/img/playlist/ReplayAllTime.png'} alt='Replay All Time Playlist'/>
                            <div className='playlist-info'>
                                <h3>Most Replays of All Time</h3>
                                <Link className='full-playlist' target='_blank' href={`https://open.spotify.com/playlist/${replayPlaylist?.href.split('/playlists/')[1].split('/tracks')[0]}`}>Full Playlist</Link>
                                <p className='playlist-total'>Total Tracks: {replayPlaylist?.total}</p>
                                <div>
                                    { isPlaying === currentTrackIndex ? <FontAwesomeIcon data-name='pause-play' onClick={(e) => {setIsPlaying(currentTrackIndex); setCurrentTrackIndex(currentTrackIndex); handlePlaylistClick(currentTrackIndex, (e.currentTarget as SVGSVGElement).getAttribute('data-name'), replayPreviews, replayRef)}} icon={"fa-solid fa-pause" as IconProp} size='2xl'/>
                                    : <FontAwesomeIcon data-name='pause-play' onClick={(e) => {setIsPlaying(null); setCurrentTrackIndex(currentTrackIndex); handlePlaylistClick(currentTrackIndex, (e.currentTarget as SVGSVGElement).getAttribute('data-name'), replayPreviews, replayRef)}} icon={"fa-solid fa-play" as IconProp} size='2xl'/>
                                    }
                                </div>
                            </div>
                        </div>
                        <ul>
                        {replayPlaylist?.items.map((item, index:number) => (
                            <li key={item.track.id}>
                                <div className='track'>
                                    <div className='track-info'>
                                        <p>{item.track.name} <br/> by {item.track.artists[0].name}</p> 
                                        <p>Album: {item.track.album.name}</p> 
                                    </div>
                                    <div className='preview-container'>
                                        <img style={{borderRadius: '4px'}} src={item.track.album.images[2].url} alt={item.track.name}/>
                                        { isPlaying === index ? <FontAwesomeIcon style={{cursor: 'pointer'}} onClick={() => {setIsPlaying(index); setCurrentTrackIndex(index); handlePlaylistClick(index, null, replayPreviews, replayRef)}} icon={"fa-solid fa-circle-pause" as IconProp} size='2xl'/>
                                            : <FontAwesomeIcon style={{cursor: 'pointer'}} onClick={() => {setIsPlaying(null); setCurrentTrackIndex(index); handlePlaylistClick(index, null, replayPreviews, replayRef)}} icon={"fa-solid fa-circle-play" as IconProp} size='2xl'/>
                                        }
                                    </div>
                                </div>         
                            </li>
                        ))}
                        </ul>
                        <audio ref={replayRef} onEnded={() => handleTrackEnd(replayPreviews, replayRef)} controls/>
                    </div>}
                </SwiperSlide>
                <SwiperSlide>
                     { activeSlideIndex === 4 && <div className='playlist-container'>
                        <div className='playlist-header'>
                            <Image width={150} height={150} style={{borderRadius: '4px', width: 'auto'}} src={'/img/playlist/Dance.png'} alt='Dance'/>
                            <div className='playlist-info'>
                                <h3>Dance 🕺🏾</h3>
                                <Link className='full-playlist' target='_blank' href={`https://open.spotify.com/playlist/${dancePlaylist?.href.split('/playlists/')[1].split('/tracks')[0]}`}>Full Playlist</Link>
                                <p className='playlist-total'>Total Tracks: {dancePlaylist?.total}</p>
                                <div>
                                    { isPlaying === currentTrackIndex ? <FontAwesomeIcon data-name='pause-play' onClick={(e) => {setIsPlaying(currentTrackIndex); setCurrentTrackIndex(currentTrackIndex); handlePlaylistClick(currentTrackIndex, (e.currentTarget as SVGSVGElement).getAttribute('data-name'), dancePreviews, danceRef)}} icon={"fa-solid fa-pause" as IconProp} size='2xl'/>
                                    : <FontAwesomeIcon data-name='pause-play' onClick={(e) => {setIsPlaying(null); setCurrentTrackIndex(currentTrackIndex); handlePlaylistClick(currentTrackIndex, (e.currentTarget as SVGSVGElement).getAttribute('data-name'), dancePreviews, danceRef)}} icon={"fa-solid fa-play" as IconProp} size='2xl'/>
                                    }
                                </div>
                            </div>
                        </div>
                        <ul>
                        {dancePlaylist?.items.map((item, index:number) => (
                            <li key={item.track.id}>
                                <div className='track'>
                                    <div className='track-info'>
                                        <p>{item.track.name} <br/> by {item.track.artists[0].name}</p> 
                                        <p>Album: {item.track.album.name}</p> 
                                    </div>
                                    <div className='preview-container'>
                                        <img style={{borderRadius: '4px'}} src={item.track.album.images[2].url} alt={item.track.name}/>
                                        { isPlaying === index ? <FontAwesomeIcon style={{cursor: 'pointer'}} onClick={() => {setIsPlaying(index); setCurrentTrackIndex(index); handlePlaylistClick(index, null, dancePreviews, danceRef)}} icon={"fa-solid fa-circle-pause" as IconProp} size='2xl'/>
                                            : <FontAwesomeIcon style={{cursor: 'pointer'}} onClick={() => {setIsPlaying(null); setCurrentTrackIndex(index); handlePlaylistClick(index, null, dancePreviews, danceRef)}} icon={"fa-solid fa-circle-play" as IconProp} size='2xl'/>
                                        }
                                    </div>
                                </div>         
                            </li>
                        ))}
                        </ul>
                        <audio ref={danceRef} onEnded={() => handleTrackEnd(dancePreviews, danceRef)} controls/>
                    </div>}
                </SwiperSlide>
            </Swiper>
            <Swiper
                loop={true}
                // frameBorder="0"
                freeMode={true}
                spaceBetween={10}
                slidesPerView={5}
                onSwiper={setThumbsSwiper}
                watchSlidesProgress={true}
                className="thumbnail-slider"
                modules={[FreeMode, Navigation, Thumbs]}
            >
                <SwiperSlide>
                    <img tabIndex={-1} src={'/img/playlist/80s-90s.png'} alt='80 / 90s Playlist'/>
                </SwiperSlide>
                <SwiperSlide>
                    <img tabIndex={-1} src={'img/playlist/2000sBangers.png'} alt='2000s Playlist'/>
                </SwiperSlide>
                <SwiperSlide>
                    <img tabIndex={-1} src={'/img/playlist/2010sBops.png'} alt='2010s Playlist'/>
                </SwiperSlide>
                <SwiperSlide>
                    <img tabIndex={-1} src={'img/playlist/ReplayAllTime.png'} alt='Replay Playlist'/>
                </SwiperSlide>
                <SwiperSlide>
                    <img tabIndex={-1} src={'/img/playlist/Dance.png'} alt='Dance Playlist'/>
                </SwiperSlide>
            </Swiper>
        </>
    } 
    </>
  );
}

