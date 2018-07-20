import Vue from 'vue';
import VueLocalStorage from 'vue-localstorage';
import router from '../router';

Vue.use(VueLocalStorage);

class Auth {

  static save(user) {
    Vue.localStorage.set('auth_user', JSON.stringify(user));
    Vue.localStorage.set('auth_token', user.token);
  }

  static token() {
    return Vue.localStorage.get('auth_token');
  }

  static user() {
    return JSON.parse(Vue.localStorage.get('auth_user'));
  }

  static clear() {
    Vue.localStorage.remove('auth_user');
    Vue.localStorage.remove('auth_token');
  }

  static check() {
    const auth_token = this.token();
    return !!auth_token;
  }

  static isAdmin() {
    if (this.check()) {
      const auth_user = this.user();
      return !!auth_user.is_admin;
    }

    return false;
  }

  static checkWithRedirect() {
    if (!this.check()) {
      router.push('login');
    }
  }

  static redirectNonAdmin() {
    if (!this.isAdmin()) {
      router.push('login');
    }
  }

  static redirectIfAdmin() {
    if (this.isAdmin()) {
      router.push('login');
    }
  }

  static redirectIfAuthenticated() {
    if (this.check()) {
      router.push('actions');
    }
  }
}

export default Auth;
