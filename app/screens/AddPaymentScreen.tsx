import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import { apiFetch } from '../services/api';
import colors from '../utils/colors';

export default function AddPaymentScreen({ navigation }: any) {
  const [amount, setAmount] = useState('');
  const [receiver, setReceiver] = useState('');
  const [status, setStatus] = useState('');
  const [method, setMethod] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    setLoading(true);
    try {
      await apiFetch('/payments', {
        method: 'POST',
        body: JSON.stringify({ amount: Number(amount), receiver, status, method }),
      });
      Alert.alert('Success', 'Payment added');
      navigation.goBack();
    } catch (e: any) {
      Alert.alert('Error', e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style= { styles.container } >
    <Text style={ styles.title }> Add New Payment </Text>

      < TextInput
  placeholder = "Amount"
  value = { amount }
  onChangeText = { setAmount }
  keyboardType = "numeric"
  style = { styles.input }
    />
    <TextInput 
        placeholder="Receiver"
  value = { receiver }
  onChangeText = { setReceiver }
  style = { styles.input }
    />
    <TextInput 
        placeholder="Status"
  value = { status }
  onChangeText = { setStatus }
  style = { styles.input }
    />
    <TextInput 
        placeholder="Method"
  value = { method }
  onChangeText = { setMethod }
  style = { styles.input }
    />

    <TouchableOpacity 
        style={ [styles.button, loading && styles.buttonDisabled] }
  onPress = { handleAdd }
  disabled = { loading }
    >
    <Text style={ styles.buttonText }>
      { loading? 'Adding...': 'Add Payment' }
      </Text>
      </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: colors.background
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 32,
    color: colors.textPrimary,
  },
  input: {
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    fontSize: 16,
    backgroundColor: colors.white,
    color: colors.textPrimary,
  },
  button: {
    backgroundColor: colors.secondary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginTop: 16,
    shadowColor: colors.shadowDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: colors.gray400,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
}); 