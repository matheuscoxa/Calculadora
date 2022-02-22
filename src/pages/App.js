import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useState} from 'react';

/*if (',') {
  replace(',', '.');
}*/

export default function App() {
  const teclado = [
    [{text: 'AC'}, {text: 7}, {text: 4}, {text: 1}, {text: ','}],
    [{text: 'DEL'}, {text: 8}, {text: 5}, {text: 2}, {text: 0}],
    [{text: '+'}, {text: 9}, {text: 6}, {text: 3}, {text: ''}],
    [{text: '-'}, {text: '*'}, {text: '/'}, {text: '='}],
  ];

  const [numeroAtual, setnumeroAtual] = useState('');
  const [ultimoNumero, setultimoNumero] = useState('');

  function calcular() {
    const usarNumero = numeroAtual.split(' ');
    const primeiroNumero = parseFloat(usarNumero[0]);
    const operador = usarNumero[1];
    const ultimoNumero = parseFloat(usarNumero[2]);

    switch (operador) {
      case '+':
        setnumeroAtual((primeiroNumero + ultimoNumero).toString());
        return;
      case '-':
        setnumeroAtual((primeiroNumero - ultimoNumero).toString());
        return;
      case '*':
        setnumeroAtual((primeiroNumero * ultimoNumero).toString());
        return;
      case '/':
        setnumeroAtual((primeiroNumero / ultimoNumero).toString());
        return;
    }
  }

  function handleInput(botaoUtilizado) {
    console.log(botaoUtilizado);
    if (
      botaoUtilizado === '+' ||
      botaoUtilizado === '-' ||
      botaoUtilizado === '*' ||
      botaoUtilizado === '/'
    ) {
      setnumeroAtual(numeroAtual + ' ' + botaoUtilizado + ' ');
      return;
    }
    switch (botaoUtilizado) {
      case 'DEL':
        setnumeroAtual(numeroAtual.substring(0, numeroAtual.length - 1));
        return;
      case 'AC':
        setultimoNumero('');
        setnumeroAtual('');
        return;
      case '=':
        setultimoNumero(numeroAtual + ' = ');
        calcular();
        return;
    }

    setnumeroAtual(numeroAtual + botaoUtilizado);
  }

  const styles = StyleSheet.create({
    resultado: {
      backgroundColor: '#f5f5f5',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      minHeight: 300,
      width: '100%',
    },
    resultadoText: {
      color: '#282F38',
      margin: 10,
      fontSize: 40,
    },

    historicoTexto: {
      color: '#7c7c7c',
      fontSize: 20,
      marginRight: 10,
      alignSelf: 'flex-end',
    },

    botoes: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#e5e5e5',
    },
    botao: {
      borderColor: '#e5e5e5',
      //borderWidth: 1,
      justifyContent: 'center',
      flex: 1,
    },
    botaoTexto: {
      color: 'black',
      fontSize: 30,
      textAlign: 'center',
      fontFamily: 'OpenSans-ExtraBold',
    },
  });

  return (
    <View style={{flex: 1}}>
      <View style={styles.resultado}>
        <TouchableOpacity style={styles.themeButton} />
        <Text style={styles.historicoTexto}>{ultimoNumero}</Text>
        <Text style={styles.resultadoText}>{numeroAtual}</Text>
      </View>
      <View style={styles.botoes}>
        {teclado.map((linha, index) => {
          return (
            <View style={{flex: 1}} key={index}>
              {linha.map(botao => {
                if (botao.text === '=') {
                  return (
                    <TouchableOpacity
                      onPress={() => handleInput(botao.text)}
                      key={botao.text}
                      style={[
                        styles.botao,
                        {backgroundColor: '#9DBC7B'},
                        {flex: 2.5},
                        {justifyContent: 'center'},
                        {borderRadius: 10},
                      ]}>
                      <Text style={[styles.botaoTexto]}>{botao.text}</Text>
                    </TouchableOpacity>
                  );
                } else {
                  return (
                    <TouchableOpacity
                      onPress={() => handleInput(botao.text)}
                      key={botao.text}
                      style={[styles.botao]}>
                      <Text style={[styles.botaoTexto]}>{botao.text}</Text>
                    </TouchableOpacity>
                  );
                }
              })}
            </View>
          );
        })}
      </View>
    </View>
  );
}
