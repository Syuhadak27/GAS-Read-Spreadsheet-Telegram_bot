
function CARI_inout(searchQuery) {
  try {
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    const sheet = spreadsheet.getSheetByName(dataInout);
    const lastRow = sheet.getLastRow();
    const data = sheet.getRange(2, 1, lastRow - 1, 6).getValues();

    const filteredData = data.filter(row => {
      return searchQuery.split(' ').every(keyword => {
        return row.some((cell, index) => {
          return cell.toString().toLowerCase().includes(keyword.trim().toLowerCase());
        });
      });
    });

    const formattedData = filteredData.map(row => {
      const dateValue = new Date(row[0]); // Kolom pertama adalah tanggal
      const formattedDate = Utilities.formatDate(dateValue, Session.getScriptTimeZone(), 'dd-MM-yyyy');
      row[0] = formattedDate; // Mengganti nilai tanggal dengan format yang diinginkan
      return row.join(' • ');
    });

    return formattedData.map(chat => `➡️${chat}`);

  } catch (err) {
    log(err);
    return []; // Mengembalikan array kosong jika terjadi kesalahan
  }
}
