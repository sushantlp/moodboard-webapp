<template>
  <div class="board-editor">
    <form @submit.prevent="saveChanges">
      <div class="input-wrapper">
        <input
          v-model="form.name"
          class="input mb-8px"
          required
          type="text"
          placeholder="name"
          name="name"
          id="name"
        />
      </div>
      <div class="input-wrapper">
        <textarea
          v-model="form.description"
          class="input mb-8px"
          name="description"
          id
          cols="30"
          rows="10"
          placeholder="description"
        ></textarea>
      </div>
      <input class="button mr-8px" type="submit" />
      <input class="button" type="button" value="Cancel" @click="$store.commit('setModal', '')" />
    </form>
  </div>
</template>

<script>
export default {
  props: ["board"],
  data() {
    return {
      form: {
        name: "",
        description: ""
      }
    };
  },
  async created() {
    if (this.board) {
      this.form.name = this.board.name;
      this.form.description = this.board.description;
    }
  },
  methods: {
    saveChanges() {
      const { name, description } = this.form;
      const board = {
        name,
        description
      };

      if (!this.board) {
        this.$store.dispatch("createBoard", board);
      } else {
        this.$store.dispatch("updateBoard", {
          boardId: this.board.id,
          update: board
        });
      }

      this.$store.commit("setModal", "");
    }
  }
};
</script>

<style lang="scss" scoped>
.board-editor {
  padding: 16px;
}
</style>