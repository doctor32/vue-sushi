<template>
    <div class="bg-gray-100 rounded-xl p-5 mt-12 flex flex-col gap-10">
        <p class="text-center text-xl">{{$store.state.cart.length > 0 ? 'Список товаров:' : 'Ваша корзина пока что пуста.'}}</p>

        <div class="flex gap-5" v-if="$store.state.cart.length">

            <div class="flex flex-col gap-5 flex-1">
            <vCartItem 
            v-for="(item, index) in $store.state.cart" :key="item.id"
            :item="item"
            @deleteFromCart="deleteFromCart(index)"
            />
            </div>

            <div class="item-self">
                <form action="" class="flex flex-col border-2 border-gray-400 rounded-3xl px-3 py-4" @submit.prevent>
                    <h2 class="text-xl mb-3">Оформить заказ</h2>
                    <p v-if="error" class="text-red-600 mb-2">{{error}}</p>
                    <label class="mb-2" for="">
                        <input type="text" v-model="name" class="p-2" placeholder="Введите Ваше имя">
                    </label>
                     <label class="mb-2" for="">
                        <input type="number" v-model.trim="number" class="p-2" placeholder="Введите Ваш номер">
                    </label>
                     <div>
                        К оплате:  <span class="font-semibold">{{CART_TOTAL}}₴</span> 
                     </div> 
                     <button class="bg-green-500 text-white self-center px-8 py-2 rounded-xl hover:bg-green-600 duration-300 mt-5"
                     @click="makeOrder">
                     Оформить заказ</button>
                     <button class="bg-red-500 text-white self-center px-6 py-2 rounded-xl hover:bg-red-600 duration-300 mt-2"
                     @click="clearCart"
                     >Очистить корзину</button>
                </form>
                

            </div>
        </div>


                <theModal 
                v-if="isModalOpen"
                @closeModal="closeModal"
                />
    </div>
</template>

<script>
import vCartItem from '@/components/v-Cart-Item'
import theModal from '@/components/The-Modal.vue'
import { mapGetters} from 'vuex'


export default {
    data() {
        return {
            name: '',
            number: '',
            isModalOpen: false,
            error: '',
            isValidForm: false
        }
    },
    components: {vCartItem, theModal},
    computed: {
        ...mapGetters(['CART_TOTAL'])
    },
    methods: {
        deleteFromCart(index) {
            this.$store.commit('DELETE_FROM_CART', index)
        },
        clearCart() {
            this.$store.commit('CLEAR_CART')
        },
        makeOrder() {
            this.validate()
            if (this.isValidForm) {
                this.$store.state.buyersName = this.name
                this.isModalOpen = true
                this.$store.state.cart = []
            }

        },
        closeModal() {
            console.log('work')
            this.isModalOpen = false
        },
        validate() {
            if (this.name.length > 1 && this.number.length > 2 ) {
                this.isValidForm = true
            }
            if (this.number.length < 1 ) {
                this.error = 'Введите корректный номер'
            }
            if (this.name.length < 1 ) {
                this.error = 'Введите корректное имя'
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>