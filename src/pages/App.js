import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useState} from 'react';

export default function App() {
  const [darkMode] = useState(false);
  const buttons = [
    'AC',
    'DEL',
    '+',
    '-',
    1,
    2,
    3,
    '*',
    4,
    5,
    6,
    '/',
    7,
    8,
    9,
    ' ',
    '.',
    0,
    '',

    '=',
  ];

  const [currentNumber, setCurrentNumber] = useState('');
  const [lastNumber, setLastNumber] = useState('');

  function calcular() {
    const splitNumbers = currentNumber.split(' ');
    const fistNumber = parseFloat(splitNumbers[0]);
    const operator = splitNumbers[1];
    const lastNumber = parseFloat(splitNumbers[2]);

    switch (operator) {
      case '+':
        setCurrentNumber((fistNumber + lastNumber).toString());
        return;
      case '-':
        setCurrentNumber((fistNumber - lastNumber).toString());
        return;
      case '*':
        setCurrentNumber((fistNumber * lastNumber).toString());
        return;
      case '/':
        setCurrentNumber((fistNumber / lastNumber).toString());
        return;
    }
  }

  function handleInput(buttonPressed) {
    console.log(buttonPressed);
    if (
      buttonPressed === '+' ||
      buttonPressed === '-' ||
      buttonPressed === '*' ||
      buttonPressed === '/'
    ) {
      setCurrentNumber(currentNumber + ' ' + buttonPressed + ' ');
      return;
    }
    switch (buttonPressed) {
      case 'DEL':
        setCurrentNumber(currentNumber.substring(0, currentNumber.length - 1));
        return;
      case 'AC':
        setLastNumber('');
        setCurrentNumber('');
        return;
      case '=':
        setLastNumber(currentNumber + ' = ');
        calcular();
        return;
      case '+/-':
        return;
    }

    setCurrentNumber(currentNumber + buttonPressed);
  }

  const styles = StyleSheet.create({
    results: {
      backgroundColor: darkMode ? '#282f3b' : '#f5f5f5',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      minHeight: 300,
      width: '100%',
    },
    resultText: {
      color: darkMode ? '#f5f5f5' : '#282F38',
      margin: 10,
      fontSize: 40,
    },

    historyText: {
      color: darkMode ? '#B5B7BB' : '#7c7c7c',
      fontSize: 20,
      marginRight: 10,
      alignSelf: 'flex-end',
    },

    buttons: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    button: {
      borderColor: darkMode ? '#3f4d5b' : '#e5e5e5',
      //borderRadius: 0,
      //borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 80,
      minHeight: 84,
      flex: 1,
    },
    igual: {
      backgroundColor: '#9DBC7B',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      minWidth: 80,
      minHeight: 84,
      flex: 2,
    },
    textButton: {
      color: darkMode ? '#b5b7bb' : '#7c7c7c',
      fontSize: 25,
    },
  });

  return (
    <View>
      <View style={styles.results}>
        <TouchableOpacity style={styles.themeButton} />
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>
      <View style={styles.buttons}>
        {buttons.map(button =>
          button === '=' ? (
            <TouchableOpacity
              onPress={() => handleInput(button)}
              key={button}
              style={[styles.igual, {flex: 2}, {flexDirection: 'column'}]}>
              <Text style={[styles.textButton, {color: 'white', fontSize: 40}]}>
                {button}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => handleInput(button)}
              key={button}
              style={[styles.button, {backgroundColor: '#efefef'}]}>
              <Text style={styles.textButton}>{button}</Text>
            </TouchableOpacity>
          ),
        )}
      </View>
    </View>
  );
}
