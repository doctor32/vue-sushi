<template>
    <div v-if="pagesCount > 1" class="pagination flex gap-3 justify-center mt-5">
        <div class="pagination__page bg-gray-400 text-white px-4 py-3  rounded-xl hover:bg-gray-200 hover:text-black duration-300 cursor-pointer" 
        v-for="(item, idx) in pagesCount" 
        :key="idx"
        @click="choosePage(idx)"
        :class="this.$store.state.pageIndex === idx ? 'active__page' : '' "
        >{{idx+1}}</div>
    </div>
</template>

<script>
export default {
        props: ['pagesCount'],
    data() {
        return {
            // pageIndex: 0
        }
    },
    methods: {
        choosePage(idx) {
            this.$store.state.pageIndex = idx
            this.$emit('choosePage', idx)
        }
    },
}
</script>

<style lang="scss">
.active__page {
    background:rgb(126 34 206 );
}
</style>