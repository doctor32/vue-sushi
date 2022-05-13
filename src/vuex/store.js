import {createStore} from 'vuex'
import products from './modules/products.js'

export default createStore({
    state() {
        return {
            products,
            productsOnPage: products.slice(0, 8),
            filterProducts: [...products],
            notesOnPage: 8,
            pagesCount: Math.ceil(products.length / 8),
            cart: [],
            buyersName: '',
            pageIndex: 0
        }
    },
    mutations: {
        SET_TO_CART(state, product) {
            if(state.cart.length) {
                let isProductAdded = false
                state.cart.forEach(element => {
                    if (element.id === product.id) {
                        isProductAdded = true
                        element.count++
                    }
                });

                if(!isProductAdded) {
                    state.cart.push(product)
                }

            } else {
                state.cart.push(product)
            }
        },
        DELETE_FROM_CART_M(state, index) {
            return state.cart.splice(index, 1)
        },
        SET_INCREMENT(state, item) {
            state.cart.find(product => product.id === item.id).count++
        },
        SET_DECREMENT(state, item) {
            state.cart.find(product => product.id === item.id).count--
            if (state.cart.find(product => product.id === item.id).count == 0) {
                const index = state.cart.indexOf(item)
                state.cart.splice(index, 1)
            }
        },
        SET_CLEAR_CART(state) {
            return state.cart = []
        },
        SET_CHOOSE_PAGE(state, index) {
            let pageNumber = index + 1
            let start = (pageNumber - 1) * state.notesOnPage
            let end = start + state.notesOnPage
            console.log(state.filterProducts);

            state.productsOnPage = state.filterProducts.slice(start, end)
        },
        SET_FILTRED_PRODUCTS(state, item) {
            state.filterProducts = []
            state.filterProducts.push(...state.products.filter(product => product.type === item.att))

            state.productsOnPage = state.filterProducts.slice(0, 8)
        },
        SET_DISABLE_FILTERS(state) {
            state.filterProducts = []
            state.filterProducts.push(...state.products)
            state.productsOnPage = state.filterProducts.slice(0, 8)
        },
        SET_SORT(state, methodOfSort) {
            console.log(state, methodOfSort);
            function sorByMaxPrice(arr) {
                arr.sort((a, b) => a.price < b.price ? 1 : -1)
            }
            function sorByMinPrice(arr) {
                arr.sort((a, b) => a.price >b.price ? 1 : -1)
            }
            function sorByMinWeight(arr) {
                arr.sort((a, b) => a.weight > b.weight ? 1 : -1)
            }
            function sorByMaxWeight(arr) {
                arr.sort((a, b) => a.weight < b.weight ? 1 : -1)
            }
            
            methodOfSort === 'fromPriceMax' ? sorByMaxPrice(state.filterProducts) : ''
            methodOfSort === 'fromPriceMin' ? sorByMinPrice(state.filterProducts) : ''
            methodOfSort === 'fromWeightMin' ? sorByMinWeight(state.filterProducts) : ''
            methodOfSort === 'fromWeightMax' ? sorByMaxWeight(state.filterProducts) : ''


            state.productsOnPage = state.filterProducts.slice(0, 8)
        }
    },
    actions: {
        ADD_TO_CART( {commit}, product,) {
            commit('SET_TO_CART', product)
        },
        DELETE_FROM_CART( {commit}, index) {
            commit('DELETE_FROM_CART_M', index)
        },
        CLICK_INCREMENT({commit}, item) {
            commit('SET_INCREMENT', item)
        },
        CLICK_DECREMENT({commit}, item) {
            commit('SET_DECREMENT', item)
        },
        CLEAR_CART({commit}) {
            commit('SET_CLEAR_CART')
        },
        CHOOSE_PAGE({commit}, index) {
            commit('SET_CHOOSE_PAGE', index)
        },
        FILTER_PRODUCTS({commit}, item) {
            commit("SET_FILTRED_PRODUCTS", item)
        },
        DISABLE_FILTERS({commit}) {
            commit('SET_DISABLE_FILTERS')
        },
        SORT({commit}, methodOfSort) {
            commit('SET_SORT', methodOfSort)
        }
    },
    getters: {
        CART_G(state) {
            return state.cart
        },
        CART_QUANTITY(state) {
            return state.cart.length
        },
        PRODUCTS(state) {
            return state.products
        },
        CART_TOTAL(state) {
            let result = [0]

            state.cart.forEach(element => {
              result.push(element.price * element.count)
            });

            result = result.reduce((previousValue, currentValue) => previousValue + currentValue)

            return result
        },
        FILTRED_PRODUCTS(state) {
            return state.filterProducts
        },
        PAGE_COUNT (state, getters) {
            return Math.ceil(getters.FILTRED_PRODUCTS.length / state.notesOnPage)
        }
    }
})