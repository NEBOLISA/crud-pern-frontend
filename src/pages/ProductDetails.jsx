import { useEffect, } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useProductStore } from '../store/useProductStore'
import { ArrowLeftIcon } from 'lucide-react'

const ProductDetails = () => {
  const { id } = useParams()

 const { fetchSingleProduct, loading, selectedProduct,error } =
   useProductStore()

  useEffect(() => {
   fetchSingleProduct(id)
  }, [fetchSingleProduct, id])
const navigate = useNavigate()
  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <span className='loading loading-spinner loading-lg text-primary'></span>
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='alert alert-error w-96'>
          <span>{error}</span>
        </div>
      </div>
    )
  }

 

  return (
    <div className='min-h-screen bg-base-200 py-10 px-4'>
      <button onClick={() => navigate('/')} className='btn btn-ghost mb-8'>
        <ArrowLeftIcon className='size-4 mr-2' />
        Back to Products
      </button>
      <div className='max-w-6xl mx-auto'>
        <div className='card lg:card-side bg-base-100 shadow-xl'>
          {/* Product Image */}
          <figure className='lg:w-1/2 h-100'>
            <img
              src={selectedProduct?.image}
              alt={selectedProduct?.name}
              className='w-full h-full object-fit'
            />
          </figure>

          {/* Product Info */}
          <div className='card-body lg:w-1/2'>
            <h1 className='card-title text-3xl font-bold'>
              {selectedProduct?.name}
            </h1>

            <p className='text-2xl text-primary font-semibold mt-2'>
              ₦{selectedProduct?.price}
            </p>

            <div className='divider'></div>

            <p className='text-base-content leading-relaxed'>
              {selectedProduct?.description}
            </p>

            <div className='card-actions justify-start mt-6'>
              <button className='btn btn-primary'>Add to Cart</button>

              <button className='btn btn-outline'>Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
