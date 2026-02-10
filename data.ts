import { 
  Shield, 
  BookOpen, 
  Users, 
  Terminal, 
  Gavel, 
  MessageSquare,
  Server,
  HeartHandshake
} from 'lucide-react';
import { ContentSection } from './types';

export const GUIDE_DATA: ContentSection[] = [
  {
    id: 'welcome',
    title: 'Welcome',
    icon: HeartHandshake,
    description: 'Introduction to the BeeSim Staff Team',
    content: "As a staff member, you're the face of our server. This comprehensive guide will help you understand your responsibilities, commands at your disposal, and how to excel in your role to provide the best experience for our players."
  },
  {
    id: 'guidelines',
    title: 'Guidelines',
    icon: BookOpen,
    description: 'Expectations for professionalism and conduct',
    subSections: [
      {
        title: 'Professionalism',
        content: "As a staff member, your conduct sets the standard for the entire community. Professionalism isn't just about following rules; it's about maintaining composure under pressure, treating every player with respect regardless of their behavior, and representing the server's values in every interaction. You are the face of BeeSim, and your ability to remain calm and objective in stressful situations inspires confidence and trust. Never let personal emotions dictate your administrative actions.",
        list: [
          'Be patient with new players',
          'Remain calm in stressful situations',
          'Set a positive example in chat'
        ]
      },
      {
        title: 'Communication',
        content: 'Effective moderation relies heavily on clear, concise, and empathetic communication. When addressing rule violations, explain the "why" behind the rule, not just the punishment. Use proper grammar to maintain authority and clarity. Coordinate seamlessly with your fellow staff members in private channels to ensure a unified front. Your words have weight—use them to de-escalate conflicts and guide players towards positive behavior rather than simply punishing them.',
        list: [
          'Explain rules and punishments clearly',
          'Use proper grammar and spelling',
          'Be concise but thorough in explanations',
          'Coordinate with other staff members'
        ]
      },
      {
        title: 'Fairness',
        content: 'Trust is the foundation of our community, and it is built on consistent and fair application of the rules. Every player, regardless of their rank, playtime, or relationship with staff, must be treated equally. Adhere strictly to the punishment guidelines to ensure predictability, but use your judgment to understand context. Fairness also means admitting when you are wrong; correcting a mistake shows strength of character and reinforces our commitment to justice.',
        list: [
          'Apply rules consistently to all players',
          "Don't show favoritism",
          'Follow punishment guidelines',
          'Be willing to admit and correct mistakes'
        ]
      }
    ]
  },
  {
    id: 'roles',
    title: 'Roles',
    icon: Users,
    description: 'Responsibilities per staff rank',
    subSections: [
      {
        title: 'Helper',
        content: "As a helper, your primary focus is on player support and chat moderation. You're the first line of defense against rule-breakers and the first point of contact for new players.",
        list: [
          'Moderate chat and enforce rules',
          'Help new players understand the server',
          'Answer questions and provide guidance',
          'Issue warnings and mutes for minor offenses',
          'Escalate serious issues to higher staff'
        ]
      },
      {
        title: 'Junior Moderator',
        content: "As a Jr. Mod, you take on more responsibility in player moderation while continuing to assist players. You now have tools to handle more serious offenses.",
        list: [
          'Continue chat moderation duties',
          'Handle intermediate level offenses',
          'Use basic moderation tools to catch hackers',
          'Assist with simple in-game issues',
          'Help train new Helpers'
        ]
      },
      {
        title: 'Moderator',
        content: "Moderators are experienced staff members who handle the full range of moderation duties and player support. You're trusted with significant responsibilities.",
        list: [
          'Investigate and punish serious offenses',
          'Handle player reports and tickets',
          'Resolve complex player issues',
          'Assist with server events',
          'Mentor junior staff members',
          'Help maintain server stability'
        ]
      }
    ]
  },
  {
    id: 'commands',
    title: 'Commands',
    icon: Terminal,
    description: 'Reference for staff commands',
    subSections: [
      {
        title: 'Helper Commands',
        commands: [
          { name: '/libertybans history <Player>', description: "Checks the player's punishment history.", usage: 'Before issuing punishments, check if the player has prior offenses' },
          { name: '/libertybans mute <Player> <Time> <Reason>', description: 'Temporarily mutes a player from chat.', usage: 'Use for chat offenses (spam, swearing, etc.)' },
          { name: '/cc', description: 'Clears the global chat.', usage: 'Use when chat is being flooded or contains inappropriate content' },
          { name: '/sc', description: 'Staff chat - only visible to staff.', usage: 'For staff communication and coordination' },
          { name: '/libertybans warn <Player> <Reason>', description: 'Issues a formal warning to a player.', usage: 'For minor first-time offenses' },
          { name: '/fly', description: 'Toggles flight mode.', usage: 'Use to catch hackers or assist players' },
        ]
      },
      {
        title: 'Jr. Mod Commands',
        commands: [
          { name: '/libertybans ban <Player> <Time> <Reason>', description: 'Temporarily bans a player from the server.', usage: 'For serious or repeated offenses' },
          { name: '/gm spectator', description: 'Switches to spectator mode.', usage: 'For observing potential hackers' },
          { name: '/vanish', description: 'Toggles invisibility to normal players.', usage: 'For discreet moderation' },
          { name: '/teleport <Player>', description: 'Teleports to a player.', usage: 'To quickly reach players needing help' },
          { name: '/invsee <Player>', description: "Views a player's inventory.", usage: 'To check for illegal items or verify reports' },
        ]
      },
      {
        title: 'Moderator Commands',
        commands: [
          { name: '/libertybans ban <Player> <Reason>', description: 'Permanently bans a player.', usage: 'For severe offenses or repeat offenders' },
          { name: '/adminbees <Player> <Action>', description: "Modifies a player's bees.", usage: 'For correcting issues or special cases' },
          { name: '/libertybans alts <Player>', description: "Shows a player's alternate accounts.", usage: 'Set time to 999d for permanent bans' },
          { name: '/libertybans mutelist', description: 'Shows currently muted players.', usage: 'To review active mutes' },
          { name: '/libertybans banlist', description: 'Shows currently banned players.', usage: 'To review active bans' },
          { name: '/libertybans banip <Player> <Time> <Reason>', description: "Bans a player's IP address.", usage: 'For severe cases only (ban evasion, etc.)' },
          { name: '/reports', description: 'Views player-submitted reports.', usage: 'To handle player reports' },
          { name: '/modmode', description: 'Toggles moderation mode.', usage: 'When actively moderating' },
          { name: '/libertybans kick <Player> <Reason>', description: 'Kicks a player from the server.', usage: 'For temporary removal (not punishment)' },
          { name: '/gamemode <Mode>', description: 'Changes your gamemode.', usage: 'For moderation and building purposes' },
        ]
      }
    ]
  },
  {
    id: 'punishments',
    title: 'Punishments',
    icon: Gavel,
    description: 'Guidelines for issuing punishments',
    subSections: [
      {
        title: 'Chat Offenses',
        table: [
          { offense: 'Spam', description: 'Repeatedly sending similar messages', examples: '"Hi" x10, copy-pasting', punishment: 'Warn → 15m → 30m → 1h → 6h → 1d' },
          { offense: 'Flooding', description: 'Filling chat with nonsense', examples: 'Random letters, long repeated text', punishment: 'Warn → 30m → 1h → 3h → 6h → 1d' },
          { offense: 'Swearing', description: 'Excessive or targeted profanity', examples: 'Foul language', punishment: 'Warn → 30m → 1h → 3h → 6h → 1d' },
          { offense: 'Disrespect', description: 'Targeted harassment or staff disrespect', examples: 'Personal attacks', punishment: 'Warn → 15m → 30m → 1h → 6h → 1w' },
          { offense: 'Racism/Hate', description: 'Racial slurs or hate speech', examples: 'Slurs, discrimination', punishment: '7d → 30d → Perm mute/ban' },
        ]
      },
      {
        title: 'Gameplay Offenses',
        table: [
          { offense: 'Hacking', description: 'Using unauthorized modifications', examples: 'Kill aura, fly hacks', punishment: '14d → 30d → 45d → Perm ban' },
          { offense: 'Exploiting', description: 'Abusing bugs for advantage', examples: 'Dupes, item exploits', punishment: 'Item removal + 14d → 30d + wipe → Perm' },
          { offense: 'Doxxing/DDOS', description: 'Sharing personal information', examples: 'IP addresses, real names', punishment: 'Perm IP ban + report' },
          { offense: 'Chargebacks', description: 'Reversing store payments', examples: 'Disputing PayPal', punishment: 'Blacklist + perm ban' },
          { offense: 'Scamming', description: 'Fraudulent in-game deals', examples: 'Scamming items', punishment: 'Item return + 14d → 30d → 45d' },
        ]
      }
    ]
  },
  {
    id: 'discord',
    title: 'Discord',
    icon: MessageSquare,
    description: 'Discord server rules and commands',
    subSections: [
      {
        title: 'Chat Offenses (Mute or Ban)',
        list: [
          'Spamming (repeating messages unnecessarily)',
          'Character spam (12+ repeated characters)',
          'Excessive use of caps (12+ capital letters)',
          'Inappropriate language or behavior',
          'Advertising other servers or services',
          'Racism or hate speech',
          'Encouraging or glorifying self-harm or death',
          'Promoting spam in chat',
          'Disrespecting staff members'
        ]
      },
      {
        title: 'Gameplay Offenses (Ban)',
        list: [
          'Using hacked clients or unfair mods for PvE',
          'Ban evasion using alternate accounts',
          'Engaging in real-life (IRL) trading',
          'DDoS or doxing threats or actions (zero tolerance)',
          'Attempting or completing chargebacks'
        ]
      },
      {
        title: 'Bot Commands',
        commands: [
          { name: '!bsinfo', description: 'General server information.', usage: 'When new players ask basic questions' },
          { name: '!support', description: 'How to get support.', usage: 'Directing players to proper channels' },
          { name: '!apply', description: 'Staff application info.', usage: 'When players ask about joining staff' },
          { name: '!bug', description: 'Bug reporting guide.', usage: 'When players find and report bugs' },
          { name: '!ip', description: 'Server connection info.', usage: 'Quickly provide server IP' },
          { name: '!beta', description: 'Beta testing info.', usage: 'Questions about beta access' },
        ]
      }
    ]
  }
];