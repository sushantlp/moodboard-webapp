import Vue from 'vue'
import Vuex from 'vuex'
import faker from "faker";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    boards: [],
    items: [],
    currentBoard: "",
    currentBoardItems: ""
  },
  mutations: {

  },
  actions: {
    retrieveAllBoards({ state }) {

      state.boards = []

      // for (let index = 0; index < 10; index++) {

      //   const boardId = faker.random.uuid()

      //   state.boards.push({
      //     id: boardId,
      //     name: faker.lorem.words(),
      //     description: faker.lorem.sentences(),
      //   });

      //   for (let index = 0; index < 10; index++) {
      //     const url = faker.internet.url();
      //     const item = {
      //       id: faker.random.uuid(),
      //       title: faker.lorem.words(),
      //       description: faker.lorem.sentence(),
      //       image: faker.random.image(),
      //       url: url,
      //       hostname: new URL(url).host,
      //       boardId
      //     };

      //     state.items.push(item);
      //   }
      // }
    },
    displayBoardDetails({ state }, boardId) {
      state.currentBoard = state.boards.find(it => it.id == boardId)
      state.currentBoardItems = state.items.filter(it => it.boardId == boardId)
    },
    createBoard({ state }, board) {
      state.boards.push(board)
    },
    updateBoard({ state }, { boardId, update }) {
      const board = state.boards.find(it => it.id == boardId)

      if (board) {
        Object.assign(board, update)
      }
    },
    deleteBoard({ state }, boardId) {
      const index = state.boards.findIndex(it => it.id == boardId)
      if (index != -1) {
        Vue.delete(state.boards, index)
        if (state.currentBoard && boardId == state.currentBoard.id) {
          state.currentBoard = ""
        }
      }
    },
    createItem({ state }, item) {
      state.items.push(item)
      state.currentBoardItems.push(item)
    },
    deleteItem({ state }, itemId) {
      const index = state.currentBoardItems.findIndex(it => it.id == itemId)

      if (index != -1) {
        Vue.delete(state.currentBoardItems, index)
      }
    }
  }
})
