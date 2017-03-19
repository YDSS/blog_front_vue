/**
 * @file post相关的vuex module
 */

// state
const state = {
    posts: new Map(),
};

// mutations
export const types = {
    ADD_PAGE: 'ADD_PAGE',
    GET_PAGE_REQUEST: 'GET_PAGE_REQUEST',
    GET_PAGE_SUCCESS: 'GET_PAGE_SUCCESS',
    GET_PAGE_FAIL: 'GET_PAGE_FAIL',
};

const mutations = {
    [types.ADD_PAGE](state, { pageNum, list }) {
        state.posts.set(pageNum, list);
    },
    [types.GET_PAGE_REQUEST](state) {

    },
    [types.GET_PAGE_SUCCESS](state) {

    },
    [types.GET_PAGE_FAIL](state) {

    }
}

// actions
const actions = {
    addPage({ commit, state }, { pageNum }) {
        commit(types.GET_PAGE_REQUEST);
        let list = [{
            title: 'hahah' + pageNum,
            created: Date.now(),
            abstract: 'Hi there!',
        }, {
            title: 'hahaha' + pageNum,
            created: Date.now(),
            abstract: 'Hi there 22222222\n2321312312!',
        }];
        commit(types.ADD_PAGE, {
            pageNum,
            list
        });
    }
}

// getters

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
