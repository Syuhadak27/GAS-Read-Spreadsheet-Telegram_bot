
function CARI(searchQuery) {
  try {
    let data = getDataFromCache();
    if (!data) {
      const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
      const sheet = spreadsheet.getSheetByName(dataOrderSheetName);
      const lastRow = sheet.getLastRow();

      // Mengambil data dari kolom A sampai E
      data = sheet.getRange(2, 1, lastRow - 1, 5).getValues(); // Mengambil data dari baris 2 sampai terakhir dan dari kolom A sampai E
      setDataToCache(data); // Simpan data ke cache
    }

    const formattedData = data.reduce((filteredData, row) => {
      if (searchQuery.split(' ').every(keyword => {
        return row.some(cell => cell.toString().toLowerCase().includes(keyword.trim().toLowerCase()));
      })) {
        const lastColumnValue = "" + row[4].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        const formattedRow = row.map((cell, index) => {
          if (index === 1) {
            // Tambahkan tag <code> pada kolom kedua
            return `<code>${cell.toString()}</code>`;
          }
          return cell.toString();
        });
        formattedRow[4] = lastColumnValue; // Format nilai kolom E
        filteredData.push(`➡️${formattedRow.join(' • ')}\n`);
      }
      return filteredData;
    }, []);

    return formattedData;

  } catch (err) {
    console.error(err);
    return []; // Mengembalikan array kosong jika terjadi kesalahan
  }
}



//untuk mengeirim log error
function log(logMessage = '') {
  const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  const sheet       = spreadsheet.getSheetByName(logSheetName);
  const lastRow     = sheet.getLastRow() + 1;
  const today       = new Date();

  sheet.insertRowAfter(lastRow);
  sheet.getRange(`A${lastRow}`).setValue(today);
  sheet.getRange(`B${lastRow}`).setValue(logMessage);
}
