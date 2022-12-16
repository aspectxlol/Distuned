import { RGBTuple } from "@discordjs/builders"

export interface role {
  id: string
  name: string
  configuration: {
    on_join?: boolean
  }
}

export interface welcome {
  id: string
  message: string
  color?: number | RGBTuple
}

export interface leave {
  id: string
  message: string
  color?: number | RGBTuple
}

export type specialChannelTypes = 
  'Announcements' |
  'Welcome' |
  'Rules' | 
  'Logs' |
  'Leave' 

export interface specialChannel {
  id: string
  channelId: string
  type: specialChannelTypes
}

export interface guildData {
  id: string
  name: string
  role: role[]
  welcome: welcome
  leave: leave
  specialChannels: specialChannel[]
}