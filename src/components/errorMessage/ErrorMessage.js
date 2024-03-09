import img from './error.gif';

const ErrorMessage = function(){
    return(
        <img style={{
            display: 'block', width: 250, height: 250, objectFit: 'contain', margin: '0 auto'
        }} src={img} alt="Error"></img>
    )
}
export default ErrorMessage;