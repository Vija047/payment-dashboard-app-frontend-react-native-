import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { login } from '../utils/auth';
import colors from '../utils/colors';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      Alert.alert('Success', 'Login successful!', [
        { text: 'OK', onPress: () => navigation.replace('Dashboard') }
      ]);
    } catch (error: any) {
      console.error('Login error:', error);
      const errorMessage = error.message || 'Invalid credentials';
      Alert.alert('Login Failed', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style= { styles.container } >
    <Text style={ styles.title }> Login </Text>

      < TextInput
  placeholder = "Email"
  value = { email }
  onChangeText = { setEmail }
  style = { styles.input }
  keyboardType = "email-address"
  autoCapitalize = "none"
  autoComplete = "email"
  editable = {!loading
}
      />

  < TextInput
placeholder = "Password"
value = { password }
onChangeText = { setPassword }
secureTextEntry
style = { styles.input }
autoComplete = "password"
editable = {!loading}
      />

{
  loading ? (
    <View style= { styles.loadingContainer } >
    <ActivityIndicator size="large" color = { colors.primary } />
      <Text style={ styles.loadingText }> Logging in...</Text>
        </View>
      ) : (
    <TouchableOpacity 
          style= { styles.loginButton }
  onPress = { handleLogin }
  disabled = { loading }
    >
    <Text style={ styles.loginButtonText }> Login </Text>
      </TouchableOpacity>
      )
}

<View style={ styles.registerContainer }>
  <Text style={ styles.registerText }> Don & apos;t have an account ? </Text>
    < TouchableOpacity 
          style = { styles.registerButton }
onPress = {() => navigation.navigate('Register')}
disabled = { loading }
  >
  <Text style={ styles.registerButtonText }> Create Account </Text>
    </TouchableOpacity>
    </View>
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
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 32,
    color: colors.textPrimary
  },
  input: {
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    fontSize: 16,
    backgroundColor: colors.white,
    color: colors.textPrimary
  },
  loadingContainer: {
    alignItems: 'center',
    marginVertical: 20
  },
  loadingText: {
    marginTop: 10,
    color: colors.textSecondary,
    fontSize: 16
  },
  loginButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginVertical: 8,
    shadowColor: colors.shadowLight,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4
  },
  loginButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  registerContainer: {
    marginTop: 32,
    alignItems: 'center'
  },
  registerText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 12
  },
  registerButton: {
    borderWidth: 2,
    borderColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: colors.white
  },
  registerButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center'
  }
}); 