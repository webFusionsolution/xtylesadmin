
import './spinner.css'

export default function Spinner() {


    return (
        <>
         <div className="overlay">
                <div className='spinner'>
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                </div>

         </div>
        </>
    );

}