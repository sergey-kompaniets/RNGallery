import React, { Component } from "react";
import { View, Image, TouchableHighlight } from "react-native";
import { connect } from "react-redux";

class GalleryItem extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <TouchableHighlight onPress={() => navigate("Gallery")}>
          <Image
            style={{ width: "100%", height: "100%" }}
            source={{
              uri: this.props.src
            }}
          />
        </TouchableHighlight>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    src: state.gallery.src
  };
};

export default connect(mapStateToProps)(GalleryItem);
