import { StyleSheet, View, useWindowDimensions } from 'react-native'
import React from 'react'
import FontAwesome6 from 'react-native-vector-icons/dist/FontAwesome6'
import Ionicons from 'react-native-vector-icons/dist/Ionicons'
import Spaces from '../helper/Spaces';
import Colors from '../helper/Colors';
import { Shadows } from '../helper/Utils';

const TagIcon = ({ name, label, fontawesome = false, style, color = Colors.black }) => {
    const H = useWindowDimensions().height
    const W = useWindowDimensions().width
    const styles = makeStyles(H, W)
    return (
        <View style={style || styles.tagIconContainer}>
            {
                fontawesome ?
                    <FontAwesome6 name={name} size={Spaces.lar} color={color} />
                    :
                    <Ionicons name={name} size={Spaces.lar} color={color} />
            }
        </View>
    );
};

export default TagIcon

const makeStyles = (H,W) => StyleSheet.create({
    tagIconContainer: {
        ...Shadows,
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 5,
        borderWidth: 0.2,
        borderRadius: 8,
        backgroundColor: Colors.white,
        padding: 2,
        borderColor: Colors.DEEP_GRAY,
        //flexWrap: 'wrap',
    },
})



