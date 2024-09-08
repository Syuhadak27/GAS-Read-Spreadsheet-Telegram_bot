function CARI_STOK(searchQuery) {
  try {
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    const sheet = spreadsheet.getSheetByName(dataStok);
    const lastRow = sheet.getLastRow();

    // Mengambil data dari kolom B dan C
    const data = sheet.getRange(2, 2, lastRow - 1, 2).getValues(); // Mengambil data dari baris 2 sampai terakhir dan dari kolom B dan C

    const filteredData = data.filter(row => {
      return searchQuery.split(' ').every(keyword => {
        return row.some((cell, index) => {
          return cell.toString().toLowerCase().includes(keyword.trim().toLowerCase());
        });
      });
    });

    const formattedData = filteredData.map(row => {
      return row.join(' • ');
    });

    return formattedData.map(chat => `➡️${chat}`);

  } catch (err) {
    console.log(err);
    return []; // Mengembalikan array kosong jika terjadi kesalahan
  }
}
