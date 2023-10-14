import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
  Modal,
  ScrollView,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Header as HeaderRNE } from "react-native-elements";
import RenderHtml from "react-native-render-html";

import AccordionItem from "../../components/AccordionItem";
import BiblePageBottomSheet from "../../components/BiblePageBottomSheet";
import styles from "../../styles/Feeds/Bible.styles";

interface HeaderProps {
  selectedVersion: string;
  selectedBook: string;
  selectedChapter: number;
  onPressVersion: () => void;
  onPressBook: () => void;
}

function Header({
  selectedVersion,
  selectedBook,
  selectedChapter,
  onPressVersion,
  onPressBook,
}: HeaderProps) {
  const router = useRouter();

  return (
    <HeaderRNE
      containerStyle={styles.header}
      leftComponent={{
        icon: "arrow-back",
        color: "#000",
        onPress: () => router.back(),
      }}
      centerComponent={
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Pressable style={styles.leftbutton} onPress={onPressBook}>
            <Text style={styles.buttonText}>
              {selectedBook} {selectedChapter}
            </Text>
          </Pressable>
          <Pressable style={styles.rightbutton} onPress={onPressVersion}>
            <Text style={styles.buttonText}>{selectedVersion}</Text>
          </Pressable>
        </View>
      }
      rightComponent={{
        icon: "search",
        color: "#000",
        onPress: () => {
          /* Your action here */
        },
      }}
    />
  );
}

