import './comicsList.scss';
import { useState, useEffect, useRef } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import AppBanner from "../appBanner/AppBanner";
import {Link} from 'react-router-dom';

export const Comics = (props) => {
    const [charlist, setCharlist] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [charEnded, setCharEnded] = useState(false);

    
    const {loading, error, getAllComics} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

     const onRequest = (offset, initial) => {        
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(onCharListLoaded)
    }

    const onCharListLoaded = (newCharlist) => {
        let ended = false;
        if(newCharlist.length < 8){
            ended = true;
        }

        setCharlist(charlist => [...charlist, ...newCharlist]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);
    }

    const itemRefs = useRef([]);

    // Этот метод создан для оптимизации, 
    // чтобы не помещать такую конструкцию в метод render
    const renderItems = (arr) => {
        const items =  arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <li 
                    ref={elem => itemRefs.current[i] = elem}               
                    className="comic__item"
                    key={i}>
                        <Link to={`/comics/${item.id}`}>
                            <img src={item.thumbnail} alt={item.name} style={imgStyle} className='comic__item-img'/>
                            <div className="comic__item__name">{item.name}</div>
                            <div className='comic__item__price'>{item.price ? item.price + '$' : 'Price not avalible.'}</div>
                        </Link>
                </li>
            )
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="comic__grid">
                {items}
            </ul>
        )
    }    
    const items = renderItems(charlist);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;
    
    return (
    <>
        <AppBanner/>
        <div className="comic__list">
            {errorMessage}
            {spinner}
            {items}
            <button 
                style={{'display': charEnded ? 'none' : 'block'}}
                className="button button__main button__long"
                disabled={newItemLoading}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    </>
    )
    
}