import { createStore } from 'vuex';

function updateLocalStorage(cart){
    localStorage.setItem('cart', JSON.stringify(cart))
}

export default createStore({
    state: {
        cart: [],
        user: null
    },

    getters: {

        // Cart
        productQuantity: (state) => (product) => {
            const item = state.cart.find(i => i.id === product.id)

            if (item) return item.quantity
            else return null
        },
        cartItems: (state) => {
            return state.cart;
        },
        cartTotal: state => {
            let total = state.cart.reduce((a, b) => a + (b.precio * b.quantity), 0)
            return total.toFixed(2);
        },

        // User
        isLoggedIn(state){
            return state.user !== null
        }

    },
    mutations: {

        // Cart mutators
        addToCart(state, product) {
            let item = state.cart.find(i => i.id === product.id)

            if (item) {
                item.quantity++
            }else{
                state.cart.push({...product, quantity: 1})
            }

            updateLocalStorage(state.cart)
        },

        removeFromCart(state, product){
            let item = state.cart.find(i => i.id === product.id)

            if (item) {
                if (item.quantity > 1) {
                    item.quantity--
                }else{
                    state.cart = state.cart.filter(i => i.id !== product.id)
                }
            }
            updateLocalStorage(state.cart)
        },
        updateCartFromLocalStorage(state){
            const cart = localStorage.getItem('cart')
            if (cart) {
                state.cart = JSON.parse(cart);
            }
        },

        // User login info
        setAuthUser(state, user){
            state.user = user;
        }
    },
});
