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
import { changeImage } from "../../store/actions/imageActions";

class Gallery extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      isLoading: true
    };
  }

  componentDidMount() {
    this.getData();
  }

  onPressHandler = src => {
    const { navigate } = this.props.navigation;
    this.props.setNewImage(src);
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

  getData() {
    const url =
      "https://api.unsplash.com/photos/?client_id=cf49c08b444ff4cb9e4d126b7e9f7513ba1ee58de7906e4360afc1a33d1bf4c0";
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          data: responseJson,
          isLoading: false
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center"
        }}
      >
        {this.state.isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            keyExtractor={item => item.id}
            data={this.state.data}
            renderItem={this.renderItem}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
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

const mapDispatchToProps = dispatch => {
  return {
    setNewImage: src => dispatch(changeImage(src))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Gallery);
