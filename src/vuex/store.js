import {createStore} from 'vuex'
import axios from 'axios'

export default createStore({
    state() {
        return {
            products: null,
            productsOnPage: null,
            filterProducts: null,
            notesOnPage: 8,
            cart: [],
            buyersName: '',
            pageIndex: 0,
            pagesCount: 0,
        }
    },
    mutations: {
        GET_DATA(state, data) {
            state.products = data
        },
        SET_PRODUCTS_ON_PAGE(state) {
            state.productsOnPage = state.products.slice(0, 8)
        },
        SET_PAGE_COUNT(state) {
            state.pagesCount = Math.ceil(state.filterProducts.length / state.notesOnPage)
        },
        SET_FILTER_PRODUCTS(state) {
            state.filterProducts = [...state.products]
        },
        ADD_TO_CART(state, product) {
            if (state.cart.length) {
                let isProductAdded = false
                state.cart.forEach(element => {
                    if (element.id === product.id) {
                        isProductAdded = true
                        element.count++
                    }
                });
                !isProductAdded ? state.cart.push(product) : false
                
            } else {
                state.cart.push(product)
            }
        },
        DELETE_FROM_CART(state, index) {
            return state.cart.splice(index, 1)
        },
        INCREMENT(state, item) {
            state.cart.find(product => product.id === item.id).count++
        },
        DECREMENT(state, item) {
            state.cart.find(product => product.id === item.id).count--
            if (state.cart.find(product => product.id === item.id).count == 0) {
                const index = state.cart.indexOf(item)
                state.cart.splice(index, 1)
            }
        },
        CLEAR_CART(state) {
            return state.cart = []
        },
        CHOOSE_PAGE(state, index) {
            let pageNumber = index + 1
            let start = (pageNumber - 1) * state.notesOnPage
            let end = start + state.notesOnPage
            state.productsOnPage = state.filterProducts.slice(start, end)
        },
        FILTER_PRODUCTS(state, item) {
            state.filterProducts = []
                if (item.att === 'all') {
                    state.filterProducts.push(...state.products)
                } else {
                    state.filterProducts.push(...state.products.filter(product => product.type === item.att))
                }
            state.productsOnPage = state.filterProducts.slice(0, 8)
        },
        SORT(state, methodOfSort) {            
            methodOfSort === 'fromPriceMax' ? state.filterProducts.sort((a, b) => a.price < b.price ? 1 : -1) : ''
            methodOfSort === 'fromPriceMin' ? state.filterProducts.sort((a, b) => a.price > b.price ? 1 : -1) : ''
            methodOfSort === 'fromWeightMin' ? state.filterProducts.sort((a, b) => a.weight > b.weight ? 1 : -1) : ''
            methodOfSort === 'fromWeightMax' ? state.filterProducts.sort((a, b) => a.weight < b.weight ? 1 : -1) : ''

            state.productsOnPage = state.filterProducts.slice(0, 8)
        }
    },
    actions: {
        async GET_DATA({commit}) {
            const {data} = await axios.get('https://vue-try-data-default-rtdb.europe-west1.firebasedatabase.app/products/-N1z7-le4Q5Cmv-3Ii99.json')
            commit('GET_DATA', data)
            commit('SET_PRODUCTS_ON_PAGE')
            commit('SET_FILTER_PRODUCTS')
            commit('SET_PAGE_COUNT')
        }
    },
    getters: {
        CART_QUANTITY(state) {
            return state.cart.length
        },
        CART_TOTAL(state) {
            let result = [0]

            state.cart.forEach(element => {
              result.push(element.price * element.count)
            });

            result = result.reduce((previousValue, currentValue) => previousValue + currentValue)

            return result
        }
    }
})