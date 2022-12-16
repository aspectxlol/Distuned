import { Guild, GuildAuditLogs, RGBTuple, TextChannel } from "discord.js";
import { QuickDB } from "quick.db";
import { guildData, leave, specialChannel, specialChannelTypes, welcome } from "../types";
import { v4 as uuid } from 'uuid'
import { embedColors } from "../constants";
import Bot from "../structures/Bot";

export const db = new QuickDB({ filePath: process.env.DATABASE_URL! })

export const guildDB = {
  setup: async (guild: Guild) => {
    return (await db.set(`${guild.id}`, {
      id: guild.id,
      name: guild.name
    }) as guildData)
  },
  get: async (guildId: string) => {
    return (await db.get(`${guildId}`)) as guildData
  },
  specialChannels: {
    add: async (guildId: string, channelId: string, type: specialChannelTypes) => {
      if (((await db.get(`${guildId}.specialChannels`)) as specialChannel[]).filter(channel => channel.type === type)) return false
      return (await db.push(`${guildId}.specialChannels`, {
        id: uuid(),
        channelId: channelId,
        type: type
      })) as specialChannel[]
    },
    remove: async (guildId: string, channelId: string) => {
      if (!((await db.get(`${guildId}.specialChannels`)) as specialChannel[]).filter(channel => channel.channelId === channelId)) return false
      return (await db.pull(`${guildId}.specialChannels`, (channel: specialChannel) => channel.channelId === channelId)) as specialChannel[]
    },
    getLogs: async (guildId: string) => {
      if (((await db.get(`${guildId}.specialChannels`)) as specialChannel[]).filter(channel => channel.type === 'Logs')) return false
      return ((await db.get(`${guildId}.specialChannels`)) as specialChannel[]).filter(channel => channel.type === 'Logs')[0]
    },
    getWelcome: async (guildId: string) => {
      if (((await db.get(`${guildId}.specialChannels`)) as specialChannel[]).filter(channel => channel.type === 'Welcome')) return false
      return ((await db.get(`${guildId}.specialChannels`)) as specialChannel[]).filter(channel => channel.type === 'Welcome')[0]
    },
    getLeave: async (guildId: string) => {
      if (((await db.get(`${guildId}.specialChannels`)) as specialChannel[]).filter(channel => channel.type === 'Leave')) return false
      return ((await db.get(`${guildId}.specialChannels`)) as specialChannel[]).filter(channel => channel.type === 'Leave')[0]
    },
    getAnnouncements: async (guildId: string) => {
      if (((await db.get(`${guildId}.specialChannels`)) as specialChannel[]).filter(channel => channel.type === 'Announcements')) return false
      return ((await db.get(`${guildId}.specialChannels`)) as specialChannel[]).filter(channel => channel.type === 'Announcements')[0]
    },
    getRules: async (guildId: string) => {
      if (((await db.get(`${guildId}.specialChannels`)) as specialChannel[]).filter(channel => channel.type === 'Rules')) return false
      return ((await db.get(`${guildId}.specialChannels`)) as specialChannel[]).filter(channel => channel.type === 'Rules')[0]
    },
  },
  welcome: {
    setup: async (guildId: string, message: string, color?: number ) => {
      if ((await db.get(`${guildId}.welcome`))) return false
      return (await db.set(`${guildId}.welcome`, {
        id: uuid(),
        message: message,
        color: color? color : embedColors.Blue
      })) as welcome
    },
    update: async (guildId: string, message: string, color?: number | RGBTuple) => {
      if(color) { await db.set(`${guildId}.welcome.color`, color) }
      return (await db.set(`${guildId}.welcome.message`, message))
    },
    get: async (guildId: string) => {
      return (await db.get(`${guildId}.welcome`)) as welcome
    },
    remove: async (guildId: string) => {
      return (await db.delete(`${guildId}.welcome`))
    }
  },
  leave: {
    setup: async (guildId: string, message: string, color?: number ) => {
      if ((await db.get(`${guildId}.leave`))) return false
      return (await db.set(`${guildId}.leave`, {
        id: uuid(),
        message: message,
        color: color? color : embedColors.Blue
      })) as leave
    },
    update: async (guildId: string, message: string, color?: number | RGBTuple) => {
      if(color) { await db.set(`${guildId}.leave.color`, color) }
      return (await db.set(`${guildId}.leave.message`, message))
    },
    get: async (guildId: string) => {
      return (await db.get(`${guildId}.leave`)) as leave
    },
    remove: async (guildId: string) => {
      return (await db.delete(`${guildId}.leave`))
    }
  },
  roles: {}
}