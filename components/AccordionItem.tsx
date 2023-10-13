import React, { useState, useEffect } from "react";
import type { PropsWithChildren } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

type AccordionItemPros = PropsWithChildren<{
  title: string;
  id: number;
  expandedAccordion: number | null;
  setExpandedAccordion: React.Dispatch<React.SetStateAction<number | null>>;
  onPressTitle: (bookName: string) => void;
}>;

function AccordionItem({
  children,
  title,
  id,
  expandedAccordion,
  setExpandedAccordion,
  onPressTitle,
}: AccordionItemPros): JSX.Element {
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

  return (
    <TouchableOpacity onPress={handlePress} style={styles.accordContainer}>
      <View style={styles.accordHeader}>
        <Text style={styles.accordTitle}>{title}</Text>
        <Icon
          name={expanded ? "chevron-up" : "chevron-down"}
          size={20}
          color="#777"
        />
      </View>
      {expanded && <View style={styles.accordBody}>{children}</View>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  accordContainer: {
    width: "100%",
    marginVertical: 10,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#F6F6F6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  accordHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 0.5,
    borderColor: "#D1D1D1",
  },
  accordTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  accordBody: {
    padding: 15,
  },
});

export default AccordionItem;
