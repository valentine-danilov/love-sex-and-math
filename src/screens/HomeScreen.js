import * as React from 'react';
import {View, Text} from 'react-native';
import {Button} from "react-native";

export const HomeScreen = ({ navigation }) => {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Home Screen!</Text>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Details')}
            />
        </View>
    )
}