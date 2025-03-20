import { sendNotification } from '@/lib/notifications'
import { NotificationType } from '@/types'

interface EventHandlerOptions {
  userId: string
  data?: Record<string, any>
}

export async function handleAchievement({ userId, data }: EventHandlerOptions) {
  await sendNotification({
    userId,
    title: 'Achievement Unlocked! 🏆',
    description: data?.achievementName || 'You\'ve unlocked a new achievement!',
    type: 'achievement',
    data,
  })
}

export async function handleMilestone({ userId, data }: EventHandlerOptions) {
  await sendNotification({
    userId,
    title: 'Milestone Reached! 🎯',
    description: data?.milestoneName || 'You\'ve reached a new milestone!',
    type: 'milestone',
    data,
  })
}

export async function handleReminder({ userId, data }: EventHandlerOptions) {
  await sendNotification({
    userId,
    title: 'Daily Reminder 🔔',
    description: data?.reminderText || 'Time to continue your journey!',
    type: 'reminder',
    data,
  })
}

export async function handleSystemUpdate({ userId, data }: EventHandlerOptions) {
  await sendNotification({
    userId,
    title: 'System Update 🔄',
    description: data?.updateText || 'Important system update',
    type: 'system',
    data,
  })
}

export async function handlePathwayUpdate({ userId, data }: EventHandlerOptions) {
  await sendNotification({
    userId,
    title: 'Pathway Update 🛣️',
    description: data?.updateText || 'Your pathway has been updated',
    type: 'update',
    data,
  })
}

export async function handleLearningStreak({ userId, data }: EventHandlerOptions) {
  const streakDays = data?.streakDays || 0
  await sendNotification({
    userId,
    title: 'Learning Streak! 🔥',
    description: `You're on a ${streakDays}-day learning streak! Keep it up!`,
    type: 'achievement',
    data,
  })
}

export async function handleNewContent({ userId, data }: EventHandlerOptions) {
  await sendNotification({
    userId,
    title: 'New Content Available 📚',
    description: data?.contentTitle || 'New content has been added to your pathway',
    type: 'update',
    data,
  })
}

export async function handleProfileUpdate({ userId, data }: EventHandlerOptions) {
  await sendNotification({
    userId,
    title: 'Profile Updated ✨',
    description: 'Your profile has been successfully updated',
    type: 'system',
    data,
  })
}

export async function handleSecurityAlert({ userId, data }: EventHandlerOptions) {
  await sendNotification({
    userId,
    title: 'Security Alert 🔒',
    description: data?.alertText || 'Important security notification',
    type: 'system',
    data,
  })
}

export async function handleGoalProgress({ userId, data }: EventHandlerOptions) {
  const progress = data?.progress || 0
  await sendNotification({
    userId,
    title: 'Goal Progress Update 📈',
    description: `You're ${progress}% closer to your goal!`,
    type: 'milestone',
    data,
  })
}

export async function handleInnovationSubmitted({ userId, data }: EventHandlerOptions) {
  await sendNotification({
    userId,
    title: 'Innovation Submitted 💡',
    description: 'Your innovation has been successfully submitted for review',
    type: 'milestone',
    data,
  })
}

export async function handleFeedbackReceived({ userId, data }: EventHandlerOptions) {
  await sendNotification({
    userId,
    title: 'New Feedback Received 📝',
    description: 'You have received new feedback on your submission',
    type: 'update',
    data,
  })
}

export async function handleCollaborationRequest({ userId, data }: EventHandlerOptions) {
  await sendNotification({
    userId,
    title: 'Collaboration Request 🤝',
    description: data?.requestText || 'Someone wants to collaborate with you',
    type: 'system',
    data,
  })
}

export async function handleMentorshipSession({ userId, data }: EventHandlerOptions) {
  await sendNotification({
    userId,
    title: 'Mentorship Session Reminder 👥',
    description: data?.sessionDetails || 'Your mentorship session is coming up',
    type: 'reminder',
    data,
  })
}

export async function handleCommunityHighlight({ userId, data }: EventHandlerOptions) {
  await sendNotification({
    userId,
    title: 'Community Highlight 🌟',
    description: data?.highlightText || 'Your contribution has been featured',
    type: 'achievement',
    data,
  })
} 