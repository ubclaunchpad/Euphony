import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import React from 'react';

import { View, Text, SafeAreaView } from 'react-native'

export default function CustomHeader(headerOptions: NativeStackHeaderProps) {
    console.log(headerOptions)

    let right;
    if (headerOptions.options.headerRight) {
        right = headerOptions.options.headerRight({})
    }
    let left;
    if (headerOptions.options.headerLeft) {
        left = headerOptions.options.headerLeft({})
    }
    return (
        <SafeAreaView style={{
        }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, marginHorizontal: 25 }
            } >
                {left}
                <Text style={{ textAlign: 'left', fontFamily: "Raleway-ExtraBold", fontSize: headerOptions.options.headerTitleStyle.fontSize ?? 32 }}>{headerOptions.options.title}</Text>
                {right}
            </ View>
            <View style={{ height: 1, backgroundColor: '#4E2296', opacity: 0.35 }}></View>
        </SafeAreaView>
    )
}