<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Varela+Round&display=swap");

$spaces: 4px, 8px, 16px, 32px;

@each $space in $spaces {
  .mt-#{$space} {
    margin-top: $space;
  }

  .ml-#{$space} {
    margin-left: $space;
  }

  .mb-#{$space} {
    margin-bottom: $space;
  }

  .mr-#{$space} {
    margin-right: $space;
  }
}

body,
html {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}

a {
  font-weight: bold;
  color: #2c3e50;
  
  &:hover {
    color: #42b983;
  }
}

.input-wrapper {
  .input {
    width: 100%;
    padding: 8px;
    outline: none;
    border: solid 1px #e6e4e4;
    border-radius: 4px;
  }
}

.button {
  background: none;
  outline: none;
  padding: 8px 16px;
  border: solid 1px black;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #fafafa;
  }

  &.danger {
    border: solid 1px rgb(255, 81, 81);
    color: rgb(255, 81, 81);
  }
}

.page-info {
  margin-bottom: 16px;

  .page-title {
    margin: 0;
    font-size: 1.5em;
    text-transform: capitalize;
  }

  .page-title-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  .page-description {
    margin: 0;
  }
}

#app {
  font-family: "Varela Round", serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>