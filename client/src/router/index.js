import Vue from 'vue';
import Router from 'vue-router';
import LoginPage from '../components/login/LoginPage';
import Chat from '../components/chat/Chat';
import Actions from '../components/actions/Actions';
import EventCreators from '../components/statistics/EventCreators';
import Commands from '../components/commands/Commands';
import Users from '../components/users/Users';
import NotFound from '../components/general/NotFound';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {path: '/', name: 'home', redirect: '/login'},
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/chat',
      name: 'chat',
      component: Chat
    },
    {
      path: '/actions',
      name: 'actions',
      component: Actions
    },
    {
      path: '/events',
      name: 'events',
      component: EventCreators
    },
    {
      path: '/commands',
      name: 'commands',
      component: Commands
    },
    {
      path: '/users',
      name: 'users',
      component: Users
    },
    {path: '*', component: NotFound},
  ]
});
