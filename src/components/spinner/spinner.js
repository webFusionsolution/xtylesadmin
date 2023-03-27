
import './spinner.css'

export default function Spinner() {


    return (
        <>
         <div className="overlay">
                <div className='spinner'>
                <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                </div>

         </div>
        </>
    );

}