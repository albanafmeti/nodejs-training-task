<template>
  <div class="messages">
    <div class="message">
      <div class="author admin">Admin</div>
      <div class="content">Hello man whats app?</div>
    </div>

    <div class="message">
      <div class="author me">Me</div>
      <div class="content">Mire po ti si je?</div>
    </div>

    <div class="message">
      <div class="author admin">Admin</div>
      <div class="content">Hic mire shtyjm.</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Messages"
  }
</script>

<style scoped lang="scss">

  .message {
    display: flex;
    margin-bottom: 15px;

    .author {
      margin-right: 20px;
      font-size: 19px;
      padding: 0 10px;
      min-width: 76px;

      &.admin {
        border-right: 3px solid greenyellow;
      }
      &.me {
        border-right: 3px solid dodgerblue;
      }
    }

    .content {
      border: 1px solid beige;
      padding: 10px 25px;
      border-radius: 15px;
      background: floralwhite;
    }
  }
</style>

