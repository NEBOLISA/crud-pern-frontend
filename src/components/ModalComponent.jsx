

const ModalComponent = ({ ref,action,id }) => {

  return (
    <dialog id='my_modal_1' ref={ref} className='modal modal-bottom sm:modal-middle'>
      <div className='modal-box'>
        <h2 className='text-center'>
          Are you sure you want to delete this product?
        </h2>
        <div className='modal-action'>
          <form method='dialog' className='flex gap-3 items-center'>
            <div>
              <button
                className='btn btn-error'
                onClick={() => action(id)}
              >
                Yes
              </button>
            </div>
            <button className='btn'>No</button>
          </form>
        </div>
      </div>
      <form method='dialog' className='modal-backdrop'>
        <button>close</button>
      </form>
    </dialog>
  )
}

export default ModalComponent
