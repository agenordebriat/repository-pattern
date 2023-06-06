<script setup lang="ts">
// PostsRepository
// Post by ID
const postId = ref(1)
const incrementPostId = () => postId.value++

const { data: posts } = await useRepository("posts").getPostById(postId)

// Update post
const count = ref(0)
const incrementCount = () => count.value++

const { data: countFromApi } = await useRepository("posts").updatePost(count) // Set "watch" option to "false" to disable automatic updates on count change

// UsersRepository
// User names
const {
  data: userNames,
  execute,
  pending,
} = await useRepository("users").getUserNames({
  options: { immediate: false },
})

delayedParse(userNames, "users", "userNames", pending) // Set "watch" option to "false" to disable automatic updates on userNames change

// Users
const { data: users } = await useRepository("users").getUsers()

// 🦄
const degrees = ref(0)

const { pause, resume, isActive } = useIntervalFn(
  () => (degrees.value = (degrees.value + 1) % 360),
  100,
  { immediate: false },
)
</script>

<template>
  <Body
    :style="`--rainbow-color: hsl(${degrees}deg 100% ${
      isActive ? '75%' : '100%'
    })`"
  />
  <button
    class="unicorn"
    :class="{ active: isActive }"
    @click="isActive ? pause() : resume()"
  >
    🦄
  </button>
  <ul :class="{ 'rainbow-mode': isActive }">
    <li>
      <h2>PostsRepository</h2>
      <h3>Post by ID</h3>
      <pre>Post ID: {{ postId }}</pre>
      <button @click="incrementPostId">
        Increment post ID
      </button>
      <pre>{{ posts }}</pre>
      <h3>Update post</h3>
      <pre>Count: {{ count }}</pre>
      <button @click="incrementCount">
        Increment count
      </button>
      <pre>{{ countFromApi }}</pre>
    </li>
    <li>
      <h2>UsersRepository</h2>
      <h3>User names</h3>
      <button @click="execute()">
        Fetch user names
      </button>
      <pre>pending: {{ pending }}</pre>
      <pre v-if="userNames">{{ userNames }}</pre>
      <h3>Users</h3>
      <pre>{{ users }}</pre>
    </li>
  </ul>
</template>

<style>
body {
  font-family: sans-serif;
  background-color: hsl(0, 0%, 8%);
  margin: 1.5rem;
}

button {
  background-color: transparent;
  padding: 0;
  border: none;
  cursor: pointer;
}

.unicorn {
  font-size: 1.5rem;
  filter: saturate(0);
  transition: filter 0.5s ease-in-out, scale 125ms ease-in-out;
}

.unicorn:hover {
  scale: 1.25;
  animation: wiggle 250ms ease-in-out infinite;
}

@keyframes wiggle {
  from,
  to {
    rotate: 0deg;
  }

  50% {
    rotate: 10deg;
  }
}

.unicorn.active {
  filter: saturate(1);
}

h2 {
  display: inline-block;
}

ul {
  display: flex;
  flex-wrap: wrap;
  list-style: upper-roman inside;
  gap: 2rem 4rem;
  padding: 0;
  margin: 0;
  color: var(--rainbow-color);
  transition: color 0.5s ease-in-out;
}

ul:not(.rainbow-mode) {
  color: white;
}

ul button {
  background-color: var(--rainbow-color, white);
  padding: 0.375rem 0.75rem;
  border-radius: 5px;
  transition: background-color 0.5s ease-in-out;
}

li::marker {
  font-size: 1.5rem;
  font-weight: bold;
}

pre {
  max-width: 50ch;
  padding: 0.75rem;
  background-color: hsl(0, 0%, 10%);
  border-radius: 5px;
  white-space: pre-wrap;
}
</style>
