<script setup>
import { useSlots, ref, watch } from 'vue';
import SharedSearch from '../Shared/SharedSearch.vue';
const slots = useSlots();

const searchInput = ref('')

const { games } = defineProps({
  games: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['setGameView'])


const onSearch = () => {
  const normalizedSearch = searchInput.value.toLowerCase();

  if (normalizedSearch.trim() === '') {
    emit('setGameView', games)
    return;
  }
  const filteredGames = games.filter((game) => game.title.toLowerCase().includes(searchInput.value.toLowerCase()))
  emit('setGameView', filteredGames)
}

watch(searchInput, (newValue) => {
  const normalizedSearch = newValue.toLowerCase();

  if (normalizedSearch.trim() === '') {
    emit('setGameView', games)
    return;
  }
  const filteredGames = games.filter((game) => game.title.toLowerCase().includes(normalizedSearch))
  emit('setGameView', filteredGames)

})

</script>

<template>
  <section>
    <slot name="title" />
    <h2 v-if="slots.title === undefined">Recent games</h2>
    <div class="game-layout">
      <SharedSearch v-model="searchInput" class="my-class" @search="onSearch" />
      <slot />
    </div>
  </section>
</template>

<style scoped>
.game-layout {
  display: grid;
  gap: 2rem;
  margin: 1rem auto;
  max-width: 90%;
}
</style>
