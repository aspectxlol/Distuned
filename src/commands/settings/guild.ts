import { SlashCommandBuilder, CacheType, EmbedBuilder, basename, ChatInputCommandInteraction } from "discord.js"
import Bot from "../../structures/Bot"
import BotCommand from "../../structures/BotCommand"
import { guildDB } from "../../utils/database"
import { embedColors } from "../../constants"

class guild extends BotCommand {
  constructor() {
    super(
      new SlashCommandBuilder()
        .setName('guild')
        .setDescription('guild settings')
        .addSubcommand(op => op
          .setName('setup')
          .setDescription('setup a guild')
        )
        .toJSON()
    )
  }

  public async execute(
    interaction: ChatInputCommandInteraction<CacheType>,
    client: Bot
  ) {
    const subcmd = interaction.options.getSubcommand()
    if (subcmd === 'setup') {
      if (await guildDB.get(interaction.guild?.id!)) return interaction.reply({
        embeds: [new EmbedBuilder()
          .setTitle(`${interaction.guild?.name} is in the database!`)
          .setDescription('No Need to set it up again')
          .setThumbnail(interaction.guild?.iconURL()!)
          .setColor(embedColors.Green)
        ]
      })
      return interaction.reply({
        embeds: [new EmbedBuilder()
          .setTitle(`${interaction.guild?.name} is now Set Up & Registered in the Database!`)
          .setDescription('You can now use Guild Specific commands')
          .setThumbnail(interaction.guild?.iconURL()!)
          .setColor(embedColors.Green)
        ]
      })
    }
  }
}

export default new guild()