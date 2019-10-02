<template>
  <div class="boards">
    <div class="page-info">
      <div>
        <div class="page-title-container">
          <h1 class="page-title">Boards</h1>
          <div class="page-actions">
            <button @click="createBoard()" class="button">New Board</button>
          </div>
        </div>
      </div>
    </div>
    <div class="boards-grid">
      <router-link
        :to="`/boards/${board.id}`"
        tag="div"
        class="board"
        v-for="board in boards"
        :key="board.id"
      >
        <div class="info">
          <strong class="name">{{board.name}}</strong>
          <p class="description">{{board.description}}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import faker from "faker";

export default {
  computed: {
    boards() {
      return this.$store.state.boards;
    }
  },
  methods: {
    createBoard() {
      const name = prompt("Name");
      const description = prompt("Description");

      if (!name) {
        return;
      }

      this.$store.dispatch("createBoard", {
        id: faker.random.uuid(),
        name,
        description
      });
    }
  },
  created() {
    this.$store.dispatch("retrieveAllBoards");
  }
};
</script>

<style lang="scss" scoped>
.boards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;

  .board {
    cursor: pointer;
    border: solid 1px #e6e4e4;
    border-radius: 4px;

    &:hover {
      background: #fafafa;
    }

    .info {
      padding: 16px;

      .name {
        display: block;
        margin-bottom: 8px;
        text-transform: capitalize;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }

      .description {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        margin: 0;
        margin-bottom: 8px;
      }
    }
  }
}
</style>