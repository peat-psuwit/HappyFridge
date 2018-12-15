function findChildStateByRouteName(state, routeName) {
  return state.routes.find(childState => childState.routeName === routeName);
}

function getChildNavigatorState(rootState, routeList) {
  return routeList.reduce((state, routeName) => {
    return findChildStateByRouteName(state, routeName);
  }, rootState);
}

export default getChildNavigatorState;
