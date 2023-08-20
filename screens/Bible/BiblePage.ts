import React, { useState, useEffect, useRef } from 'react';

const [selectedVersion, setSelectedVersion] = useState('NIV');
const [selectedBook, setSelectedBook] = useState('Genesis');
const [selectedChapter, setSelectedChapter] = useState('1');

const [versionsData, setVersionsData] = useState([]);
const [booksData, setBooksData] = useState([]);
const [selectedChapters, setSelectedChapters] = useState([]);
const [versesData, setVersesData] = useState([]);
const [selectedBookId, setSelectedBookId] = useState(null);
const [selectedVerses, setSelectedVerses] = useState([]);
const [Loading, setLoading] = useState(false);

const [modalVisible, setModalVisible] = useState(false);
const [modalVisibleBook, setModalVisibleBook] = useState(false);
const [expandedAccordion, setExpandedAccordion] = useState(null);

const EnglishBibleVersions = ["YLT", "KJV", "NKJV", "WEB", "RSV", "CJB", "TS2009", "LXXE", "TLV", "NASB", "ESV", "GNV", "DRB", "NIV2011", "NIV", "NLT", "NRSVCE", "NET", "NJB1985", "AMP", "MSG", "LSV"];

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

            const data = await response.json();
            setBooksData(data);

            // Find the bookId of Genesis in the booksData
            const genesisBook = data.find(book => book.name === 'Genesis');

            if (genesisBook) {
                // Set the selectedBookId state here
                setSelectedBookId(genesisBook.bookid);

                // Fetch Genesis 1 text
                handleChapterPress(genesisBook.bookid, '1');
            } else {
                console.error("Could not find Genesis in the books data");
            }
        } catch (error) {
            console.error(error);
        }
    };

    getBibleVersions();
    getInitialBooks();  // fetch the initial set of books for NIV version
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

const handleChapterPress = async (bookId: string, chapter: string) => {
    setLoading(true);
    try {
        const response = await fetch(`https://bolls.life/get-text/${selectedVersion}/${bookId}/${chapter}/`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data = await response.json();
        // console.log("Received data from fetch:", data);
        // Manipulate the data here to modify the text field
        data = data.map(item => {
            const parts = item.text.split('<br/>');
            if (parts.length > 1) {
                return {
                    ...item,
                    text: `<p style="font-weight: bold; text-align: center;">${parts[0]}</p><br/>${parts.slice(1).join('<br/>')}`
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
    }
    finally {
        setLoading(false);
    }
};

const handleBookPress = (book: any, chapter: string = '1') => {
    setSelectedBook(book.name);
    setSelectedChapter(chapter);

    // Set the selectedBookId state here
    setSelectedBookId(book.bookid);

    // Create an array of chapters from 1 to book.chapters
    const chaptersArray = Array.from({ length: book.chapters }, (_, i) => i + 1);

    setSelectedChapters(chaptersArray);
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

const onVersePress = (verse: any) => {
    const isSelected = selectedVerses.find(item => item.pk === verse.pk);

    if (isSelected) {
        setSelectedVerses(selectedVerses.filter(item => item.pk !== verse.pk));
    } else {
        // add the verse.pk and the verse.text to the selectedVerses array
        setSelectedVerses([...selectedVerses, { pk: verse.pk, text: verse.text, book: selectedBook, chapter: selectedChapter, verse: verse.verse }]);
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


export {
    selectedVersion,
    selectedBook,
    selectedChapter,
    versionsData, 
    booksData,
    selectedChapters, 
    versesData, 
    selectedBookId, 
    selectedVerses,
    Loading, 
    modalVisible, setModalVisible,
    modalVisibleBook, setModalVisibleBook,
    expandedAccordion, setExpandedAccordion,
    EnglishBibleVersions,
    handleVersionPress,
    handleChapterPress,
    handleBookPress,
    handleSelectVersion,
    handleSelectBook,
    bottomSheetRef,
    onVersePress
};