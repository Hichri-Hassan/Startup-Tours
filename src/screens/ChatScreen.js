import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const ChatScreen = ({route}) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {id: 1, text: 'Salut ! Super partie ! 🎮', sender: 'other', time: '14:30'},
    {id: 2, text: 'Oui trop cool ! On a les mêmes goûts 😊', sender: 'me', time: '14:32'},
  ]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        sender: 'me',
        time: new Date().toLocaleTimeString('fr-FR', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const renderMessage = ({item}) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === 'me' ? styles.myMessage : styles.otherMessage,
      ]}>
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.messageTime}>{item.time}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={90}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.messagesList}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Écris un message..."
          value={message}
          onChangeText={setMessage}
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>📤</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  messagesList: {
    padding: 16,
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginVertical: 4,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#6B46C1',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E2E8F0',
  },
  messageText: {
    fontSize: 16,
    color: '#fff',
  },
  messageTime: {
    fontSize: 12,
    color: '#E9D8FD',
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  input: {
    flex: 1,
    backgroundColor: '#F7FAFC',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    fontSize: 16,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#6B46C1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    fontSize: 20,
  },
});

export default ChatScreen;
