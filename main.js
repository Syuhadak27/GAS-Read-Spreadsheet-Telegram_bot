function doPost(e) {
  try {
    const contents = JSON.parse(e.postData.contents);
    const receivedTextMessage = contents.message.text.trim();
    const chatId = contents.message.chat.id;
    const messageId = contents.message.message_id;

    if (receivedTextMessage === '/start') {
      handleStart(chatId, messageId);
    } else if (receivedTextMessage === '/help') {
      handleHelp(chatId, messageId);
    } else if (receivedTextMessage === '/reset') {
      handleResetCache(chatId, messageId);
    } else if (receivedTextMessage.startsWith('/stok') || receivedTextMessage.startsWith('.stok')) {
      handleStok(chatId, messageId, receivedTextMessage.replace('/stok', '').replace('.stok', ''));
    } else if (receivedTextMessage.startsWith('/list') || receivedTextMessage.startsWith('.list')) {
      handleList(chatId, messageId, receivedTextMessage.replace('/list', '').replace('.list', ''));
    } else if (receivedTextMessage.startsWith('/inout') || receivedTextMessage.startsWith('.')) {
      handleInOut(chatId, messageId, receivedTextMessage.replace('/inout', '').replace('.', ''));
    } else {
      handleDefault(chatId, messageId, receivedTextMessage);
    }

  } catch (err) {
    log(err);
  }
}


function setWebhook() {
  const url = `${telegramApiUrl}/setwebhook?url=${appsScriptUrl}`;
  const response = UrlFetchApp.fetch(url).getContentText();
  Logger.log(response);
}





