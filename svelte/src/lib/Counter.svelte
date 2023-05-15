<script>
  let count = 0
  const increment = () => {
    count += 1
  }
  let shit = 'shit';
</script>

<button on:click={increment}>
  count is {count} {shit}
</button>
