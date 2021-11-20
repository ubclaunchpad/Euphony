import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Image, TouchableWithoutFeedback } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { Text, View } from '../components/Themed';
import AlbumComponent from '../Album';

export interface FilterItem {
    key: string,
    label: string,
    value: string
};

export default function FilterInfoScreen() {
  const imageSrc: string = 'https://www.nme.com/wp-content/uploads/2016/09/2015KendrickLamar_ToPimpAButterfly_110315-1.jpg';
  const filters: FilterItem[]  = [
    {
        key: 'mood',
        label: 'Mood',
        value: 'Happy'
    },
    {
        key: 'activity',
        label: 'Activity',
        value: 'Study'
    },
    {
        key: 'location',
        label: 'Location',
        value: 'Canada'
    },
    {
        key: 'weather',
        label: 'Weather',
        value: 'Rain\nCurrently 9°C | Feels like 7°C'
    }
  ];
  const filterList = filters.map(filter =>
    <View key={`${filter.key}-filter`}>
        <Text>{filter.label}</Text>
        <View key={`${filter.key}-filter-value`} style={styles.filterItem}>
            <MaterialIcons name="circle" style={styles.filterIcon} size={25} color="C4C4C4"/>
            <Text style={styles.filterValue}>{filter.value}</Text>
        </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <View style={styles.playlistInfoContainer}>
        <Image source={{uri: imageSrc}} style={styles.image}/>
        <Text style={styles.title}>Playlist Name</Text>
        <View style={styles.separator}/>
      </View>
      <Text style={styles.title}>Filter Info</Text>
      <View style={styles.filterInfoContainer}>
        {filterList}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  playlistInfoContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 150,
    height: 150,
    marginVertical: 20,
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '100%',
    backgroundColor: 'black'
  },
  filterInfoContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 20
  },
  filterItem: {
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  filterValue: {
    fontWeight: 'bold',
    marginHorizontal: 10
  }
});
