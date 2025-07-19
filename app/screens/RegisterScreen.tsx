import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { register } from '../utils/auth';
import colors from '../utils/colors';

export default function RegisterScreen({ navigation }: any) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        if (!name || !email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert('Error', 'Please enter a valid email address');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        if (password.length < 6) {
            Alert.alert('Error', 'Password must be at least 6 characters long');
            return;
        }

        setLoading(true);
        try {
            await register(email, password, name);
            Alert.alert(
                'Success',
                'Account created successfully!',
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.replace('Dashboard')
                    }
                ]
            );
        } catch (error: any) {
            console.error('Registration error:', error);
            const errorMessage = error.message || 'An error occurred during registration';
            Alert.alert('Registration Failed', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style= { styles.container } >
        <Text style={ styles.title }> Create Account </Text>

            < TextInput
    placeholder = "Full Name"
    value = { name }
    onChangeText = { setName }
    style = { styles.input }
    autoCapitalize = "words"
        />

        <TextInput
                placeholder="Email"
    value = { email }
    onChangeText = { setEmail }
    style = { styles.input }
    keyboardType = "email-address"
    autoCapitalize = "none"
        />

        <TextInput
                placeholder="Password"
    value = { password }
    onChangeText = { setPassword }
    style = { styles.input }
    secureTextEntry
        />

        <TextInput
                placeholder="Confirm Password"
    value = { confirmPassword }
    onChangeText = { setConfirmPassword }
    style = { styles.input }
    secureTextEntry
        />

    {
        loading?(
          <View style = { styles.loadingContainer } >
                <ActivityIndicator size="large" color = { colors.primary } />
                    <Text style={ styles.loadingText
    } > Creating Account...</Text>
        </View>
        ) : (
        <TouchableOpacity 
            style= { styles.registerButton }
    onPress = { handleRegister }
    disabled = { loading }
        >
        <Text style={ styles.registerButtonText }> Create Account </Text>
            </TouchableOpacity>
        )
}

<View style={ styles.loginContainer }>
    <Text style={ styles.loginText }> Already have an account ? </Text>
        < TouchableOpacity 
            style = { styles.loginButton }
onPress = {() => navigation.navigate('Login')}
          >
    <Text style={ styles.loginButtonText }> Login </Text>
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
        backgroundColor: colors.background,
    },
    title: {
        fontSize: 32,
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
    loadingContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    loadingText: {
        marginTop: 10,
        color: colors.textSecondary,
        fontSize: 16,
    },
    registerButton: {
        backgroundColor: colors.primary,
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 12,
        marginVertical: 8,
        shadowColor: colors.shadowLight,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    registerButtonText: {
        color: colors.white,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    loginContainer: {
        marginTop: 32,
        alignItems: 'center',
    },
    loginText: {
        fontSize: 16,
        color: colors.textSecondary,
        marginBottom: 12,
    },
    loginButton: {
        borderWidth: 2,
        borderColor: colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 12,
        backgroundColor: colors.white,
    },
    loginButtonText: {
        color: colors.primary,
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
});
