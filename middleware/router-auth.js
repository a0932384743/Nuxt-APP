export default function ({ store, route, redirect }) {
  const user = store.state.common.user;
  const menu = store.state.common.baseMenu;
  if (route.path === '/login' || route.path === '/register' || route.path === '/' || route.path === '') {
    if (user) {
      if (menu.length > 0) {
        return redirect(menu[0].url);
      } else {
        return redirect('/dashboard');
      }
    }
  }

  if (route.path !== '/login' && route.path !== '/register' && route.path !== '/' && route.path !== '') {
    if (!user) {
      return redirect('/login');
    }
  }
}
