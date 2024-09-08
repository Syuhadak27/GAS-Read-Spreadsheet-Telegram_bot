function handleStart(chatId, messageId) {
  const messageReply = 'Selamat Datang !!!!! Status Bot aktif, sekarang bisa anda gunakan,\nGunakan command /help untuk cara menggunakannya';
  const response = sendTelegramMessage(chatId, messageId, messageReply);
  const messageReplyID = response.result.message_id;
  Utilities.sleep(4000); // Tunggu 4 detik sebelum menghapus pesan
  deleteMessage(chatId, messageReplyID);
}

function handleHelp(chatId, messageId) {
  const messageReply = 'Males njelasinnya, langsung pakek aja';
  const response = sendTelegramMessage(chatId, messageId, messageReply);
  const messageReplyID = response.result.message_id;
  Utilities.sleep(4000); // Tunggu 4 detik sebelum menghapus pesan
  deleteMessage(chatId, messageReplyID)
  deleteMessage(chatId, messageId);
}

function handleStok(chatId, messageId, text) {
  const hasil_stok_text = text.trim();
  if (!hasil_stok_text) {
    const messageReply = 'Format salah, gunakan format /stok [nama barang] atau .stok [nama barang]';
    const response = sendTelegramMessage(chatId, messageId, messageReply);
    const messageReplyID = response.result.message_id;
    Utilities.sleep(4000); // Tunggu 4 detik sebelum menghapus pesan
    deleteMessage(chatId, messageReplyID)
    deleteMessage(chatId, messageId);
  } else {
    const hasil_stok = CARI_STOK(hasil_stok_text);
    const messageReply = hasil_stok.length > 0 ? hasil_stok.join('\n') : 'Tidak ada barang yang ditemukan.';
    const response = sendTelegramMessage(chatId, messageId, messageReply);
    const messageReplyID = response.result.message_id;
    Utilities.sleep(4000); // Tunggu 4 detik sebelum menghapus pesan
    //deleteMessage(chatId, messageReplyID)
    deleteMessage(chatId, messageId);
  }
}

function handleList(chatId, messageId, text) {
  const hasil_list_text = text.trim();
  if (!hasil_list_text) {
    const messageReply = 'Format salah, gunakan format /list [nama barang] atau .list [nama barang]';
    const response = sendTelegramMessage(chatId, messageId, messageReply);
    const messageReplyID = response.result.message_id;
    Utilities.sleep(4000); // Tunggu 4 detik sebelum menghapus pesan
    deleteMessage(chatId, messageReplyID)
    deleteMessage(chatId, messageId);
  } else {
    const hasil_list = DAFTAR(hasil_list_text);
    const messageReply = hasil_list.length > 0 ? hasil_list.join('\n') : 'Tidak ada barang yang ditemukan.';
    const response = sendTelegramMessage(chatId, messageId, messageReply);
    const messageReplyID = response.result.message_id;
    Utilities.sleep(4000); // Tunggu 4 detik sebelum menghapus pesan
    //deleteMessage(chatId, messageReplyID)
    deleteMessage(chatId, messageId);
  }
}

function handleInOut_TEST_WORK(chatId, messageId, text) {
  const keyword = text.trim();
  if (!keyword) {
    const messageReply = 'Format salah, gunakan format /inout [nama barang] atau .inout [nama barang]';
    const response = sendTelegramMessage(chatId, messageId, messageReply);

    if (response && response.result) {
      const messageReplyID = response.result.message_id;
      Utilities.sleep(4000); // Tunggu 4 detik sebelum menghapus pesan
      deleteMessage(chatId, messageReplyID);
    }

    deleteMessage(chatId, messageId);
  } else {
    const hasil = CARI_inout(keyword);
    const messageReply = hasil.length > 0 ? hasil.join('\n') : 'Tidak ada barang yang ditemukan.';
    const response = sendTelegramMessage(chatId, messageId, messageReply);

    if (response && response.result) {
      const messageReplyID = response.result.message_id;
      Utilities.sleep(4000); // Tunggu 4 detik sebelum menghapus pesan
      //deleteMessage(chatId, messageReplyID);
    }

    deleteMessage(chatId, messageId);
  }
}



function handleDefault_work(chatId, messageId, text) {
  const result = CARI(text.trim());
  const messageReply = result.length > 0 ? result.join('\n') : 'Tidak ada hasil yang ditemukan.';
  sendTelegramMessage(chatId, messageId, messageReply);

  // Menghapus pesan pengguna setelah beberapa detik
  Utilities.sleep(4000); // Tunggu 4 detik sebelum menghapus pesan pengguna
  deleteMessage(chatId, messageId); // Menghapus pesan pengguna
}

function handleDefault(chatId, messageId, text) {
  const searchQuery = text.trim();
  const result = CARI(searchQuery);
  const messageReply = result.length > 0 
    ? `CPU : 🟠🟡🟢🔵🟣 Kata Kunci : <code>${searchQuery}</code>\n\n${result.join('\n')}` 
    : 'Tidak ada hasil yang ditemukan.';
  
  // Mengirim pesan balasan dan mendapatkan respons
  const response = JSON.parse(sendTelegramMessage(chatId, messageId, messageReply));
  const messageReplyID = response.result.message_id;
  
  // Hapus pesan pengguna setelah bot merespons
  deleteMessage(chatId, messageId);
  
  if (result.length === 0) {
    Utilities.sleep(1000); // Tunggu 4 detik sebelum menghapus pesan
    deleteMessage(chatId, messageReplyID);
  }

}


function handleInOut(chatId, messageId, text) {
  const searchQuery = text.trim();

  if (searchQuery === '') {
    const noKeywordMessage = 'Tidak bisa tanpa kata kunci.';
    const response = JSON.parse(sendTelegramMessage(chatId, messageId, noKeywordMessage));
    const messageReplyID = response.result.message_id;

    // Hapus pesan pengguna setelah bot merespons
    deleteMessage(chatId, messageId);

    // Tunggu 4 detik sebelum menghapus pesan balasan
    Utilities.sleep(4000);
    deleteMessage(chatId, messageReplyID);
    return;
  }

  const result = CARI_inout(searchQuery);
  const messageReply = result.length > 0 
    ? `CPU : 🟠🟡🟢🔵🟣 Kata Kunci : <code>${searchQuery}</code>\n\n${result.join('\n')}` 
    : 'Tidak ada hasil yang ditemukan.';

  // Mengirim pesan balasan dan mendapatkan respons
  const response = JSON.parse(sendTelegramMessage(chatId, messageId, messageReply));
  const messageReplyID = response.result.message_id;
  
  // Hapus pesan pengguna setelah bot merespons
  deleteMessage(chatId, messageId);

  if (result.length === 0) {
    Utilities.sleep(4000); // Tunggu 4 detik sebelum menghapus pesan balasan
    deleteMessage(chatId, messageReplyID);
  }
}





