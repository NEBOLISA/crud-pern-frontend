import { EditIcon, Trash2Icon } from 'lucide-react'

import { Link, useNavigate } from 'react-router-dom'


function ProductCard({ product, onDeleteClick }) {
const navigate = useNavigate()
  return (
    <div onClick={() => navigate(`/product-details/${product.id}`)} className='card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 cursor-pointer'>
      <figure className='relative pt-[56.25%]'>
        <img
          src={product.image}
          alt={product.name}
          className='absolute top-0 left-0 w-full h-full object-cover'
        />
      </figure>
      <div className='card-body'>
        <h2 className='card-title text-lg font-semibold'>{product.name}</h2>
        <p className='text-2xl font-bold text-primary'>
          ₦{Number(product.price).toFixed(2)}
        </p>

        <div className=' card-actions justify-end mt-4'>
          <Link
            to={`/product/${product.id}`}
            onClick={(e)=>{e.stopPropagation()}}
            className='btn btn-circle btn-outline btn-info btn-sm'
          >
            <EditIcon className='size-4' />
          </Link>
          <button
            className='btn btn-sm btn-circle btn-error btn-outline'
            onClick={() => {
              onDeleteClick(product.id)
            }}
          >
            <Trash2Icon className='size-4' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
