<script setup lang="ts">
const {
  data: users,
  execute,
  pending,
} = await useRepository("users").all({
  asyncDataOptions: { immediate: false },
})
delayedParse(users, "users", "all", pending)
</script>

<template>
  <pre>{{ pending }}</pre>
  <button @click="execute()">
    Get user names
  </button>
  <pre>{{ users }}</pre>
</template>
