
function deleteMessage(chatId, messageId) {
  const url = `${telegramApiUrl}/deleteMessage`;
  const data = {
    chat_id: chatId,
    message_id: messageId,
  };

  const options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(data),
  };

  UrlFetchApp.fetch(url, options);
}