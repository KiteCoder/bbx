import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useKeepAwake } from 'expo-keep-awake';
import { Gyroscope } from 'expo-sensors';
import { Threashold } from './Threashold';

export default function App() {

  useKeepAwake();

  const [data, setData] = useState({});
  const [datas, setDatas] = useState([]);
  const [balanceState, setBalanceState] = useState(false);

  let _currentPosition = {};

  let _subscription = null;
  let _intervalId = null

  useEffect(() => {
    return () => {
      _unsubscribe();
    };
  }, []);

  useEffect(() => {

  }, []);

  const _toggle = () => {
    if (_subscription) {
      _unsubscribe();
      _clearInterval();
    } else {
      _subscribe();
      _setInterval();
    }
  };

  const _setInterval = () => {
    _intervalId = setInterval(() => {
      setDatas((datas) => ([...datas, _currentPosition]));
      _evaluateCurrentPosition();
    }, 500);
    console.log(_intervalId)
  }

  const _evaluateCurrentPosition = () => {

    let insideBound = true;

    if (_currentPosition.x > Threashold.POSITIVE_X ||
      _currentPosition.x < Threashold.NEGATIVE_X) {

      insideBound = false;
    }

    if (_currentPosition.y > Threashold.POSITIVE_Y ||
      _currentPosition.Y < Threashold.NEGATIVE_Y) {

      // outside Left bound
      insideBound = false;
    }

    setBalanceState(insideBound);

  }

  const _clearInterval = () => {
    console.log("clearning interval")
    clearInterval(_intervalId);
  }

  const _slow = () => {
    Gyroscope.setUpdateInterval(1000);
  };

  const _fast = () => {
    Gyroscope.setUpdateInterval(16);
  };

  const _subscribe = () => {

    if (typeof window.DeviceMotionEvent.requestPermission === 'function') {

      // iOS 13+
      window.DeviceMotionEvent.requestPermission()
        .then(response => {
          if (response === 'granted') {

          }
        })
        .catch(console.error)

    } else {
      // non iOS 13+
    }

    _subscription = Gyroscope.addListener(gyroscopeData => {
      setData(gyroscopeData);
      _currentPosition = gyroscopeData;
    });

  };

  const _unsubscribe = () => {
    _subscription && _subscription.remove();
    _subscription = null;
  };

  let { x, y, z } = data;

  return (
    <View style={balanceState ? styles.balanceContainer : styles.offContainer}>
      <View style={styles.sensor}>
        <Text style={styles.text}>Gyroscope:</Text>
        <Text style={styles.text}>{datas.length}</Text>
        <Text style={styles.text}>
          x: {round(x)} y: {round(y)} z: {round(z)}
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={_toggle} style={styles.button}>
            <Text>Toggle</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={_slow} style={[styles.button, styles.middleButton]}>
            <Text>Slow</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={_fast} style={styles.button}>
            <Text>Fast</Text>
          </TouchableOpacity>
        </View>

        {datas.map((element) => {
          return <Text style={styles.text}>
            x: {round(element.x)} y: {round(element.y)} z: {round(element.z)}
          </Text>
        })}

      </View>
    </View>
  );
}

function round(n) {
  if (!n) {
    return 0;
  }

  return Math.floor(n * 100) / 100;
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  sensor: {
    marginTop: 45,
    paddingHorizontal: 10,
  },
  text: {
    textAlign: 'center',
  },
  balanceContainer: {
    backgroundColor: '#00872F',
  },
  offContainer: {
    backgroundColor: '#820003',
  },
});
