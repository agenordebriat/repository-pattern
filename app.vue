<script setup lang="ts">
// PostsRepository
const count = ref(0)
const incrementCount = () => count.value++

const { data: countFromApi } = await useRepository("posts").update(count)
// "asyncDataOptions: { watch: false }" to disable updates when the count changes

// UsersRepository
const { data: users } = await useRepository("users").all()

const {
  data: userNames,
  execute,
  pending,
} = await useRepository("users").names({
  asyncDataOptions: { immediate: false },
})

// Mandatory to validate the data since "immediate" is set to false
delayedParse(userNames, "users", "names", pending)
</script>

<template>
  <ul>
    <li>
      <h2>PostsRepository</h2>
      <h3>Update</h3>
      <pre>Count: {{ count }}</pre>
      <button @click="incrementCount">
        Increment count
      </button>
      <pre>{{ countFromApi }}</pre>
    </li>
    <li>
      <h2>UsersRepository</h2>
      <h3>Users</h3>
      <pre>{{ users }}</pre>
      <h3>User names</h3>
      <button @click="execute()">
        Get user names
      </button>
      <pre>pending: {{ pending }}</pre>
      <pre v-if="userNames">{{ userNames }}</pre>
    </li>
  </ul>
</template>

<style>
body {
  font-family: sans-serif;
  color: white;
  background-color: hsl(0, 0%, 8%);
}

h2 {
  display: inline-block;
}

ul {
  display: flex;
  flex-wrap: wrap;
  list-style: upper-roman inside;
  gap: 2rem 4rem;
  padding-left: 2rem;
}

li::marker {
  font-size: 1.5rem;
  font-weight: bold;
}

pre {
  background-color: hsl(0, 0%, 10%);
  padding: 0.75rem;
  border-radius: 5px;
}
</style>
