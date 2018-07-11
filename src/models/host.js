import { queryFakeList, queryHostList } from '../services/api';

export default {
  namespace: 'host',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    showList: true,
    showDetail: false,
    selectedRows: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryHostList, payload);
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },

  reducers: {

    /**
     * 公共方法，将action中的state加入到state中
     * @param state
     * @param action
     * @returns {{}}
     */
    publicMethod(state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },


    queryList(state, action) {
      return {
        ...state,
        data :  action.payload,
      };
    },
    appendList(state, action) {
      return {
        ...state,
        list: state.list.concat(action.payload),
      };
    },
  },

  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname, search }) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};
