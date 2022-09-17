<template>
  <div class="home">
    <food-table />
  </div>
</template>

<script>
import FoodTable from '@/components/FoodTable.vue'
// @ is an alias to /src

export default {
  name: 'HomeView',
  components: {
    FoodTable
  }
}
</script>
