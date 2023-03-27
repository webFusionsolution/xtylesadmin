import './modal.css'

export default function Modal(props) {

    console.log(props)
    
    const handleCancel = () => {
        props.handleCancelEvent();
    }
    const handleDelete = () => {
        props.handleDeleteEvent();

    }
  
    return(
        <div className='fs-overlay'>
            <div className='fs-modal'>
                        <div className='content'>
                             <p>Are you sure you want to delete the product?</p>
                             <div className='button-group'>
                                <button className='btn' onClick={handleCancel}>Cancel</button>
                                <button className='btn' onClick={handleDelete}>Yes</button>
                             </div>
                        </div>        
            </div>
        </div>      
    );

}