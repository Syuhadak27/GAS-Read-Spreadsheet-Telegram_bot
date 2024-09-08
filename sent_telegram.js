const maxLengthWithMargin = 4000; // Batas karakter maksimum dengan margin kecil


function sendTelegramMessage(chatId, replyToMessageId, textMessage) {
  const url = `${telegramApiUrl}/sendMessage`;

  if (textMessage.length <= maxLengthWithMargin) {
    const data = {
      parse_mode: 'HTML',
      chat_id: chatId,
      reply_to_message_id: replyToMessageId,
      text: textMessage,
      disable_web_page_preview: true,
    };

    const options = {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(data),
    };

    try {
      const response = UrlFetchApp.fetch(url, options).getContentText();
      return response;
    } catch (error) {
      console.error('Error sending message:', error);
      return JSON.stringify({ result: { message_id: null } }); // Return a default JSON object
    }
  } else {
    const parts = [];
    for (let i = 0; i < textMessage.length; i += maxLengthWithMargin) {
      parts.push(textMessage.substring(i, i + maxLengthWithMargin));
    }

    parts.forEach((part, index) => {
      const data = {
        parse_mode: 'HTML',
        chat_id: chatId,
        reply_to_message_id: replyToMessageId,
        text: index === 0 ? part : `<b>[Lanjutan]</b> ${part}`,
        disable_web_page_preview: true,
      };

      const options = {
        method: 'post',
        contentType: 'application/json',
        payload: JSON.stringify(data),
      };

      try {
        UrlFetchApp.fetch(url, options);
      } catch (error) {
        console.error('Error sending message part:', error);
      }
    });
    return JSON.stringify({ result: { message_id: null } }); // Return a default JSON object for multi-part messages
  }
}

