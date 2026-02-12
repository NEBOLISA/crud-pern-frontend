import { useEffect, useRef, useState } from 'react'
import { useProductStore } from '../store/useProductStore.js'
import { PackageIcon, PlusCircleIcon, RefreshCcwIcon } from 'lucide-react'
import ProductCard from '../components/ProductCard.jsx'
import AddProductModal from '../components/AddProductModal.jsx'
import ModalComponent from '../components/ModalComponent.jsx'

const HomePage = () => {
  const { products, loading, error,fetchProducts,deleteProduct } = useProductStore()
  useEffect(() => {
    fetchProducts()
  }, [])
  const [selectedId, setSelectedId] = useState(null)
   const modalRef = useRef(null)
  const openModal = (id) => {
    setSelectedId(id)
    modalRef.current.showModal()
  }
  
  return (
    <div className='max-w-6xl mx-auto px-4 py-8 '>
      <div className='flex justify-between items-center mb-8'>
        <button
          className='btn btn-primary'
          onClick={() => {
            document.getElementById('add_product_modal').showModal()
          }}
        >
          <PlusCircleIcon className='size-5 mr-2' />
          Add Product
        </button>
        <button className='btn btn-ghost  btn-circle' onClick={fetchProducts}>
          <RefreshCcwIcon className='size-5' />
        </button>
      </div>
      <AddProductModal />
      {error && <div className='alert alert-error mb-8'>{error} </div>}

      {products.length === 0 && !loading && (
        <div className='flex flex-col justify-center items-center h-96 space-y-4'>
          <div className='bg-base-100 rounded-full p-6'>
            <PackageIcon className='size-12' />
          </div>
          <div className='text-center space-y-2'>
            <h2 className='text-2xl font-semibold'>No Products Available</h2>
            <p className='text-gray-500 max-w-sm'>
              There are currently no products to display. Please add new
              products
            </p>
          </div>
        </div>
      )}
      {loading ? (
        <div className=' flex justify-center items-center h-64'>
          <div className=' loading loading-spinner loading-lg'></div>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {products?.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDeleteClick={openModal}
            />
          ))}
        </div>
      )}

      <ModalComponent ref={modalRef} action={deleteProduct} id={selectedId} />
    </div>
  )
}

export default HomePage
