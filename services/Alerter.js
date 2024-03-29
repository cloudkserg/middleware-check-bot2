/** 
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 * @author Kirill Sergeev <cloudkserg11@gmail.com>
*/
const { WebClient } = require('@slack/client'),
  bunyan = require('bunyan'),
  log = bunyan.createLogger({name: 'checkbot.alerter'}),
class Alerter {

  constructor(token, conversation, symbol) {
    this.token = token;
    this.conversation = conversation;
    this.symbol = symbol;
  }

  async init() {
    this.web = new WebClient(token);
  }

  async sendMessage(message) {
    await this.web.chat.postMessage({ channel: this.conversation, 
      text: `CHECKBOT ${this.symbol} CHECKING:` + message
    });
  }

  async info(message) {
    log.info(message);
    await sendMessage('SUCCESS! ' + message);
  }

  async expect(res, compareRes, message) {
    if (res === compareRes) {
      await sendMessage(message);
    }
    log.error(message);
    await this.sendMessage('FAILURE! ' + message);
  }

  async error(message) {
    log.error(message);
    await this.sendMessage('FAILURE! ' + message);
  }
}

module.exports = Alerter;