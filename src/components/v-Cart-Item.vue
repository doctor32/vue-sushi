<template>
    <div class="cart__item flex bg-gray-300 rounded-xl">
        <img class="w-72 " :src="item.imgSrc">
        <div>
            <p class="mt-4 font-semibold text-m ">{{item.title}}</p>
            <p class=" mt-4"><span class="font-medium">Вес: </span>{{item.weight}} г</p>
            <p class="mt-2"><span class="font-medium">Цена: </span>{{item.price}}₴</p>
            <div class="mt-2 flex">
                <span class="font-medium">Количество: </span> 
                <div class="flex ">
                    <button class=" btn bg-slate-200 px-1 flex items-center content-center rounded-lg hover:bg-white mx-1 ml-3 duration-300 w-5"
                        @click="increment"
                        >+
                    </button>  
                    {{item.count}} 
                    <button class="btn bg-slate-200 px-1 flex items-center content-center rounded-lg hover:bg-white mx-1 duration-300 w-5"
                        @click="decrement"
                        >-
                    </button>
                </div>
            </div>
        </div>
        <button @click="deleteProduct" 
            class="bg-red-500 text-white self-center px-6 py-2 rounded-xl hover:bg-red-600 duration-300" 
            style="margin: 0 30px 0 auto">
            Удалить
        </button>
    </div>
</template>

<script>
    export default {
        props: ['item'],
        methods: { 
            deleteProduct() {
                this.$emit('deleteFromCart', this.item)
            },
            increment() {
                this.$store.commit('INCREMENT', this.item)
            },
            decrement() {
                this.$store.commit('DECREMENT', this.item)
            }
        }
    }
</script>

<style lang="scss" scoped>
.btn {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>