import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome'; // Assuming FontAwesome is used for stars

const ReviewCard = ({ profilePicture, date, fullName, rating, review }) => {
    // Function to generate star icons based on rating
    const renderStars = (rating) => {
        const starIcons = [];
        const floorRating = Math.floor(rating);
        const decimalPart = rating - floorRating;

        for (let i = 0; i < 5; i++) {
            if (i < floorRating) {
                starIcons.push(
                    <FontAwesome key={i} name="star" size={20} color="gold" />
                );
            } else if (i === floorRating && decimalPart > 0) {
                starIcons.push(
                    <FontAwesome key={i} name="star-half-o" size={20} color="gold" />
                );
            } else {
                starIcons.push(
                    <FontAwesome key={i} name="star-o" size={20} color="gray" />
                );
            }
        }
        return starIcons;
    };

    return (
        <View style={styles.container}>
            <View style={styles.ratingsContainer}>
                <Image source={{ uri: profilePicture }} style={styles.image} />
                <View>
                    <Text style={styles.name}>{fullName}</Text>
                    <Text>{date}</Text>
                </View>
            </View>
            <View style={styles.starsContainer}>
                {renderStars(rating)}
                <Text style={styles.starText}>{rating?.toFixed(1)} stars</Text>
            </View>
            <Text>{review}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container:
    {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius:8,
    },
    ratingsContainer:
    {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    image:
    {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10
    },
    name:
    {
        fontSize: 16,
        fontWeight: 'bold'
    },
    starsContainer:
    {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    starText:
    {
        marginLeft: 5
    },
})

export default ReviewCard;
