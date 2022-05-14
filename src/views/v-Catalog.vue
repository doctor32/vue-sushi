<template>
<div>

    <div class="categories">
        <ul class="flex gap-5 justify-center text-xl cursor-pointer">
            <li @click="filterItems(item, index)" 
            class="hover:text-red-500" 
            v-for="(item, index) in categoriesOfProducts" 
            :key="item.id"
            :class="index === categoryIndex ? ['active__li', 'font-medium'] : '' "
            >{{item.name}}</li>
        </ul>
    </div>

    <div class="hr mt-3 w-100  bg-gray-300"></div>

    <div class="categories flex gap-5 justify-center text-xl cursor-pointer mt-3">
        Сортировать по:
        <select v-model="sort" 
        @change="sortBy"
        >
            <option value="" disabled selected>Выберите вариант</option>
            <option value="fromPriceMax">Цене по убыванию</option>
            <option value="fromPriceMin">Цене по возрастанию</option>
            <option value="fromWeightMax">Весу по убыванию</option>
            <option value="fromWeightMin">Весу по возрастанию</option>
        </select>

    </div>

    <div class="catalog__items flex flex-wrap gap-4 mt-8 bg-gray-200 p-4 rounded-xl">
        <vCatalogItem 
        v-for="item in $store.state.productsOnPage" 
        :key="item.id"
        :item="item"
        @addToCart="addToCart"
        />
    </div>

    
    <vPagination 
    @choosePage="choosePage"
    :pagesCount="$store.state.pagesCount"
    />

</div>
</template>

<script>
import vPagination from '@/components/v-Pagination.vue'
import vCatalogItem from '@/components/v-Catalog-Item.vue'
import {mapActions} from 'vuex'

export default {
data() {
        return {
            categoryIndex: 0,
            products: this.$store.state.productsOnPage,
            sort: '',
            categoriesOfProducts: [
                {   
                    id: 0,
                    name: 'Все',
                    att: 'all'
                },
                {   
                    id: 1,
                    name: 'Ролы',
                    att: 'roll'
                },
                {   
                    id: 2,
                    name: 'Сеты',
                    att: 'set'
                },
                {   
                    id: 3,
                    name: 'Супы',
                    att: 'soup'
                },
            ]
        }
    },
    components: {vCatalogItem, vPagination},
    methods: {
        ...mapActions(['CHOOSE_PAGE', 'FILTER_PRODUCTS', 'DISABLE_FILTERS', 'SORT', 'GET_DATA']),
        addToCart(data) { 
            this.$store.commit('ADD_TO_CART', data)
        },
        choosePage(idx) {
            this.$store.commit('CHOOSE_PAGE', idx)
        },
        filterItems(item, index) {
            this.sort = ''
            this.categoryIndex = index
            this.$store.state.pageIndex = 0
            this.$store.commit('FILTER_PRODUCTS', item)
            this.$store.commit('SET_PAGE_COUNT')
        },
        sortBy() {
            this.$store.state.pageIndex = 0
            this.$store.commit('SORT', this.sort)
        },
        mounted() {
        },
    },
}

</script>

<style lang="scss" scoped>
.active__li {
    color: red;
}
.catalog__items {
    min-height: 700px;
}
.hr {
    height: .2px;
}
</style>