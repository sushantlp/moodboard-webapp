<template>
  <div id="home">
    <div id="header">
      <router-link tag="span" to="/app" id="app-logo">
        <span>MOOD</span>
        <strong>BOARD</strong>
      </router-link>
      <div id="nav">
        <router-link to="/app/boards">Boards</router-link>
        <router-link to="/app/settings">Settings</router-link>
        <button @click="signOut" class="button">Sign out</button>
      </div>
    </div>
    <router-view id="content" />
    <div v-if="modal" id="modal-mask">
      <div class="modal-container">
        <component :is="modal.component" v-bind="modal.data"></component>
      </div>
    </div>
  </div>
</template>

<script>
import BoardEdtor from "@/components/BoardEditor.vue";
import NewItem from "@/components/NewItem.vue";

export default {
  components: {
    "board-editor": BoardEdtor,
    "new-item": NewItem
  },
  computed: {
    modal() {
      return this.$store.state.modal;
    }
  },
  methods: {
    async signOut() {
      await this.$auth.signOut();
      window.location.replace("/");
    }
  }
};
</script>

<style lang="scss" scoped>
#home {
  #header {
    padding: 16px 64px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom: solid 1px #e6e4e4;

    #app-logo {
      text-transform: uppercase;
      font-size: 1.5em;
      cursor: pointer;

      &:hover {
        color: #42b983;
      }
    }
    #nav {
      a {
        font-weight: bold;
        color: #2c3e50;

        &:not(:last-child) {
          margin-right: 8px;
        }

        &.router-link-exact-active {
          color: #42b983;
        }
      }
    }
  }

  #content {
    padding: 20px 64px;
  }

  #modal-mask {
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba($color: #000000, $alpha: 0.6);
    top: 0;
    left: 0;

    .modal-container {
      background: white;
      width: 500px;
      border-radius: 4px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
