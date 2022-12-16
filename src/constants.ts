import { EmbedBuilder } from "@discordjs/builders"
import { Guild, RGBTuple } from "discord.js"

export const embedColors = {
  Green: 0x61E294,
  Red: 0xFF4365,
  Yellow: 0xFFCF56,
  Blue: 0x20A4F3,
  Lavender: 0xC3BEF7
}

export const errors = {
  GuildNotFound: (guild: Guild) => {
    return new EmbedBuilder()
      .setTitle(`Guild ${guild.name} Not Found in the Database`)
      .setDescription('To Run this command you first need to setup your guild\n(do /guild setup)')
      .setColor(embedColors.Red)
  }
}