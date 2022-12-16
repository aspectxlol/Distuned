import { SlashCommandBuilder, ChatInputCommandInteraction, CacheType, ChannelType, TextChannel } from "discord.js"
import { embedColors, errors } from "../../constants"
import Bot from "../../structures/Bot"
import BotCommand from "../../structures/BotCommand"
import { guildDB } from "../../utils/database"
import guild from "./guild"

class welcome extends BotCommand {
  constructor() {
    super(
      new SlashCommandBuilder()
        .setName('welcome')
        .setDescription('welcome settings')
        .addSubcommand(subcmd => subcmd
          .setName('setup')
          .setDescription('setup a welcome message')
          .addChannelOption(o => o
            .setName("channel")
            .setDescription("the welcome channel")
            .setRequired(true)
            .addChannelTypes(ChannelType.GuildText)
          )
          .addStringOption(opt => opt
            .setName('message')
            .setDescription('the welcome message')
            .setRequired(true)
          )
          .addStringOption(opt => opt
            .setName('color')  
            .setDescription('the color of the embed')
            .addChoices(
              { name: 'Green', value: `${embedColors.Green}` },
              { name: 'Red', value: `${embedColors.Red}` },
              { name: 'Yellow', value: `${embedColors.Yellow}` },
              { name: 'Blue', value: `${embedColors.Blue}` },
              { name: 'Lavender', value: `${embedColors.Lavender}` },
            )
          )
        )
        .toJSON()
    )
  }

  public async execute(
    interaction: ChatInputCommandInteraction<CacheType>,
    client: Bot
  ) {
    const subcmd = interaction.options.getSubcommand()
    if (subcmd == "setup"){
      const channel = interaction.options.getChannel("channel") as TextChannel
      const message = interaction.options.getString("message")
      const embedColor = interaction.options.getString('color')
      if (!(await guildDB.get(interaction.guild?.id!))) return interaction.reply({ embeds: [errors.GuildNotFound(interaction.guild!)] })
      await guildDB.specialChannels.add(interaction.guild?.id!, channel.id, 'Welcome').then(() => {
        const color = Number(embedColor)
        guildDB.welcome.setup(interaction.guild?.id!, message!, color)
      })
      
    }
  }
}

export default new welcome()