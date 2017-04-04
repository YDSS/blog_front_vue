import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/Home';
import Test from '@/pages/Test';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
        path: '/testScroll',
        name: 'testScroll',
        component: Test
    }
  ]
});
