<template>
    <div class="catalog__item drop-shadow bg-gray-100 flex flex-col items-center rounded-xl">
        <img :src="item.imgSrc" alt="item-img" class="w-60 ">
        <p class="font-semibold">{{itemTitleSubstr}}</p>
        <p>Вес: {{item.weight}} г</p>
        <p>Цена: {{item.price}}₴</p>
        <button class="bg-purple-500 hover:bg-purple-700 duration-500 text-white p-2 rounded-xl mt-4 :hover mb-3"
        @click="addToCart"
        >Добавить в корзину</button>

        <router-link :to="{ name: 'item', params: { id: item.id } }">        
            <button class="bg-gray-400 hover:bg-gray-700 duration-500 text-white py-2 px-10 rounded-xl :hover mb-5"
            @click="aboutRoll"
            >Подробнее</button>
        </router-link>

    </div>
</template>

<script>
export default {
props: ['item'],
    computed: {
        itemTitleSubstr(){
            if (this.item.title.length > 18) {
                return this.item.title.substr(0, 18) + '...'
            }
            return this.item.title
        },
        newItem() {
            return { 
                ...this.item,
                count: 1 
                }
        }
    },
    methods: {
        addToCart() {
            this.$emit('addToCart', this.newItem)
        }
    }
}
</script>

<style lang="scss" scoped>
.catalog__item{
    height: 335px;
}
</style>