import React from 'react'
import { View, ScrollView, Text, Button } from 'react-native'
import { IconChoice } from './IconChoice'
import { styles } from './styles'

export type Props = {
  title: string;
  description: string;
  items: Array<Object>;
}

const Carousel: React.FC<Props> = ({
  title, 
  description,
  items,
  // how do we get the choices hooked up to strings?
  // how do we get the icons to ChoicePicker?
  // what do the icons look like?
}) => {

  // const [width, setWidth] = React.useState(0);

  // const init = (width: number) => {
  //   // initialise width
  //   setWidth(width);
  //   // initialise total intervals
  //   // const totalItems = items.length;
  // }

  return (
    <View>
       <Text>{title}</Text>
           <Button
           title="clear"
             onPress={() => console.log("Cleared")}
           />
       <Text>{description}</Text>
    
      <View style={styles.container}>
        <ScrollView
          horizontal={true}
          contentContainerStyle={{ ...styles.scrollView, width: 400}}//`${100 * intervals}%` }}}
          // onContentSizeChange={(w, h) => init(w)}
          // onScroll={data => {
          //   setWidth(data.nativeEvent.contentSize.width);
          // }}
          scrollEventThrottle={200}
          decelerationRate="fast"
        >
          {items.map((item: any, index: number) => {
                return (
                  <IconChoice
                    key={index}
                    label={item.label}
                  />);
          })}
        </ScrollView>
      </View>
    </View>
  )
}

export default Carousel;