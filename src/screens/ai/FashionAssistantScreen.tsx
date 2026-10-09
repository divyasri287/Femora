import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { ScreenContainer, LuxuryHeader } from '../../components/common';
import AIChatBubble from '../../components/AIChatBubble';
import { colors, spacing, borderRadius, shadows, typography } from '../../theme';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
  ctaAction?: string;
  ctaText?: string;
}

const SUGGESTIONS = [
  'Suggest a wedding dress 👰',
  'Show pink dresses under ₹2000 💖',
  'I need an office outfit 🏢',
  'Suggest party wear 🎉',
];

const FashionAssistantScreen = ({ navigation }: any) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello, Beautiful ✨ I am your personal Femora AI Stylist. Tell me what event or look you are preparing for, and I will craft the perfect outfit recommendation.',
      isUser: false,
      timestamp: '10:00 AM',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const getAIResponse = (query: string): { text: string; ctaText?: string; ctaAction?: string } => {
    const q = query.toLowerCase();
    if (q.includes('wedding')) {
      return {
        text: 'For a wedding look, I highly recommend our Ivory Silk Wrap Dress or Pearl Embellished Lehenga. I have prepared a complete coordinated look with matching gold jewellery and heels.',
        ctaText: 'View Wedding Outfit',
        ctaAction: 'wedding',
      };
    } else if (q.includes('2000') || q.includes('pink') || q.includes('under')) {
      return {
        text: 'For pink outfits under ₹2000, our Dusty Sage Kurta Set or Rose Lace Co-ord Set (on select sizes) offers incredible value and fits your requirements perfectly. Check out our catalog details.',
        ctaText: 'View Casual Outfit',
        ctaAction: 'casual',
      };
    } else if (q.includes('office') || q.includes('work') || q.includes('professional')) {
      return {
        text: 'For a classic, sophisticated office aesthetic, pair a beige structured linen blazer with our tailored trousers and gold accents. Let me show you the complete outfit look.',
        ctaText: 'View Office Outfit',
        ctaAction: 'office',
      };
    } else if (q.includes('party') || q.includes('evening') || q.includes('night')) {
      return {
        text: 'For evening events, our Champagne Sequin Gown and Emerald Evening Dress are top-rated picks with a 95% style match score. Let me show you the complete setup.',
        ctaText: 'View Party Outfit',
        ctaAction: 'party',
      };
    } else {
      return {
        text: 'I can recommend a complete coordinated look for that! I have gathered options featuring dresses, bags, shoes, and jewelry. Click below to view your personalized layout.',
        ctaText: 'View Recommendations',
        ctaAction: 'luxury',
      };
    }
  };

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: Message = {
      id: Date.now().toString(),
      text: textToSend,
      isUser: true,
      timestamp: time,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Scroll to end
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);

    // Simulate AI response
    setTimeout(() => {
      const reply = getAIResponse(textToSend);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: reply.text,
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        ctaText: reply.ctaText,
        ctaAction: reply.ctaAction,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);

      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    }, 1500);
  };

  const handleCtaPress = (action: string) => {
    navigation.navigate('OutfitRecommendation', { lookType: action, label: 'Stylist Pick' });
  };

  return (
    <ScreenContainer style={styles.container}>
      <LuxuryHeader title="AI Assistant" showBack />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        {/* Messages List */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.messageList}
          renderItem={({ item }) => (
            <View style={styles.bubbleWrapper}>
              <AIChatBubble
                text={item.text}
                isUser={item.isUser}
                timestamp={item.timestamp}
              />
              {item.ctaText && (
                <Animated.View
                  entering={FadeInUp.duration(400)}
                  style={styles.ctaWrapper}
                >
                  <TouchableOpacity
                    style={styles.ctaButton}
                    onPress={() => handleCtaPress(item.ctaAction || '')}
                    activeOpacity={0.85}
                  >
                    <Text style={styles.ctaText}>{item.ctaText} →</Text>
                  </TouchableOpacity>
                </Animated.View>
              )}
            </View>
          )}
          ListFooterComponent={
            isTyping ? (
              <View style={styles.typingContainer}>
                <ActivityIndicator size="small" color="#B08D57" />
                <Text style={styles.typingText}>Femora AI Stylist is tailoring ideas...</Text>
              </View>
            ) : null
          }
        />

        {/* Suggestion Chips */}
        {messages.length === 1 && (
          <View style={styles.suggestionsContainer}>
            <Text style={styles.suggestionsTitle}>Suggested Prompts</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.suggestionsScroll}
            >
              {SUGGESTIONS.map((chip, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={styles.chip}
                  onPress={() => handleSend(chip)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.chipText}>{chip}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Input Field */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your styling request..."
            placeholderTextColor="#B8A898"
            value={input}
            onChangeText={setInput}
            onSubmitEditing={() => handleSend(input)}
          />
          <TouchableOpacity
            style={[styles.sendBtn, !input.trim() && styles.sendBtnDisabled]}
            onPress={() => handleSend(input)}
            disabled={!input.trim()}
            activeOpacity={0.85}
          >
            <Text style={styles.sendIcon}>✦</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

export default FashionAssistantScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  messageList: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    paddingBottom: 40,
  },
  bubbleWrapper: {
    marginBottom: spacing.md,
  },
  ctaWrapper: {
    alignItems: 'flex-start',
    paddingLeft: 40,
    marginTop: -4,
  },
  ctaButton: {
    backgroundColor: '#FAF5EC',
    borderWidth: 1,
    borderColor: '#EAE4DC',
    paddingHorizontal: spacing.lg,
    paddingVertical: 8,
    borderRadius: 16,
    ...shadows.soft,
  },
  ctaText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#B08D57', // Gold
  },
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    marginVertical: spacing.md,
  },
  typingText: {
    fontSize: 12,
    color: '#8A7A68',
    fontStyle: 'italic',
  },

  // Suggestions
  suggestionsContainer: {
    marginBottom: spacing.md,
  },
  suggestionsTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#B8A898',
    letterSpacing: 1,
    textTransform: 'uppercase',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },
  suggestionsScroll: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  chip: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EAE4DC',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm + 2,
    borderRadius: borderRadius.round,
    ...shadows.soft,
  },
  chipText: {
    fontSize: 12,
    color: '#2C2C2C',
    fontWeight: '500',
  },

  // Input
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F5F0EA',
    gap: spacing.md,
  },
  input: {
    flex: 1,
    height: 46,
    backgroundColor: '#F8F5F0',
    borderRadius: 23,
    paddingHorizontal: spacing.lg,
    color: '#2C2C2C',
    ...typography.bodyMedium,
    borderWidth: 1,
    borderColor: '#EAE4DC',
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#B08D57', // Gold
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.soft,
  },
  sendBtnDisabled: {
    backgroundColor: '#EAE4DC',
  },
  sendIcon: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '700',
    marginTop: -2,
  },
});