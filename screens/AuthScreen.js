import React, { useState } from 'react';
import { View, TextInput, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import styles from '../components/Styles';

export default function AuthScreen() {
    const navigation = useNavigation();
    const auth = getAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    async function handleSignIn() {
        setMessage('');
        setIsError(false);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigation.replace('ListScreen');
        } catch (error) {
            setMessage(error.message);
            setIsError(true);
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry
            />
            {message ? (
                <Text style={isError ? styles.errorText : styles.successText}>
                    {message}
                </Text>
            ) : null}
            <Pressable style={styles.button} onPress={handleSignIn}>
                <Text style={styles.buttonText}>Sign In</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => navigation.navigate('SignupScreen')}>
                <Text style={styles.buttonText}>Go to Sign Up</Text>
            </Pressable>
        </View>
    );
};
