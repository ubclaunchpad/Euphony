import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import React from 'react';

import { View, Text, SafeAreaView, Platform } from 'react-native'

export default function CustomHeader(headerOptions: NativeStackHeaderProps) {

    let right;
    if (headerOptions.options.headerRight) {
        right = headerOptions.options.headerRight({})
    }
    let left;
    if (headerOptions.options.headerLeft) {
        left = headerOptions.options.headerLeft({})
    }

    let topPadding = 0;
    if (Platform.OS === 'android') {
        topPadding = headerOptions.route.name == "Playlist" ? 30 : 20;
    }

    let text = <Text numberOfLines={1} style={{ color: 'black', textAlign: 'left', fontFamily: "Raleway-ExtraBold", fontSize: headerOptions.options.headerTitleStyle.fontSize ?? 32, maxWidth: 180 }}>{headerOptions.options.title?.substring(0, 20)}</Text>;

    return (
        <SafeAreaView style={{
            backgroundColor: '#fff',
        }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, marginHorizontal: 25, marginTop: topPadding }
            } >
                { headerOptions.route.name == "Playlist" ? 
                    <>
                        <View style={{flex: 1}}>
                            {left}
                        </View>
                        <View style={{flex: 4, alignItems: 'center'}}>
                            {text}
                        </View>
                        <View style={{flex: 1}}>
                            {right}
                        </View>
                    </>
                    :
                    <>
                        {left}
                        {text}
                        {right}
                    </>
                }
                
            </ View>
            <View style={{ height: 1, backgroundColor: '#4E2296', opacity: 0.35 }}></View>
        </SafeAreaView>
    )
}