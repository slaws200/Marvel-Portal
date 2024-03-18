import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=2a595b5cce58a11818ab35614802e7b4';
    const _baseOffset = 0;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?&${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComic);
    }

    const _transformCharacter = (char) => {
        return{
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            id: char.id,
            comics: char.comics.items
        }
        
    }
    const _transformComic = (comic) => {
        return{
            name: comic.title,
            description: comic.description,
            thumbnail: comic.thumbnail.path + '.' + comic.thumbnail.extension,
            homepage: comic.urls[0].url,
            id: comic.id,
            price: comic.prices[0].price
        }
        
    }
    return {loading, error, getAllCharacters, getCharacter, clearError, getAllComics}
}

export default useMarvelService;