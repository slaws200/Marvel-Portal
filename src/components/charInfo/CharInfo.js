import './charInfo.scss';
import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import MarvelService from '../../services/MarvelService';

class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }
    componentDidUpdate(prevProps, prevState){
        if(this.props.charId !== prevProps.charId){
            this.updateChar();
        }
    }

    onCharLoaded = (char) => {
        this.setState({char, loading: false})
    }

    onError = () => {
        this.setState({error: true, loading: false})
    }
    
    onCharLoading = () => {
        this.setState({loading: true})
    }

    componentDidCatch(error, info){
        console.log(error, info);
        this.setState({
            error: true
        });
    }

    updateChar = () => {
        const {charId} = this.props;
        if(!charId){
            return;
        }
        this.onCharLoading();

        this.marvelService.getCharacter(charId)
        .then(this.onCharLoaded)
        .catch(this.onError)
    }
    
    render(){
        const {char, loading, error} = this.state;
        const skeleton = char || loading || error ? null : <Skeleton/>;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !char) ? <Wiew char={char}/> : null;

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}

const Wiew = ({char}) => {
    const {name, thumbnail, description, homepage, wiki, comics} = char;
    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'};
    }
    return(
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : <p>There is no comics with this character</p>}
                {comics.slice(0, 10).map((item, i) => (
                    <li key={i} className="char__comics-item">
                    {item.name}
                    </li>
                ))}
            </ul>
        </>     
    )
}

export default CharInfo;