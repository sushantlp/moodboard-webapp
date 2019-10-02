<template>
  <div class="BoardDetails">
    <div class="board">
      <div class="page-info">
        <div class="page-title-container">
          <h1 class="page-title name">{{board.name}}</h1>
          <div class="page-actions">
            <button @click="editBoard()" class="button mr-8px">Edit</button>
            <button @click="deleteBoard()" class="button danger">Delete</button>
          </div>
        </div>
        <p class="page-description">{{board.description}}</p>
      </div>
      <div class="mb-16px">
        <button @click="addItem" class="button">Add item</button>
      </div>
      <div class="items">
        <div class="item" v-for="item in items" :key="item.id">
          <a :href="item.url" target="_blank">
            <div class="image-container">
              <img :src="item.image" :alt="item.title" />
            </div>
            <div class="info">
              <strong class="title">{{item.title}}</strong>
              <p class="description">{{item.description}}</p>
              <small class="hostname">{{item.hostname}}</small>
            </div>

            <div class="actions">
              <button @click.prevent="deleteItem(item)" class="action">X</button>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import faker from "faker";

export default {
  props: ["boardId"],
  name: "BoardDetails",
  computed: {
    board() {
      return this.$store.state.currentBoard;
    },
    items() {
      return this.$store.state.currentBoardItems;
    }
  },
  created() {
    this.$store.dispatch("displayBoardDetails", this.boardId);
  },
  methods: {
    async deleteBoard() {
      if (confirm("Are you sure")) {
        await this.$store.dispatch("deleteBoard", this.boardId);
        this.$router.back();
      }
    },
    editBoard() {
      const name = prompt("Name");
      const description = prompt("Description");

      if (!name) {
        return;
      }

      const update = { name, description };
      this.$store.dispatch("updateBoard", {
        boardId: this.boardId,
        update
      });
    },
    deleteItem(item) {
      if (confirm("Are you sure ?")) {
        this.$store.dispatch("deleteItem", item.id);
      }
    },
    addItem() {
      try {
        const url = prompt("URL");
        const item = {
          boardId: this.boardId,
          id: faker.random.uuid(),
          title: faker.lorem.words(),
          description: faker.lorem.sentence(),
          image: faker.random.image(),
          url: url,
          hostname: new URL(url).host
        };
        this.$store.dispatch("createItem", item);
      } catch (error) {
        alert(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.BoardDetails {
  .board {
    .items {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 16px;

      .item {
        position: relative;

        &:hover {
          .actions {
            display: unset;
          }
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .image-container {
          width: 100%;
          padding-top: 56.25%;
          overflow: hidden;
          background: #dedede;
          position: relative;
          border-radius: 4px;

          img {
            width: 100%;
            object-fit: cover;
            position: absolute;
            top: 0;
            left: 0;
          }
        }

        .info {
          margin-top: 12px;

          .title {
            display: block;
            margin-bottom: 4px;
            text-transform: capitalize;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }
          .description {
            margin: 0;
            margin-bottom: 8px;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .hostname {
            display: block;
            color: #a3a3a3;
          }
        }

        .actions {
          position: absolute;
          display: none;
          right: 0;
          top: 0;
          margin: 8px;

          .action {
            border: solid 1px black;
            padding: none;
            background: white;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            outline: none;
          }
        }
      }
    }
  }
}
</style>
