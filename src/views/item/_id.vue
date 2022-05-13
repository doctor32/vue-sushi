<template>
    <div>
    <button class="mt-5 bg-gray-100 rounded-xl px-5 py-1 text-x hover:bg-gray-200 duration-300 " @click="$router.go(-1)">Назад</button>
    <div class="flex"> 
        <img  class="w-1/2" :src="item.imgSrc" alt="">
        <div class="mt-10">
            <p class="font-bold text-4xl">{{item.title}}</p>
            <p class="mt-10"><span class="font-bold"> Состав: </span>Калифорния с лососем в кунжуте, Нежный с курицей, Нежный с сыром, Филадельфия лайт NEW, Футомаки с лососем. Соевый соус – 120 мл (3шт). Васаби – 25 г. Имбирь – 35 г.</p>
            <button class="bg-purple-500 hover:bg-purple-700 duration-500 text-white p-2 rounded-xl mt-16 :hover mb-3"
            @click="addToCart"
            >Добавить в корзину</button>
        </div>

    </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
 
    export default {
        computed: {
            allItems() {
                return this.$store.getters.PRODUCTS
            },
            item() {
                return this.allItems.filter(item => item.id === this.$route.params.id)[0]
            },
            newItem() {
            return { 
                ...this.item,
                count: 1 
                }
        }
        },
        methods: {
            ...mapActions(['ADD_TO_CART']),
            addToCart() {
                this.ADD_TO_CART(this.newItem)
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>