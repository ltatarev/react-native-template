import React from 'react';
import { Text, View } from 'react-native';
import { useGetPokemonByNameQuery } from '../redux';

export function HomeScreen() {
  const { data, error, isLoading } = useGetPokemonByNameQuery('bulbasaur');

  return (
    <View style={{ flex: 1 }}>
      <Text>Welcome to your new app!</Text>
      {isLoading && <Text>loading...</Text>}
    </View>
  );
}

HomeScreen.propTypes = {};

HomeScreen.defaultProps = {};
