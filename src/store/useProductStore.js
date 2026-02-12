import axios from 'axios'
import toast from 'react-hot-toast'
import { create } from 'zustand'

// const BASE_URL = import.meta.env.MODE === "development" ?
//     "http://localhost:3001" : ""
const BASE_URL = import.meta.env.VITE_BASE_URL 
export const useProductStore = create((set, get) => ({
    products: [],
    loading: false,
    updateLoading: false,
    error: null,
  selectedProduct:null,
    formData: {
        name: '',
        description: '',
        image: '',
        price: ''
    },
    setFormData: (data) => set({ formData: data }),
    resetFormData: () => set({
        formData: {
            name: '',
            description: '',
            image: '',
            price: ''
        }
    }),
    addProduct: async (e) => {
        e.preventDefault()
        set({ loading: true })
        try {
            const { formData } = get()
            const response = await axios.post(
                `${BASE_URL}/api/products`,
                formData
            )
            const product = await response.data.data
            set((prev) => ({
                products: [...prev.products, product]
            }))
            toast.success('Product created successfully!')
            get().resetFormData()
        }
        catch (error) {
            console.log("Error in add product function", error)
            toast.error('Try again. Something went wrong')
        } finally {
            set({ loading: false })
            document.getElementById('add_product_modal').close()
        }
    },
    fetchProducts: async () => {
        set({ loading: true })
        try {
            const res = await axios.get(`${BASE_URL}/api/products`)
            const data = await res.data
            set({ products: data.data, error: null })
        } catch (error) {
            if (error.response && error.response.status === 429) {
                set({
                    error: 'Too many requests. Please try again later.',
                    products: []
                })
                return
            } else {
                set({ error: error.message })
                toast.error('Failed to fetch products. Please try again.')
            }
        } finally {
            set({ loading: false })
        }
    },
    deleteProduct: async (id) => {
        set({ loading: true })
        try {
            await axios.delete(`${BASE_URL}/api/products/${id}`)
            set((prev) => ({
                products: prev.products.filter((product) => product.id !== id)
            }))

            toast.success('Product deleted successfully')
        } catch (err) {
            console.log('Error deleting product', err)
            set({ error: err.message })
            toast.error('Try again. Something went wrong')
        } finally {
            set({ loading: false })
        }
    },
    fetchSingleProduct: async (id) => {
        set({ loading: true })
        try {
            const res = await axios.get(`${BASE_URL}/api/products/${id}`)
            const data = await res.data
            set({ selectedProduct: data.data, formData: data.data, error: null })
           
        } catch (err) {
          set({ error: err,selectedProduct:null })
          toast.error('Failed to fetch product. Please try again.')
        } finally {
            set({ loading: false })
        }
    },
    updateProduct: async (id) => {
        set({ updateLoading: true })
        try {
            const { formData } = get()
     
            const res = await axios.put(`${BASE_URL}/api/products/${id}`, formData)
            const data = await res.data;
            set({ selectedProduct: data.data })
            toast.success("Product updated successfully!")
        } catch (error) {
            set({ error: error.message })
            toast.error("Failed to update. please try again later.")
        } finally {
            set({updateLoading:false,error:null,products:[]})
      }
    },

}
))
