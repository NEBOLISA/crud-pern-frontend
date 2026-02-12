import { useEffect, useRef } from 'react'
import { useProductStore } from '../store/useProductStore'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeftIcon, SaveIcon, Trash2Icon } from 'lucide-react'
import ModalComponent from '../components/ModalComponent'

const ProductPage = () => {
  const {
    selectedProduct,
    loading,
    error,
    formData,
    setFormData,
    fetchSingleProduct,
    deleteProduct,
    updateLoading,
    updateProduct } = useProductStore()
  const navigate = useNavigate()
  const { id } = useParams()
  useEffect(() => {
    fetchSingleProduct(id)
  }, [fetchSingleProduct, id])

  const handleDelete = async (id) => { 
   await deleteProduct(id)
   navigate("/")
  }
  const inputRef = useRef(null)
  useEffect(() => {
    if (selectedProduct) {
     
      inputRef.current.focus()
    }
  }, [selectedProduct])
  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='loading loading-spinner loading-lg'></div>
      </div>
    )
  }
  if (error) {
    return (
      <div className='container px-4 py-8 mx-auto'>
        <div className='alert alert-error'>{error}</div>
      </div>
    )
  }
  return (
    <div className='mx-auto container px-4 py-8 max-w-4xl'>
      <button onClick={() => navigate('/')} className='btn btn-ghost mb-8'>
        <ArrowLeftIcon className='size-4 mr-2' />
        Back to Products
      </button>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div className='rounded-lg overflow-hidden shadow-lg bg-base-100'>
          <img
            src={selectedProduct?.image}
            alt={selectedProduct?.name}
            className='size-full  object-cover'
          />
        </div>
        <div className='card bg-base-100 shadow-lg'>
          <div className='card-body'>
            <h2 className='card-title text-2xl mb-6'>Edit Product</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                updateProduct(id)
              }}
              className='space-y-6'
            >
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text text-base font-medium'>
                    Product Name
                  </span>
                </label>
                <input
                  ref={inputRef}
                  type='text'
                  placeholder='Enter product name'
                  className='input border-[0.4px] focus:border-none rounded-md mt-2 w-full '
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text text-base font-medium'>
                    Price
                  </span>
                </label>
                <input
                  type='number'
                  min='0'
                  step='0.01'
                  placeholder='0.00'
                  className='input border-[0.4px] focus:border-none rounded-md mt-2 w-full '
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </div>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text text-base font-medium'>
                    Image URL
                  </span>
                </label>
                <input
                  type='text'
                  placeholder='Enter image URL'
                  className='input border-[0.4px] focus:border-none rounded-md mt-2 w-full '
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                />
              </div>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text text-base font-medium'>
                    Description
                  </span>
                </label>
                <textarea
                  placeholder='Enter product description'
                  className='textarea border-[0.4px] focus:border-none rounded-md mt-2 w-full '
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
              <div className='flex justify-center w-full sm:justify-between  gap-4  flex-wrap items-center mt-8'>
                <button
                  type='button'
                  onClick={() => {
                    document.getElementById('my_modal_1').showModal()
                  }}
                  className='btn btn-error w-full sm:w-auto'
                >
                  <Trash2Icon className='size-4 mr-2' />
                  Delete Product
                </button>
                <button
                  type='submit'
                  className='btn btn-primary w-full sm:w-auto'
                  disabled={
                    updateLoading ||
                    !formData.name ||
                    !formData.price ||
                    !formData.image
                  }
                >
                  {updateLoading ? (
                    <div className='loading loading-spinner loading-lg'></div>
                  ) : (
                    <>
                      <SaveIcon className='size-4 mr-2'  />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
        <ModalComponent action={handleDelete} id={id}  />
      </div>
    </div>
  )
}

export default ProductPage
