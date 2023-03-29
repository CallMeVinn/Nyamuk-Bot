const { CommandInteraction, Message } = require('discord.js');

class ParamInterface {
    constructor(context, args) {
        this.context = context;
        this.isInteraction = context instanceof CommandInteraction;
        this.interaction = this.isInteraction ? context : null;
        this.message = this.isInteraction ? null : context;
        this.id = context.id;
        this.channelId = context.channelId ?? context.channel.id;
        this.guildId = context.guildId ?? context.guild.id;
        this.client = context.client;
        this.author = context instanceof Message ? context.author : context.user;
        this.channel = context.channel;
        this.guild = context.guild;
        this.createdAt = context.createdAt;
        this.createdTimestamp = context.createdTimestamp;
        this.member = context.member;
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
            this.msg = this.interaction.channel.send(payload);
            return this.msg;
        } else {
            this.msg = this.message.channel.send(payload);
            return this.msg;
        }
    }
    async reply(payload) {
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

module.exports = ParamInterface;