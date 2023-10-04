import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { Divider } from 'react-native-paper';
import Colors from '../helper/Colors';
import Spaces from '../helper/Spaces';
import Fonts from '../helper/Fonts';
import { handleGetRequest } from '../helper/Utils';

const NotificationCenter_Parent = () => {

  useEffect(() => {
    getNotifications()
  }, [])

  const [notifications, setNotifications] = useState(null)

  const H = useWindowDimensions().height
  const W = useWindowDimensions().width

  const getNotifications = async () => {
    const result = await handleGetRequest('get_notification')
    console.log(result)
    setNotifications(result)
  }

  const renderNotifications = ({ item }) => {
    return (
      <>
        <TouchableOpacity style={styles.notificationItem}>
          <View style={styles.notificationContent}>
            <View>
              <Image source={{ uri: item?.image }}
                style={styles.image}
              />
            </View>
            <View style={styles.textView}>
              <Text style={{...Fonts.medBold}}>{item?.title}</Text>
              <Text>{item?.body}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.createdText}>{item?.created}</Text>
          </View>
        </TouchableOpacity>
        <Divider style={styles.divider} />
      </>
    )
  }

  const styles = makeStyles(H, W)

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications?.data}
        keyExtractor={(item) => item.id}
        renderItem={renderNotifications}
      />
    </View>
  );
};

const makeStyles = (H, W) => StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  notificationItem: {

    padding: Spaces.med,
    paddingBottom: 0,
  },
  divider:
  {
    height: 1.2,
    backgroundColor: Colors.grayTransparent,
    marginVertical: 5,
  },
  notificationContent:
  {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  image:
  {
    height: H * 0.04,
    width: H * 0.04,
    marginRight: Spaces.med,
    borderRadius: 8,
  },
  createdText:
  {
    alignSelf: 'flex-end',
    ...Fonts.sm,
    color: Colors.gray
  },
  textView:
  {
    width: W * 0.8,
  }
});

export default NotificationCenter_Parent;
