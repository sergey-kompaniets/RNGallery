import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableHighlight
} from "react-native";
import { connect } from "react-redux";
import { changeImage, getImages } from "../../store/actions/imageActions";

class Gallery extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    this.props.getImages(
      "https://api.unsplash.com/photos/?client_id=cf49c08b444ff4cb9e4d126b7e9f7513ba1ee58de7906e4360afc1a33d1bf4c0"
    );
  }

  onPressHandler = src => {
    const { navigate } = this.props.navigation;
    this.props.changeImage(src);
    navigate("Image");
  };

  renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
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
            <View style={styles.textContainer}>
              <Text style={styles.user}>{item.user.name}</Text>
              <Text style={styles.username}>{item.user.username}</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  };

  render() {
    const { viewStyle, textStyle } = styles;
    return (
      <View style={viewStyle}>
        <FlatList
          keyExtractor={item => item.id}
          data={this.props.data}
          renderItem={this.renderItem}
        />
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
  item: {
    margin: 5
  },
  username: {
    fontSize: 16,
    color: "#fff"
  },
  user: {
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
    data: state.gallery.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeImage: src => dispatch(changeImage(src)),
    getImages: url => dispatch(getImages(url))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Gallery);
