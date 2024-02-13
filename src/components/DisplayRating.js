import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Replace with the appropriate icon library

const DisplayRating = ({ value, size = 30 }) => {
    const renderStars = () => {
        const stars = [];
        const wholeStars = Math.floor(value); // Extract the whole number part
        const hasHalfStar = value % 1 !== 0; // Check if there's a fractional part

        for (let i = 1; i <= 5; i++) {
            let iconName = 'star-o'; // Name of the empty star icon

            if (i <= wholeStars) {
                iconName = 'star'; // Name of the filled star icon for whole stars
            } else if (hasHalfStar && i === wholeStars + 1) {
                iconName = 'star-half-o'; // Name of the half-filled star icon
            }

            stars.push(<Icon key={i} name={iconName} size={size} color="#FFD700" style={{
                width: size
            }} />);
        }

        return stars;
    };

    return (
        <View style={styles.rating}>
            {renderStars()}
        </View>
    );
};

const styles = StyleSheet.create({
    rating: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start'
    }
})

export default DisplayRating;
