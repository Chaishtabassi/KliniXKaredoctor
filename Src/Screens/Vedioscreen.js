import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ZegoUIKitPrebuiltCall, ONE_ON_ONE_VIDEO_CALL_CONFIG } from '@zegocloud/zego-uikit-prebuilt-call-rn';

const Vedioscreen = ({ navigation }) => {
    const userId = String(Math.floor(Math.random() * 100000));

    return (
        <View style={{ flex: 1 }}>
            <ZegoUIKitPrebuiltCall
                appID={1532018271}
                appSign={"d14088947a400a221d6566dbfad5b13dd492b9c07eb17659e425e16ad3eb8aa6"}
                userID={userId}
                userName={`user_${userId}`} // Use backticks for string interpolation
                callID={'group_123'}
                config={{
                    ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
                    onOnlySelfInRoom: () => {
                        // Uncomment this line to navigate when the user is the only one in the room
                        // navigation.navigate('bottom');
                    },
                    onHangUp: () => {
                        // Uncomment this line to navigate when the call is hung up
                        navigation.navigate('message');
                    },
                }}
            />
        </View>
    )
}

export default Vedioscreen

const styles = StyleSheet.create({})
