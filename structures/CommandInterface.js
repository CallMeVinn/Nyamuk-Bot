const { CommandInteraction, Message } = require('discord.js');

class CommandInterface {
    constructor(ci, args) {
        this.ci = ci;
        this.isInteraction = ci instanceof CommandInteraction;
        this.interaction = this.isInteraction ? ci : null;
        this.message = this.isInteraction ? null : ci;
        this.id = ci.id;
        this.channelId = ci.channelId ?? ci.channel.id;
        this.guildId = ci.guildId ?? ci.guild.id;
        this.client = ci.client;
        this.author = ci instanceof Message ? ci.author : ci.user;
        this.channel = ci.channel;
        this.guild = ci.guild;
        this.createdAt = ci.createdAt;
        this.createdTimestamp = ci.createdTimestamp;
        this.member = ci.member;
        this.setArgs(args);
    }
    setArgs(args) {
        if (this.isInteraction) {
            this.args = args.map(x => x.value);
        }
        else {
            this.args = args;
        }
    }
    async send(payload) {
        if (this.isInteraction) {
            this.msg = this.interaction.reply(payload);
            return this.msg;
        } else {
            this.msg = this.message.reply(payload);
            return this.msg;
        }
    }
    async edit(payload) {
        if (this.isInteraction) {
            if (this.msg) this.msg = await this.interaction.editReply(payload);
            return this.msg;
        } else {
            if (this.msg) this.msg = await this.msg.edit(payload);
            return this.msg;
        }
    }
    async sendDefer(payload) {
        if (this.isInteraction) {
            this.msg = await this.interaction.deferReply({ fetchReply: true });
            return this.msg;
        } else {
            this.msg = this.message.reply(payload);
            return this.msg;
        }
    }
    async sendFollowUp(payload) {
        if (this.isInteraction) {
            await this.interaction.followUp(payload);
        } else {
            if (this.msg) this.msg = await this.msg.reply(payload);
            else this.msg = this.message.reply(payload);
        }
    };
    get deferred() {
        if (this.isInteraction) {
            return this.interaction.deferred;
        };

        if (this.msg) return true;

        return false;
    };
};

module.exports = CommandInterface;