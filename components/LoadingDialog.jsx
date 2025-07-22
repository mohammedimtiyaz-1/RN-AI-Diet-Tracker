import { View, Text, Modal, ActivityIndicator } from 'react-native'
import React from 'react'
import Colors from '../shared/Colors'
import STRINGS from '../constants/strings';

export default function LoadingDialog({ loading = false }) {
    return (
        <Modal transparent visible={loading}>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#00000070'
            }}>
                <View style={{
                    padding: 20,
                    borderRadius: 15,
                    backgroundColor: Colors.PRIMARY,
                    alignItems: 'center'
                }}>
                    <ActivityIndicator size={'large'}
                        color={Colors.WHITE}
                    />
                    <Text style={{
                        color: Colors.WHITE,
                        fontSize: 18,
                        marginTop: 8
                    }}>{STRINGS.LOADING}</Text>

                </View>
            </View>
        </Modal>
    )
}