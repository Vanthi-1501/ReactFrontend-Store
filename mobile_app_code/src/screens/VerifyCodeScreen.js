import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import authService from '../services/authService';

const VerifyCodeScreen = ({ route, navigation }) => {
    const { email } = route.params;
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);

    const handleVerify = async () => {
        if (code.length < 6) {
            Alert.alert('Validation', 'Please enter a 6-digit code');
            return;
        }

        setLoading(true);
        try {
            const response = await authService.verifyResetCode(email, code);
            // Backend returns { resetSession: '...' }
            navigation.navigate('ResetPassword', { resetSession: response.resetSession });
        } catch (error) {
            Alert.alert('Error', error.message || 'Invalid or expired code.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Verify Code</Text>
            <Text style={styles.subtitle}>Enter the 6-digit code sent to {email}</Text>

            <TextInput
                style={styles.input}
                placeholder="000000"
                value={code}
                onChangeText={setCode}
                keyboardType="number-pad"
                maxLength={6}
                textAlign="center"
            />

            <TouchableOpacity style={styles.button} onPress={handleVerify} disabled={loading}>
                {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.buttonText}>Verify Code</Text>}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backText}>Cancel</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#f9f9f9' },
    title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10, textAlign: 'center', color: '#333' },
    subtitle: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 30 },
    input: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 15, borderWidth: 1, borderColor: '#ddd', fontSize: 24, letterSpacing: 8 },
    button: { backgroundColor: '#007bff', padding: 15, borderRadius: 10, alignItems: 'center' },
    buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
    backButton: { marginTop: 20, alignItems: 'center' },
    backText: { color: '#007bff' }
});

export default VerifyCodeScreen;
