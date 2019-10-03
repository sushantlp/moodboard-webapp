<template>
  <div class="board-editor">
    <form @submit.prevent="saveChanges">
      <div class="input-wrapper">
        <input
          v-model="form.url"
          class="input mb-8px"
          required
          type="url"
          placeholder="url"
          name="url"
          id="url"
        />
      </div>
      <input class="button mr-8px" type="submit" />
      <input class="button" type="button" value="Cancel" @click="$store.commit('setModal', '')" />
    </form>
  </div>
</template>

<script>
import faker from "faker";

export default {
  props: ["boardId"],
  data() {
    return {
      form: {
        url: ""
      }
    };
  },
  methods: {
    async saveChanges() {
      /*
          const item = {
          boardId: this.boardId,
          id: faker.random.uuid(),
          title: faker.lorem.words(),
          description: faker.lorem.sentence(),
          image: faker.random.image(),
          url: url,
          hostname: new URL(url).host
        };
      */
      const { url } = this.form;
      const info = await this.$store.dispatch("getUrlInfo", url);
      console.log(info);

      const item = {
        url,
        boardId: this.boardId,
        title: info.title || "",
        description: info.description || "",
        image: info.preview,
        hostname: info.hostname
      };
      
      this.$store.dispatch("createItem", item);
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