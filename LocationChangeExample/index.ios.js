"use strict";

import React, {Component} from "react";
import {AppRegistry, StyleSheet, Text, View, NativeModules, NativeEventEmitter} from "react-native";

const _EVENT_EMITTER = new NativeEventEmitter(NativeModules.RNLocationChange);

export default class LocationChangeExample extends Component {
  componentWillMount() {
    this.setState({location: null});

    _EVENT_EMITTER.addListener('significantLocationChange', (data) => {
      console.log("event:", data);
      this.setState({location: data});
    });


    NativeModules.RNLocationChange.start();
  }

  componentWillUnmount() {
    NativeModules.RNLocationChange.stop();
  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.state.location ? <View>
              <Text style={styles.welcome}>
                speed: {this.state.location.coords.speed}
              </Text>
              <Text style={styles.welcome}>
                longitude: {this.state.location.coords.longitude}
              </Text>
              <Text style={styles.welcome}>
                latitude: {this.state.location.coords.latitude}
              </Text>
              <Text style={styles.welcome}>
                accuracy: {this.state.location.coords.accuracy}
              </Text>
              <Text style={styles.welcome}>
                altitude: {this.state.location.coords.altitude}
              </Text>
              <Text style={styles.welcome}>
                timestamp: {new Date(this.state.location.timestamp).toISOString()}
              </Text>
            </View> : <Text style={styles.welcome}>
              waiting for data
            </Text>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
    padding: 8
  },
  welcome: {
    fontSize: 14,
    marginBottom: 4,
    color: 'white'
  }
});

AppRegistry.registerComponent('LocationChangeExample', () => LocationChangeExample);
