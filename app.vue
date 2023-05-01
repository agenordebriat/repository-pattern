<script setup lang="ts">
const { data: users, execute } = await useRepository("user").getAll({
  asyncDataOptions: { immediate: false },
})
</script>

<template>
  <ul>
    <button @click="execute()">
      Get all users
    </button>
    <li v-for="user in users" :key="user.id">
      {{ user.name }}
    </li>
  </ul>
</template>
