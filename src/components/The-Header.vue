<template>
    <header class="p-5 px-20 bg-purple-400 flex justify-between items-center fixed top-0 left-0">
      <router-link to="/">
        <span class="uppercase font-medium">logo</span>
      </router-link>
      
        <nav>
          <ul class="flex gap-10 items-center">
            <li><router-link class="cursor-pointer hover:text-white duration-300" to="/catalog"><p>Каталог</p> </router-link></li>
            <li><router-link class="cursor-pointer hover:text-white duration-300" to="/about"><p>О нас</p> </router-link></li>
            <li><router-link to="/cart" class="cursor-pointer flex gap-3 items-center hover:text-white duration-300"><p>Корзина</p> 
            <div :class="this.$store.getters.CART_QUANTITY > 0 ? 'opacity-100' : 'opacity-0'" class="bg-red-500 text-white rounded-full w-8 h-8 flex justify-center items-center duration-300" >{{CART_QUANTITY}}</div>
            </router-link></li>
            <p :class="this.$store.getters.CART_QUANTITY > 0 ? 'opacity-100' : 'opacity-0'" class="-ml-8 duration-1000 text-red-900 font-medium">{{CART_TOTAL}}₴</p>

          </ul>
        </nav>
    </header>
</template>

<script>
import { mapGetters } from 'vuex'

    export default {
        computed: {
          ...mapGetters(['CART_QUANTITY', 'CART_TOTAL'])
        }
    }
</script>

<style lang="scss" scoped>
.router-link-active {
  p {
    color: white;
    border-bottom: 2px solid white;
  }

}
header {
  width: 100%;
  z-index: 2;
}
</style>