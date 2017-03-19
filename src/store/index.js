import Vue from 'vue';
import Vuex from 'vuex';

import * as getter from './getter';
import * as action from './action';
import * as mutation from './mutation';
import post from './modules/post';
import diary from './modules/diary';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    action,
    getter,
    modules: {
        post,
        diary
    },
    strict: debug
});
