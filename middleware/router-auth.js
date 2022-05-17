export default function ({ store, route, redirect }) {
  const user = store.state.common.user;
  if (route.path === '/login' || route.path === '/register' || route.path === '/' || route.path === '') {
    if (user) {
      return redirect('/dashboard');
    }
  }

  if (route.path !== '/login' && route.path !== '/register' && route.path !== '/' && route.path !== '') {
    if (!user) {
      return redirect('/login');
    }
  }
}
