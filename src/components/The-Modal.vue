<template>
    <div ref="modalBody" class="fixed top-0	left-0 modal__body rou">
        <div class="modal bg-purple-800 rounded-xl">

            <div>
                <p class="text-xl mt-2 text-white">Заказ принят!</p>
                <p class="mt-4 text-gray-300">{{this.$store.state.buyersName}}, cпасибо за заказ. Мы скоро с Вами свяжемся.</p>
            </div>

            <button @click="closeModal" class="mb-3 rounded-xl px-5 bg-gray-300 hover:bg-white duration-500">Понятно</button>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            closeModal() {
                this.$emit('closeModal')
            }
        }
    }
</script>

<style lang="scss" scoped>
.modal__body {
    background: rgba(0, 0, 0, 0.9);
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
.modal {
    width: 400px;
    padding: 5px;
    min-height: 200px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    button {
    
    }
    p{
        text-align: center;
    }
}
</style>