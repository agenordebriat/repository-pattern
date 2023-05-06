<script setup lang="ts">
const {
  data: users,
  execute,
  pending,
} = await useRepository("users").names({
  asyncDataOptions: { immediate: false },
})
delayedParse(users, "users", "names", pending)
</script>

<template>
  <pre>{{ pending }}</pre>
  <button @click="execute()">
    Get user names
  </button>
  <pre>{{ users }}</pre>
</template>
