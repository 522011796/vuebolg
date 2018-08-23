const state = {          // 组件间共享的数据
  showAddModal: '',
  dataList: []
}

const mutations = {      // 修改共享数据
  setModalStatus: (state, value) => {
    state.showAddModal = value
  },
  setModalData:  (state, value) => {
    state.dataList = Object.assign({}, value);
  }
}

const getters = {        // 获取共享数据
  getModalStatus: state => {
    return state.showAddModal
  },
  getModalData: state => {
    return state.dataList
  }
}

export default {
  getters,
  state,
  mutations
}

