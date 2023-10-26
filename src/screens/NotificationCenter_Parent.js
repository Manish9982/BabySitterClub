import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import Colors from '../helper/Colors';
import Spaces from '../helper/Spaces';
import Fonts from '../helper/Fonts';
import { handleGetRequest } from '../helper/Utils';
import Loader from '../components/Loader';

const NotificationCenter_Parent = () => {

  useEffect(() => {
    getNotifications()
  }, [])

  const [notifications, setNotifications] = useState(null)
  const [loader, setLoader] = useState(true)

  const H = useWindowDimensions().height
  const W = useWindowDimensions().width

  const getNotifications = async () => {
    setLoader(true)
    const result = await handleGetRequest('get_notification')
    console.log(result)
    setNotifications(result)
    setLoader(false)
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
              <Text style={{ ...Fonts.medBold }}>{item?.title}</Text>
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
    loader
      ?
      <Loader />
      :
      <View style={styles.container}>
        {
          notifications?.data?.length == 0
            ?
            <Text style={styles.errorText}>No notifications found</Text>
            :
            <FlatList
              data={notifications?.data}
              keyExtractor={(item) => item.id}
              renderItem={renderNotifications}
            />

        }

      </View>
  );
};

const makeStyles = (H, W) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  notificationItem: {

    padding: Spaces.sm,
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
    marginRight: Spaces.sm,
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
  },
  errorText:
  {
    alignSelf: 'center'
  }
});

export default NotificationCenter_Parent;
