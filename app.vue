<script setup lang="ts">
const { data: users } = await useRepository("user").getAll()
</script>

<template>
  <ul>
    <li v-for="user in users" :key="user.id">
      {{ user.name }}
    </li>
  </ul>
</template>
