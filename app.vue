<script setup lang="ts">
const {
  data: users,
  execute,
  pending,
} = await useRepository("user").getAll({
  asyncDataOptions: { immediate: false },
})
</script>

<template>
  <pre>{{ pending }}</pre>
  <ul>
    <button @click="execute()">
      Get all users
    </button>
    <li v-for="user in users" :key="user.id">
      {{ user.name }}
    </li>
  </ul>
</template>
