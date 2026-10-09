import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { colors, spacing, borderRadius, typography } from '../theme';

interface AIChatBubbleProps {
  text: string;
  isUser: boolean;
  timestamp?: string;
}

const AIChatBubble = ({ text, isUser, timestamp }: AIChatBubbleProps) => {
  return (
    <Animated.View
      entering={FadeInDown.duration(300)}
      style={[
        styles.container,
        isUser ? styles.userContainer : styles.aiContainer,
      ]}
    >
      <View
        style={[
          styles.bubble,
          isUser ? styles.userBubble : styles.aiBubble,
        ]}
      >
        <Text
          style={[
            styles.text,
            isUser ? styles.userText : styles.aiText,
          ]}
        >
          {text}
        </Text>
        {timestamp && (
          <Text
            style={[
              styles.time,
              isUser ? styles.userTime : styles.aiTime,
            ]}
          >
            {timestamp}
          </Text>
        )}
      </View>
    </Animated.View>
  );
};

export default AIChatBubble;

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.sm,
    flexDirection: 'row',
    width: '100%',
  },
  userContainer: {
    justifyContent: 'flex-end',
    paddingLeft: 40,
  },
  aiContainer: {
    justifyContent: 'flex-start',
    paddingRight: 40,
  },
  bubble: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 20,
    maxWidth: '100%',
    shadowColor: '#A68A64',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  userBubble: {
    backgroundColor: '#B08D57', // Gold
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: colors.white, // White
    borderWidth: 1,
    borderColor: '#EAE4DC',
    borderBottomLeftRadius: 4,
  },
  text: {
    ...typography.bodyMedium,
    lineHeight: 20,
  },
  userText: {
    color: colors.white,
  },
  aiText: {
    color: '#2D2D2D',
  },
  time: {
    ...typography.caption,
    fontSize: 9,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  userTime: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  aiTime: {
    color: '#B8A898',
  },
});
