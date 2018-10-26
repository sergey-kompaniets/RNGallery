import React, { Component } from "react";
// import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./store/reducers/rootReducer";

import { createStackNavigator } from "react-navigation";
import thunk from "redux-thunk";

import Gallery from "./components/Gallery/Gallery";
import GalleryItem from "./components/GalleryItem/GalleryItem";

const middleware = store => next => action => {
  const result = next(action);
  console.log("Middleware", store.getState());
  return result;
};

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(middleware, thunk))
);

const AppStackNavigator = createStackNavigator({
  Gallery: {
    screen: Gallery,
    navigationOptions: {
      header: null
    }
  },
  Image: {
    screen: GalleryItem,
    navigationOptions: {
      header: null
    }
  }
});

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppStackNavigator />
      </Provider>
    );
  }
}
