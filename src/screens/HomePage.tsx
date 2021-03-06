import { useState, useEffect, Fragment } from 'react'
import { SideBar } from '../components/SideBar/SideBar'
import { Content } from '../components/Content/Content'
import { api } from '../services/api'

interface MovieProps {
    imdbID: string;
    Title: string;
    Poster: string;
    Ratings: Array<{
    Source: string;
    Value: string;
    }>;
    Runtime: string;
}

interface GenreResponseProps {
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
}

export function HomePage() {
    const [movies, setMovies] = useState<MovieProps[]>([]);
    const [selectedGenreId, setSelectedGenreId] = useState(1);
    const [genres, setGenres] = useState<GenreResponseProps[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

    useEffect(() => {
        api.get<GenreResponseProps[]>('genres').then(response => {
        setGenres(response.data);
        });
    }, []);

    useEffect(() => {
        api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
        setMovies(response.data);
        })

        api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
        setSelectedGenre(response.data);
        })
    }, [selectedGenreId]);

    function handleClickButton(id: number) {
        setSelectedGenreId(id);
    }

    return (
        <Fragment>
            < SideBar genres={genres} handleClickButton={handleClickButton} selectedGenreId={selectedGenreId} />
            < Content movies={movies} selectedGenre={selectedGenre} />
        </Fragment>
    )
}