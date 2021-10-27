import { MovieCard } from '../MovieCard/MovieCard'
import './content.scss';

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

interface ContentProps {
  movies: MovieProps[];
  selectedGenre: {
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
  }
}


export function Content(props: ContentProps) {
  return (
    <div className="container">
        <header>
        <span className="category">Categoria:<span> {props.selectedGenre.title}</span></span>
        </header>

        <main>
        <div className="movies-list">
            {props.movies.map(movie => (
            <MovieCard key ={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
            ))}
        </div>
        </main>
    </div>
  )
}