export default function Page() {
  const windowWidth = Dimensions.get("window").width;

  const EnglishBibleVersions: string[] = [
    "YLT",
    "KJV",
    "NKJV",
    "WEB",
    "RSV",
    "CJB",
    "TS2009",
    "LXXE",
    "TLV",
    "NASB",
    "ESV",
    "GNV",
    "DRB",
    "NIV2011",
    "NIV",
    "NLT",
    "NRSVCE",
    "NET",
    "NJB1985",
    "AMP",
    "MSG",
    "LSV",
  ];

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleBook, setModalVisibleBook] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState("NIV");
  const [selectedBook, setSelectedBook] = useState("Genesis");
  const [selectedChapter, setSelectedChapter] = useState<number>(1);

  const [versionsData, setVersionsData] = useState<
    {
      version: string;
      url: string;
    }[]
  >([]);
  const [booksData, setBooksData] = useState<
    {
      bookid: number;
      name: string;
      chronorder: number;
      chapters: number;
    }[]
  >([]);
  const [selectedChapters, setSelectedChapters] = useState<number[]>([]);
  const [versesData, setVersesData] = useState<
    {
      pk: number;
      verse: number;
      text: string;
    }[]
  >([]);
  const [selectedBookId, setSelectedBookId] = useState<number>(1);

  const [expandedAccordion, setExpandedAccordion] = useState(null);
  const [selectedVerses, setSelectedVerses] = useState([]);
  const [selectedColor, setSelectedColor] = useState("red");
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    const getBibleVersions = async () => {
      try {
        const data = EnglishBibleVersions.map((version) => ({
          version,
          url: `https://bolls.life/get-books/${version}/`,
        }));

        setVersionsData(data);
      } catch (error) {
        console.error(error);
      }
    };

    const getInitialBooks = async () => {
      try {
        const response = await fetch(`https://bolls.life/get-books/NIV/`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = (await response.json()) as {
          bookid: number;
          name: string;
          chronorder: number;
          chapters: number;
        }[];
        setBooksData(data);

        // Find the bookId of Genesis in the booksData
        const genesisBook = data.find((book) => book.name === "Genesis");

        if (genesisBook) {
          // Set the selectedBookId state here
          setSelectedBookId(genesisBook.bookid);

          // Fetch Genesis 1 text
          handleChapterPress(genesisBook.bookid, 1);
        } else {
          console.error("Could not find Genesis in the books data");
        }
      } catch (error) {
        console.error(error);
      }
    };

    getBibleVersions();
    getInitialBooks(); // fetch the initial set of books for NIV version
  }, []);

  const handleVersionPress = async (version: string) => {
    setLoading(true);
    try {
      const response = await fetch(`https://bolls.life/get-books/${version}/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // console.log("Received data from fetch:", data);
      setSelectedVersion(version);
      setBooksData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChapterPress = async (bookId: number, chapter: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://bolls.life/get-text/${selectedVersion}/${bookId}/${chapter}/`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      let data = (await response.json()) as {
        pk: number;
        verse: number;
        text: string;
      }[];
      // console.log("Received data from fetch:", data);
      // Manipulate the data here to modify the text field
      data = data.map((item) => {
        const parts = item.text.split("<br/>");
        if (parts.length > 1) {
          return {
            ...item,
            text: `<p style="font-weight: bold; text-align: center;">${
              parts[0]
            }</p><br/>${parts.slice(1).join("<br/>")}`,
          };
        }
        return item;
      });
      setSelectedChapter(chapter);
      setVersesData(data);
      // Close the modal here
      setModalVisibleBook(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookPress = (book: any, chapter: number = 1) => {
    setSelectedBook(book.name);
    setSelectedChapter(chapter);

    // Set the selectedBookId state here
    setSelectedBookId(book.bookid);

    // Create an array of chapters from 1 to book.chapters
    const chaptersArray = Array.from(
      { length: book.chapters },
      (_, i) => i + 1
    );

    setSelectedChapters(chaptersArray);
  };

  const ChapterGrid = ({
    bookId,
    chapters,
  }: {
    bookId: number;
    chapters: number;
  }) => {
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

  const handleSelectVersion = (version: string) => {
    handleVersionPress(version);
    setModalVisible(false);
  };

  const handleSelectBook = (book: any) => {
    handleBookPress(book);
    setExpandedAccordion(null);
  };

  const bottomSheetRef = useRef(null);

  const onVersePress = (verse) => {
    const isSelected = selectedVerses.find((item) => item.pk === verse.pk);

    if (isSelected) {
      setSelectedVerses(selectedVerses.filter((item) => item.pk !== verse.pk));
    } else {
      // add the verse.pk and the verse.text to the selectedVerses array
      setSelectedVerses([
        ...selectedVerses,
        {
          pk: verse.pk,
          text: verse.text,
          book: selectedBook,
          chapter: selectedChapter,
          verse: verse.verse,
        },
      ]);
    }

    bottomSheetRef.current?.expand();
  };

  // if the user leaves the page, clear the selectedVerses array
  useEffect(() => {
    return () => {
      setSelectedVerses([]);
    };
  }, []);

  // if the user changes the version, clear the selectedVerses array
  useEffect(() => {
    setSelectedVerses([]);
  }, [selectedVersion]);

  // if the user changes the book, clear the selectedVerses array
  useEffect(() => {
    setSelectedVerses([]);
  }, [selectedBook]);

  // if the user switches to a different version get the book for that version, for example, if I was on Samuel 1 for NIV and I switch to KJV, I want to get Samuel 1 for KJV, also change the selectedBook to the book of the new version
  useEffect(() => {
    if (selectedBookId) {
      handleChapterPress(selectedBookId, selectedChapter);
    }
  }, [selectedVersion]);

  return (
    <View
      style={{
        backgroundColor: "#FBF8F8",
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

      {Loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#282C35" />
        </View>
      ) : (
        <FlatList
          contentContainerStyle={{ paddingBottom: 100 }}
          data={versesData}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onVersePress(item)}>
              <RenderHtml
                source={{
                  html: selectedVerses.find((verse) => verse.pk === item.pk)
                    ? item.text.includes("<sup>")
                      ? `<u style="border-bottom: 1px dashed; background-color: ${selectedColor};">${
                          item.text.split("<sup>")[0]
                        }</u><sup>${item.text.split("<sup>")[1]}</sup>`
                      : `<u style="border-bottom: 1px dashed; background-color: ${selectedColor};">${item.text}</u>`
                    : `${item.text}<sup>${item.verse}</sup>`,
                }}
                baseStyle={styles.verseText}
                contentWidth={windowWidth}
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.pk.toString()}
        />
      )}
      <Modal
        animationType="slide"
        transparent
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
        transparent
        visible={modalVisibleBook}
        onRequestClose={() => {
          setModalVisibleBook(!modalVisibleBook);
        }}
      >
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
            onPress={() => setModalVisibleBook(false)}
          >
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
    </View>
  );
}
