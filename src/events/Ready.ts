import BotCommand from '../structures/BotCommand';
import BotEvent from '../structures/BotEvent';
import Bot from '../structures/Bot';
import { commandFiles, getAllFiles } from '../utils/files';
import { REST, Routes } from 'discord.js'

export default class Ready extends BotEvent<'ready'> {
	commands: BotCommand[];

	constructor(client: Bot) {
		super(client);
		this.commands = [];
	}

	public async execute(): Promise<any> {
		console.clear();
		await console.log(`logged in to ${this.client.user?.username}`);

		const tasks: Promise<unknown>[] = [];
		for (const file of commandFiles) {
			const task = await import(file);
			const command = task.default as BotCommand
			if (command === undefined || command.data === undefined) return console.error('somethimg went rworng')
			this.commands.push(command)
			tasks.push(task);
		}
		await Promise.all(tasks)

		for (const command of this.commands) {
			this.client.commands.set(command.data.name, command);
			console.log(`registered command ${command.data.name}`);
		}

		const payload = this.commands.map((cmd) => cmd.data);
		const rest = new REST().setToken(process.env.TOKEN!);
		await rest
			.put(
				Routes.applicationGuildCommands(
					this.client.user?.id!,
					process.env.GUILD_ID!
				),
				{ body: payload }
			)
			.then(() => console.log('successfully registered slash command'));
	}
}