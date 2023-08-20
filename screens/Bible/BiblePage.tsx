import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Pressable, SafeAreaView, Modal, ScrollView, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import styles from '../../styles/Feeds/Bible.styles';
import { Header as HeaderRNE } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import AccordionItem from '../../components/AccordionItem';
import RenderHtml from 'react-native-render-html';
import BiblePageBottomSheet from '../../components/BiblePageBottomSheet';
import {
  selectedVersion,
  selectedBook,
  selectedChapter,
  versionsData,
  booksData, versesData, selectedVerses, Loading, modalVisible, setModalVisible,
  modalVisibleBook, setModalVisibleBook,
  expandedAccordion, setExpandedAccordion, handleChapterPress,
  handleBookPress,
  handleSelectVersion, bottomSheetRef,
  onVersePress
} from './BiblePage';

interface HeaderProps {
  selectedVersion: string;
  selectedBook: string;
  selectedChapter: string;
  onPressVersion: () => void;
  onPressBook: () => void;
}

function Header({ selectedVersion, selectedBook, selectedChapter, onPressVersion, onPressBook }: HeaderProps) {
  const navigation = useNavigation();

  return (
    <HeaderRNE
      containerStyle={styles.header}
      leftComponent={{ icon: 'arrow-back', color: '#000', onPress: () => navigation.goBack() }}
      centerComponent={
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Pressable style={styles.leftbutton} onPress={onPressBook}>
            <Text style={styles.buttonText}>{selectedBook} {selectedChapter}</Text>
          </Pressable>
          <Pressable style={styles.rightbutton} onPress={onPressVersion}>
            <Text style={styles.buttonText}>{selectedVersion}</Text>
          </Pressable>
        </View>
      }
      rightComponent={{ icon: 'search', color: '#000', onPress: () => { /* Your action here */ } }}
    />
  );
}


export default function BiblePage() {
  const windowWidth = Dimensions.get('window').width;
  const [selectedColor, setSelectedColor] = useState('red');

  const ChapterGrid = ({ chapters, bookId }: { chapters: number, bookId: string }) => {
    const grid = [];
    for (let i = 1; i <= chapters; i++) {
      grid.push(
        <TouchableOpacity
          key={i}
          style={styles.chapterButton}
          onPress={() => handleChapterPress(bookId, i)}
        >
          <Text style={styles.chapterText}>{i}</Text>
        </TouchableOpacity>
      );
    }
    return <View style={styles.chapterGrid}>{grid}</View>;
  };

  return (
    <SafeAreaProvider
      style={{
        backgroundColor: '#FBF8F8',
        flex: 1,
      }}
    >
      <Header
        selectedVersion={selectedVersion}
        selectedBook={selectedBook}
        selectedChapter={selectedChapter}
        onPressVersion={() => setModalVisible(true)}
        onPressBook={() => setModalVisibleBook(true)}
      />

      {Loading ?
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#282C35" />
        </View>
        :
        <FlatList
          contentContainerStyle={{ paddingBottom: 100 }}
          data={versesData}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onVersePress(item)}>
              <RenderHtml
                source={{
                  html: selectedVerses.find(verse => verse.pk === item.pk)
                    ? item.text.includes('<sup>')
                      ? `<u style="border-bottom: 1px dashed; background-color: ${selectedColor};">${item.text.split('<sup>')[0]}</u><sup>${item.text.split('<sup>')[1]}</sup>`
                      : `<u style="border-bottom: 1px dashed; background-color: ${selectedColor};">${item.text}</u>`
                    : `${item.text}<sup>${item.verse}</sup>`
                }}
                baseStyle={styles.verseText}
                contentWidth={windowWidth}
              />


            </TouchableOpacity>
          )}
          keyExtractor={item => item.pk.toString()}
        />
      }
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <SafeAreaView style={styles.modalView}>
          <ScrollView contentContainerStyle={styles.modalContent}>
            <Text style={styles.modalTitle}>Pick a version</Text>
            {versionsData.map((version) => (
              <TouchableOpacity
                key={version.version}
                style={styles.versionItem}
                onPress={() => handleSelectVersion(version.version)}
              >
                <Text style={styles.versionText}>{version.version}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.textStyle}>Close</Text>
          </Pressable>
        </SafeAreaView>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleBook}
        onRequestClose={() => {
          setModalVisibleBook(!modalVisibleBook);
        }}>
        <SafeAreaView style={styles.modalView}>
          <ScrollView contentContainerStyle={styles.modalContent}>
            <Text style={styles.modalTitle}>Pick a book</Text>
            {booksData.map((book, index) => (
              <AccordionItem
                key={index}
                title={book.name}
                id={index}
                expandedAccordion={expandedAccordion}
                setExpandedAccordion={setExpandedAccordion}
                onPressTitle={() => handleBookPress(book)}
              >
                <ChapterGrid chapters={book.chapters} bookId={book.bookid} />
              </AccordionItem>

            ))}
          </ScrollView>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisibleBook(false)}>
            <Text style={styles.textStyle}>Close</Text>
          </Pressable>
        </SafeAreaView>
      </Modal>

      <BiblePageBottomSheet
        ref={bottomSheetRef}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        selectedVerses={selectedVerses}
        onVersePress={onVersePress}
      />
    </SafeAreaProvider>
  );
}
