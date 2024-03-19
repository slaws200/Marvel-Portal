import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import AppBanner from "../appBanner/AppBanner";
import './singleComicPage.scss';

const SingleComicPage = () => {

    const {comicId} = useParams();  
    const [comic, setComic] = useState(null);
    const {loading, error, getComic, clearError} = useMarvelService();

    useEffect(() => {
        updateComic();
    }, [comicId])

    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    const updateComic = () => {
        if(!comicId){
            return;
        }
        clearError();

        getComic(comicId)
            .then(onComicLoaded)
    }
    
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !comic) ? <Wiew comic={comic}/> : null;

   
    return (
        <>
            <AppBanner/>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const Wiew = ({comic}) => {
    console.log(comic);
    const {thumbnail, name, description, price} = comic;

    return (
        <div className='single-comic'>
            <img src={thumbnail} alt={name} className='single-comic__img'/>
            <div className='single-comic__info'>
                <h2 className='single-comic__name'>{name}</h2>
                <p className='single-comic__descr'>{description !== '' ? description : 'Description for this comic are not avalible.'}</p>
                <div className='single-comic__price'>{price ? price + '$' : 'Price not avalible.'}</div>
            </div>
            <Link to="/comics" className='single-comic__back'>Back to all</Link>
        </div>
    )
}



export default SingleComicPage;