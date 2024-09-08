function DAFTAR(searchQuery) {
  try {
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId); //sheet BOT JANGAN DI EDIT
    const sheet = spreadsheet.getSheetByName(dataList); //nama sheet
    const lastRow = sheet.getLastRow();

    // Mengambil data dari kolom A sampai E
    const data = sheet.getRange(2, 1, lastRow - 1, 3).getValues(); // Mengambil data dari baris 2 sampai terakhir dan dari kolom A sampai E

    const formattedData = data.reduce((filteredData, row) => {
      if (searchQuery.split(' ').every(keyword => {
        return row.some(cell => cell.toString().toLowerCase().includes(keyword.trim().toLowerCase()));
      })) {
        const lastColumnValue = "" + row[2].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        const formattedRow = row.map(cell => cell.toString()); // Konversi semua sel ke string
        formattedRow[2] = lastColumnValue; // Format nilai kolom E
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



