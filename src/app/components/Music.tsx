import { IconProp, library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { useState } from 'react'
library.add(fas, far, fab)

type ArtistInfo = {
    id: number
    name: string
    firstSongTitle: string
    secondSongTitle: string
    firstSrc: string
    secondSrc: string
}

const Music = () => {
    const songs: ArtistInfo[] = [
        {
            id: 1, 
            name: 'JoJo', 
            firstSongTitle: 'One Last Time', 
            secondSongTitle: 'Use My Shoulder', 
            firstSrc: 'https://open.spotify.com/embed/track/4172S3BC4ViI5biWFakPuO?utm_source=generator', 
            secondSrc:'https://open.spotify.com/embed/track/6E2i1jYg46C9zrVptJGvqJ?utm_source=generator'
        },
        {
            id: 2, 
            name: 'Kehlani', 
            firstSongTitle: 'Folded', 
            secondSongTitle: 'Slow Dance', 
            firstSrc: 'https://open.spotify.com/embed/track/0bxPRWprUVpQK0UFcddkrA?utm_source=generator', 
            secondSrc:'https://open.spotify.com/embed/track/5FnBE6KJdwoaZISb1jiNpR?utm_source=generator'
        },
        {
            id: 3, 
            name: 'Kenyon Dixon', 
            firstSongTitle: 'Isly', 
            secondSongTitle: 'Can\'t Get Over You', 
            firstSrc: 'https://open.spotify.com/embed/track/52WEvDI0nTdcrXLWaexaJR?utm_source=generator', 
            secondSrc:'https://open.spotify.com/embed/track/1hiStqfIKEtIgmbvwXsjn7?utm_source=generator'
        },
        {
            id: 4, 
            name: 'Tori Kelly', 
            firstSongTitle: 'Oceans', 
            secondSongTitle: 'Don\'t Take Me Home', 
            firstSrc: 'https://open.spotify.com/embed/track/14HmdbVhtDR1R32qgNZx1N?utm_source=generator', 
            secondSrc:'https://open.spotify.com/embed/track/5sgS3JUiUA3E4dYlmp6U0z?utm_source=generator'
        },
        {
            id: 5, 
            name: 'Jhene Aiko', 
            firstSongTitle: 'Sun/Son', 
            secondSongTitle: 'Guidance', 
            firstSrc: 'https://open.spotify.com/embed/track/1WD5d42tRqdLyfaoTtUlHB?utm_source=generator', 
            secondSrc:'https://open.spotify.com/embed/track/1FCkraEiLiJwjXm5eqhLU9?utm_source=generator'
        },
        {
            id: 6, 
            name: 'SiR', 
            firstSongTitle: 'Nothing Even Matters', 
            secondSongTitle: 'War', 
            firstSrc: 'https://open.spotify.com/embed/track/5URTJ8nizZVFDSJVnyPjXf?utm_source=generator', 
            secondSrc:'https://open.spotify.com/embed/track/09PaypEcFmih85xXedBBKP?utm_source=generator'
        },
        {
            id: 7, 
            name: 'Alex Isley', 
            firstSongTitle: 'Hands', 
            secondSongTitle: 'Into Orbit', 
            firstSrc: 'https://open.spotify.com/embed/track/6TLP6it628M3BRNqg3rD4v?utm_source=generator', 
            secondSrc:'https://open.spotify.com/embed/track/24mo8K6ZzBTB4YBS3OtZ0k?utm_source=generator'
        },
        {
            id: 8, 
            name: 'Paramore', 
            firstSongTitle: 'You First', 
            secondSongTitle: 'Ignorance', 
            firstSrc: 'https://open.spotify.com/embed/track/2ZMkAWKrNDXrQuF0N9Q9Xj?utm_source=generator', 
            secondSrc:'https://open.spotify.com/embed/track/47No93LxERvV6MtOAmQzHS?utm_source=generator'
        },
        {
            id: 9, 
            name: 'Mac Ayres', 
            firstSongTitle: 'Get Away', 
            secondSongTitle: 'Nothing Else', 
            firstSrc: 'https://open.spotify.com/embed/track/5rlN7kWG5R7de0emQYkXaS?utm_source=generator', 
            secondSrc:'https://open.spotify.com/embed/track/5ZDqduedfazFVUhLAmlbBe?utm_source=generator'
        },
        {
            id: 10, 
            name: 'Justin Bieber', 
            firstSongTitle: 'All I Can Take', 
            secondSongTitle: 'Get Me', 
            firstSrc: 'https://open.spotify.com/embed/track/72PVbRKkUimweUPV0nKAPs?utm_source=generator', 
            secondSrc:'https://open.spotify.com/embed/track/5VwwpU7KsLhgfbMEecedhJ?utm_source=generator'
        }
    ]
    const [isSecondSong, setIsSecondSong] = useState<number | null>(null)
    function handleSongChange(index: number){
        console.log('',index)
        if(index === isSecondSong)
            setIsSecondSong(null)
    }
    return(
        <>
            <div className='section-title'><h2>Top 10 Music Artist</h2></div>
            <div className='songs'>
                { songs.map((song, index) => (
                    <div className='song' key={index}>
                        <div className='musician-container'>
                            <span className="music-rank">{song.id} </span>
                            <span className="musician-name">{song.name}</span>
                        </div>
                        <div className="song-container">
                            <iframe title={song.firstSongTitle}
                                className={`first-song ${isSecondSong === index ? 'hide-song' : ''}`}
                                data-testid="embed-iframe"
                                style={{ borderRadius: "12px" }}
                                src={song.firstSrc}
                                width="100%"
                                height="100"
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                allowFullScreen
                                loading="lazy"
                            />
                            <iframe title={song.secondSongTitle}
                                className={`second-song ${isSecondSong === index ? '' : 'hide-song'}`}
                                data-testid="embed-iframe"
                                style={{ borderRadius: "12px" }}
                                src={song.secondSrc}
                                width="100%"
                                height="100"
                                allowFullScreen
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                            />
                            <FontAwesomeIcon onClick={() => {setIsSecondSong(index); handleSongChange(index)}} className='song-btn' icon={"fa-solid fa-forward" as IconProp} />
                        </div>            
                    </div>
                ))} 
            </div>
        </>   
    )
}
export default Music