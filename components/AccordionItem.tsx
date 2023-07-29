import React, { useState, useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

type AccordionItemPros = PropsWithChildren<{
  title: string;
  id: number;
  expandedAccordion: number | null;
  setExpandedAccordion: React.Dispatch<React.SetStateAction<number | null>>;
  onPressTitle: (bookName: string) => void;
}>;

function AccordionItem({ children, title, id, expandedAccordion, setExpandedAccordion, onPressTitle }: AccordionItemPros): JSX.Element {
  const [expanded, setExpanded] = useState(false);

  const handlePress = () => {
    onPressTitle(title);
    if (id !== expandedAccordion) {
      setExpandedAccordion(id);
    } else {
      setExpandedAccordion(null);
    }
  };

  useEffect(() => {
    setExpanded(id === expandedAccordion);
  }, [expandedAccordion]);

  const body = <View style={styles.accordBody}>{ children }</View>;

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.accordContainer}>
        <View style={styles.accordHeader}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={[styles.accordTitle, {flex: 1, marginRight: 10}]}>{ title }</Text>
            <Icon name={ expanded ? 'chevron-up' : 'chevron-down' } size={20} color="#bbb" style={{textAlign: 'right'}}/>
          </View>
        </View>
        { expanded && body }
      </View>
    </TouchableOpacity>
  );
}






const styles = StyleSheet.create({
    accordContainer: {
        width: '100%',
        marginVertical: 5,
        paddingHorizontal: 0,
        overflow: 'hidden',
        marginLeft: 10,
        paddingRight: 10,
    },
    accordHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 6,
    },
    accordTitle: {
        fontSize: 12,
    },
    accordBody: {
        padding: 10,
    },
});

export default AccordionItem;
