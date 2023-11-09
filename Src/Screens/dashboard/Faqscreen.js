import { FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import Backbutton from '../../Component/Backbutton'
import Icon from 'react-native-vector-icons/EvilIcons';

const Faqscreen = () => {

    const faqData = [
        { question: 'Question 1', answer: 'Answer 1' },
        { question: 'Question 2', answer: 'Answer 2' },
        // Add more FAQ items here
      ];

      const [expandedItems, setExpandedItems] = useState({});

      const toggleItem = (question) => {
        setExpandedItems((prevState) => ({
          ...prevState,
          [question]: !prevState[question],
        }));
      };

      const renderFAQItem = ({ item }) => (
        <View style={styles.faqItem}>
          <TouchableOpacity onPress={() => toggleItem(item.question)}>
            <View style={styles.questionContainer}>
              <Text style={styles.question}>{item.question}</Text>
              <Icon
                name={expandedItems[item.question] ? 'chevron-up' : 'chevron-down'}
                size={24}
                color="#333"
              />
            </View>
          </TouchableOpacity>
          {expandedItems[item.question] && <Text style={styles.answer}>{item.answer}</Text>}
        </View>
      );

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Backbutton />
            <Text style={styles.title}>FAQ</Text>
       </View>
       <FlatList
      data={faqData}
      renderItem={renderFAQItem}
      keyExtractor={(item) => item.question}
      style={{padding:15}}
    />
    </View>
  )
}

export default Faqscreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 30,
      },
      title: {
        flex: 1,
        fontSize: 20,
        color: 'black',
        fontWeight: '500',
        textAlign: 'center',
        alignSelf: 'center',
      },
      textContainer: {
        margin: 10,
        padding: 10,
        alignItems: 'center', 
      },
      faqItem: {
        marginBottom: 16,
      },
      questionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      question: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
      },
      answer: {
        fontSize: 16,
        marginTop: 8,
        color: '#555',
      },
})