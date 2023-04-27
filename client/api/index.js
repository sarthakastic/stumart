import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:8001/',
})

// AUTH API's

export const signin = (formData) => API.post('/users/signin', formData) //used for sign in

export const signup = (formData) => API.post('/users/signup', formData) //used for sign up

export const getUserInfo = (id) => API.get(`/users/?id=${id}`)

export const editProfile = (id, formData) =>
  API.patch(`/users/?id=${id}`, formData) // used to update profile

// ADDRESS API's

// used to add address
export const addAddress = (formData) =>
  API.post('/address', formData, {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem('profile')).token
      }`,
      'X-Custom-Header': 'foobar',
    },
  })

// used to get address
export const getAddress = (creator) => API.get(`/address?creator=${creator}`)

export const updateAddress = (_id, formData) => {
  API.patch(`/address/?_id=${_id}`, formData, {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem('profile')).token
      }`,
      'X-Custom-Header': 'foobar',
    },
  })
}

// PRODUCT API's

// used to create products
export const createProduct = (newPost) =>
  API.post('/product', newPost, {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem('profile')).token
      }`,
      'X-Custom-Header': 'foobar',
    },
  })

// used to fetch all products
export const fetchProducts = (page, limit) =>
  API.get(`/product?page=${page}&limit=${limit}`)

// used to search all products using product title and category
export const searchProducts = (searchQuery) =>
  API.get(
    `/product/search?searchQuery=${searchQuery.search || 'none'}&category=${
      searchQuery.category || 'none'
    }`
  )

// used to get product details
export const getProduct = (id) =>
  API.get(`/product/${id}`, {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem('profile')).token
      }`,
      'X-Custom-Header': 'foobar',
    },
  })

// used to get all products uploaded by a user
export const getUserProduct = (creator) =>
  API.get(`/product/userData/${creator}`)

// used to update product
export const updateProduct = (id, formData) =>
  API.patch(`/product/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem('profile')).token
      }`,
      'X-Custom-Header': 'foobar',
    },
  })

// used to delete product
export const deleteProduct = (id) =>
  API.delete(`/product/${id}`, {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem('profile')).token
      }`,
      'X-Custom-Header': 'foobar',
    },
  })
