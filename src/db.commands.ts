import { QuickDB } from "quick.db";
import { v4 as uuid } from 'uuid'
import { specialChannel } from "./types";

export const db = new QuickDB({ filePath: './database/db.sqlite' });

// db.delete('932659866110160936')
const guildId = '932659866110160936';

(async () => {
  // console.log((await db.pull(`${guildId}.specialChannels`, (channel: specialChannel) => channel.channelId === 'e')))
  // console.log(false ? 'e' : 'a')
  console.log(await db.get('aeafgadsa'))
})()