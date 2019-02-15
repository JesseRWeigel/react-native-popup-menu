import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { CLOSE_ANIM_DURATION, OPEN_ANIM_DURATION } from './constants'

class Backdrop extends Component {
  constructor(...args) {
    super(...args)
    this.fadeAnim = new Animated.Value(0.001)
  }

  open() {
    return new Promise(resolve => {
      Animated.timing(this.fadeAnim, {
        duration: OPEN_ANIM_DURATION,
        toValue: 1,
        useNativeDriver: true,
      }).start(resolve)
    })
  }

  close() {
    return new Promise(resolve => {
      Animated.timing(this.fadeAnim, {
        duration: CLOSE_ANIM_DURATION,
        toValue: 0,
        useNativeDriver: true,
      }).start(resolve)
    })
  }

  render() {
    const { onPress, style } = this.props
    return (
      <TouchableWithoutFeedback style={styles.container} onPress={onPress}>
        <Animated.View style={[styles.fullscreen, { opacity: this.fadeAnim }]}>
          <View style={[styles.fullscreen, style]} />
        </Animated.View>
      </TouchableWithoutFeedback>
    )
  }
}

Backdrop.propTypes = {
  onPress: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    overflowY: 'hidden',
  },
  fullscreen: {
    opacity: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
})

export default Backdrop
