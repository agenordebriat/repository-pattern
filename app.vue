<script setup lang="ts">
const { data: users } = await useRepository("users").all()

const {
  data: userNames,
  execute,
  pending,
} = await useRepository("users").names({
  asyncDataOptions: { immediate: false },
})

delayedParse(userNames, "users", "names", pending)
</script>

<template>
  <pre>{{ users }}</pre>
  <pre>{{ pending }}</pre>
  <button @click="execute()">
    Get user names
  </button>
  <pre>{{ userNames }}</pre>
</template>
