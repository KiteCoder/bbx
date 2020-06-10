import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useKeepAwake } from 'expo-keep-awake';
import { Gyroscope } from 'expo-sensors';
import { Threashold } from './Threashold';

export default function App() {

  const PRECISION = 10;
  useKeepAwake();

  const [balanceState, setBalanceState] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [times, setTimes] = useState([]);
  
  const isActiveRef = useRef();
  const secondsRef = useRef(seconds);

  let _subscription = null;

  const _reset = () => {
    setSeconds(0.0);
    isActiveRef.current = false;
  }

  useEffect(() => {
    let interval = null;
    if (isActiveRef.current) {
      interval = setInterval(() => {
        const updateTime = Math.round(seconds * PRECISION + 0.1 * PRECISION) / PRECISION;
        setSeconds(seconds => updateTime);
        secondsRef.current = updateTime;
      }, 100);
    } else if (!isActiveRef.current && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActiveRef.current, seconds]);

  const _toggle = () => {
    if (_subscription) {
      _unsubscribe();
      isActiveRef.current = false;
    } else {
      _subscribe();
      isActiveRef.current = true;
    }
  };

  const _evaluateCurrentPosition = (position) => {

    let insideBound = true;

    if (position.x > Threashold.POSITIVE_X ||
      position.x < Threashold.NEGATIVE_X ||
      position.y > Threashold.POSITIVE_Y ||
      position.y < Threashold.NEGATIVE_Y) {

      insideBound = false;

      if(isActiveRef.current){
        setTimes((times) => ([...times, secondsRef.current]));
      }

      _reset();

    } else {
      isActiveRef.current = true;
    }

    setBalanceState(insideBound);
  }


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
      _evaluateCurrentPosition(gyroscopeData);
    });

  };

  const _unsubscribe = () => {
    _subscription && _subscription.remove();
    _subscription = null;
  };

  return (
    <View style={balanceState ? styles.balanceContainer : styles.offContainer}>
      <View style={styles.sensor}>

        <Text style={styles.text}>Instructions:</Text>
        <Text style={styles.text}>Press start, and allow the app to use gyroscope data.</Text>
        <Text style={styles.text}>Place phone face up in the center of your board.</Text>
        <Text style={styles.text}>The background color will change if you are properly balanced, and the timer will start.</Text>

        <div className="time">
          {seconds}s
        </div>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={_toggle} style={styles.button}>
            <Text>Start</Text>
          </TouchableOpacity>
        </View>

        {times.map((time) => {
          return <Text style={styles.text}>
            time: {time}
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
