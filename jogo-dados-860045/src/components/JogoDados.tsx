import { useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';

import Dado from './Dado';

export default function JogoDados() {
  const [rodada, setRodada] = useState(1);

  const [dado1Jogador1, setDado1Jogador1] = useState(1);
  const [dado2Jogador1, setDado2Jogador1] = useState(1);

  const [dado1Jogador2, setDado1Jogador2] = useState(1);
  const [dado2Jogador2, setDado2Jogador2] = useState(1);

  const [pontosJogador1, setPontosJogador1] = useState(0);
  const [pontosJogador2, setPontosJogador2] = useState(0);

  const [resultadoJogador1, setResultadoJogador1] = useState('');
  const [resultadoJogador2, setResultadoJogador2] = useState('');

  const [vezJogador, setVezJogador] = useState(1);
  const [fimDeJogo, setFimDeJogo] = useState(false);

  function sortearDado() {
    return Math.floor(Math.random() * 6) + 1;
  }

  function jogarJogador1() {
    const dado1 = sortearDado();
    const dado2 = sortearDado();

    setDado1Jogador1(dado1);
    setDado2Jogador1(dado2);

    setResultadoJogador1('');
    setResultadoJogador2('');

    setVezJogador(2);
  }

  function jogarJogador2() {
    const dado1 = sortearDado();
    const dado2 = sortearDado();

    setDado1Jogador2(dado1);
    setDado2Jogador2(dado2);

    const somaJogador1 = dado1Jogador1 + dado2Jogador1;
    const somaJogador2 = dado1 + dado2;

    let novosPontosJogador1 = pontosJogador1;
    let novosPontosJogador2 = pontosJogador2;

    if (somaJogador1 > somaJogador2) {
      setResultadoJogador1('Ganhou');
      setResultadoJogador2('Perdeu');

      novosPontosJogador1++;
      setPontosJogador1(novosPontosJogador1);
    } else if (somaJogador2 > somaJogador1) {
      setResultadoJogador1('Perdeu');
      setResultadoJogador2('Ganhou');

      novosPontosJogador2++;
      setPontosJogador2(novosPontosJogador2);
    } else {
      setResultadoJogador1('Empatou');
      setResultadoJogador2('Empatou');
    }

    if (rodada === 5) {
      setFimDeJogo(true);

      if (novosPontosJogador1 > novosPontosJogador2) {
        Alert.alert(
          'Fim de jogo',
          'Jogador 1 venceu a partida!'
        );
      } else if (novosPontosJogador2 > novosPontosJogador1) {
        Alert.alert(
          'Fim de jogo',
          'Jogador 2 venceu a partida!'
        );
      } else {
        Alert.alert(
          'Fim de jogo',
          'A partida terminou empatada!'
        );
      }

      return;
    }

    setRodada(rodada + 1);
    setVezJogador(1);
  }

  function jogarNovamente() {
    setRodada(1);

    setDado1Jogador1(1);
    setDado2Jogador1(1);

    setDado1Jogador2(1);
    setDado2Jogador2(1);

    setPontosJogador1(0);
    setPontosJogador2(0);

    setResultadoJogador1('');
    setResultadoJogador2('');

    setVezJogador(1);
    setFimDeJogo(false);
  }

  function mensagemFinal() {
    if (pontosJogador1 > pontosJogador2) {
      return 'Jogador 1 venceu a partida!';
    }

    if (pontosJogador2 > pontosJogador1) {
      return 'Jogador 2 venceu a partida!';
    }

    return 'A partida terminou empatada!';
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Jogo de Dados
      </Text>

      <Text style={styles.rodada}>
        Rodada {rodada} de 5
      </Text>

      <Text style={styles.placar}>
        Placar: {pontosJogador1} x {pontosJogador2}
      </Text>

      <View style={styles.jogadores}>
        <View style={styles.jogador}>
          <Text style={styles.nomeJogador}>
            Jogador 1
          </Text>

          <View style={styles.dados}>
            <Dado valor={dado1Jogador1} />
            <Dado valor={dado2Jogador1} />
          </View>

          <Text style={styles.soma}>
            Soma: {dado1Jogador1 + dado2Jogador1}
          </Text>

          <Text style={styles.resultado}>
            {resultadoJogador1}
          </Text>

          <Button
            title="Jogar Dados"
            onPress={jogarJogador1}
            disabled={vezJogador !== 1 || fimDeJogo}
          />
        </View>

        <View style={styles.jogador}>
          <Text style={styles.nomeJogador}>
            Jogador 2
          </Text>

          <View style={styles.dados}>
            <Dado valor={dado1Jogador2} />
            <Dado valor={dado2Jogador2} />
          </View>

          <Text style={styles.soma}>
            Soma: {dado1Jogador2 + dado2Jogador2}
          </Text>

          <Text style={styles.resultado}>
            {resultadoJogador2}
          </Text>

          <Button
            title="Jogar Dados"
            onPress={jogarJogador2}
            disabled={vezJogador !== 2 || fimDeJogo}
          />
        </View>
      </View>

      {fimDeJogo && (
        <View style={styles.final}>
          <Text style={styles.mensagemFinal}>
            {mensagemFinal()}
          </Text>

          <Button
            title="Jogar Novamente"
            onPress={jogarNovamente}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },

  rodada: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 5,
  },

  placar: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
  },

  jogadores: {
    flexDirection: 'row',
    gap: 15,
  },

  jogador: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 10,
    padding: 10,
  },

  nomeJogador: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  dados: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
  },

  soma: {
    fontSize: 16,
    marginTop: 15,
  },

  resultado: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
  },

  final: {
    marginTop: 30,
    alignItems: 'center',
    gap: 15,
  },

  mensagemFinal: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});