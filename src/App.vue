<script setup>
import LayoutHero from './components/Layout/LayoutHero.vue';
import GameCard from './components/Games/GameCard.vue';
import GameLayout from './components/Games/GameLayout.vue';
import GameModal from './components/Games/GameModal.vue';
import SharedLoader from './components/Shared/SharedLoader.vue';
import {ref } from 'vue';
import { useFetch } from './composables/useFetch';
const API_URL = "https://gamestreamapi.herokuapp.com/api/games"
const gamesView = ref([])
const {state} = useFetch(API_URL, (json)=> {
  gamesView.value = json
})

const setGameView = (filteredGames) => {
  gamesView.value = filteredGames
}

</script>

<template>
  <LayoutHero />
  <main>
    <SharedLoader v-if="state.isLoading"/>
    <GameLayout v-else :games="state.data" @set-game-view="setGameView">
      <template #title>
        <h3>Juegos actualizados</h3>
      </template>
      <GameCard v-for="game in gamesView" :key="game.title" :game="game" />
    </GameLayout>
    <Teleport to="body">
      <GameModal />
    </Teleport>

  </main>
</template>

<style scoped>
main {
  padding: 2rem;
}
</style>
