import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableHighlight,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import { changeImage, getImages } from "../../store/actions/imageActions";

class Gallery extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.getImages();
  }

  onPressHandler = src => {
    const { navigate } = this.props.navigation;
    this.props.changeImage(src);
    navigate("Image");
  };

  renderItem = ({ item }) => {
    const { itemStyle, usernameStyle, userStyle, textContainer } = styles;
    return (
      <View style={itemStyle}>
        <TouchableHighlight onPress={() => this.onPressHandler(item.urls.full)}>
          <View>
            <Image
              style={{
                flex: 1,
                height: 180
              }}
              source={{
                uri: item.urls.small
              }}
            />
            <View style={textContainer}>
              <Text style={userStyle}>{item.user.name}</Text>
              <Text style={usernameStyle}>{item.user.username}</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  };

  render() {
    const { viewStyle } = styles;
    return (
      <View style={viewStyle}>
        {this.props.loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            keyExtractor={item => item.id}
            data={this.props.data}
            renderItem={this.renderItem}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    justifyContent: "center",
    height: 90,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    position: "relative"
  },
  textStyle: {
    color: "#fff",
    fontSize: 28,
    textAlign: "center",
    fontFamily: "AvenirNext-DemiBold"
  },
  itemStyle: {
    margin: 5
  },
  usernameStyle: {
    fontSize: 16,
    color: "#fff"
  },
  userStyle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff"
  },
  textContainer: {
    position: "absolute",
    top: "10%",
    backgroundColor: "#000000b8",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10
  }
});

const mapStateToProps = state => {
  return {
    data: state.gallery.data,
    loading: state.gallery.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeImage: src => dispatch(changeImage(src)),
    getImages: () => dispatch(getImages())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Gallery);
