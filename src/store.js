import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import { vuexfireMutations, firestoreAction } from 'vuexfire'

Vue.use(Vuex)

const CLOUD_FUNCTIONS_URL = process.env.VUE_APP_CLOUD_FUNCTIONS_URL

export default new Vuex.Store({
  state: {
    modal: "",
    boards: "",
    items: [],
    currentBoard: "",
    currentBoardItems: []
  },
  mutations: {
    setModal(state, modal) {
      state.modal = modal
    },
    ...vuexfireMutations
  },
  actions: {
    getUrlInfo(_, url) {
      return fetch(`${CLOUD_FUNCTIONS_URL}/backend/info?url=${url}`).then(response => {
        return response.json()
      })
    },
    retrieveAllBoards: firestoreAction(({ bindFirestoreRef, state }) => {
      if (state.boards) {
        return
      }
      return bindFirestoreRef('boards', firebase.firestore().collection(`users/${firebase.auth().currentUser.uid}/boards`).orderBy('createdAt', 'desc'))
    }),
    displayBoardDetails: firestoreAction(async ({ bindFirestoreRef }, boardId) => {
      await bindFirestoreRef('currentBoard', firebase.firestore().doc(`users/${firebase.auth().currentUser.uid}/boards/${boardId}`))
      await bindFirestoreRef('currentBoardItems', firebase.firestore().collection(`users/${firebase.auth().currentUser.uid}/items`)
        .where('boardId', '==', boardId)
        .orderBy('createdAt', 'desc'))
    }),
    createBoard(_, board) {
      board.createdAt = firebase.firestore.FieldValue.serverTimestamp()
      firebase.firestore().collection(`users/${firebase.auth().currentUser.uid}/boards`).add(board)
    },
    updateBoard(_, { boardId, update }) {
      firebase.firestore().doc(`users/${firebase.auth().currentUser.uid}/boards/${boardId}`).update(update)
    },
    deleteBoard(_, boardId) {
      firebase.firestore().doc(`users/${firebase.auth().currentUser.uid}/boards/${boardId}`).delete()
    },
    createItem(_, item) {
      item.createdAt = firebase.firestore.FieldValue.serverTimestamp()
      firebase.firestore().collection(`users/${firebase.auth().currentUser.uid}/items`).add(item)
    },
    deleteItem(_, itemId) {
      firebase.firestore().doc(`users/${firebase.auth().currentUser.uid}/items/${itemId}`).delete()
    }
  }
})
