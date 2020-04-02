import React from 'react';
import { View, ActivityIndicator } from 'react-native';


const Spinner = ({size}) => {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40}}>
            <ActivityIndicator size={size || 'large'} />
        </View>
    );
};

export { Spinner };