function addCountry() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var lastRow = sheet.getLastRow();

  // List of all Kazakhstan regions
  var kazRegions = [
    'Акмолинская', 'Актюбинская', 'Алматинская', 'Атырауская',
    'Восточно-Казахстанская', 'Жамбылская', 'Западно-Казахстанская',
    'Карагандинская', 'Костанайская', 'Кызылординская', 'Мангистауская',
    'Павлодарская', 'Северо-Казахстанская', 'Туркестанская',
    'Нур-Султан', 'Шымкент', 'Абайская', 'Жетысуская',
    'Улытауская', 'Астана', 'Алматы'
  ];

  // Find first empty row in column I (column 9)
  var startRow = 2;
  var colI = sheet.getRange(2, 9, lastRow - 1, 1).getValues();
  for (var k = 0; k < colI.length; k++) {
    if (colI[k][0] === '') {
      startRow = k + 2;
      break;
    }
  }

  // Batch read all region values
  var regions = sheet.getRange(startRow, 1, lastRow - startRow + 1, 1).getValues();
  var results = [];

  for (var i = 0; i < regions.length; i++) {
    var region = regions[i][0];
    var country = 'Россия';
    for (var j = 0; j < kazRegions.length; j++) {
      if (region.indexOf(kazRegions[j]) !== -1) {
        country = 'Казахстан';
        break;
      }
    }
    results.push([country]);
  }

  // Batch write all results at once
  sheet.getRange(startRow, 9, results.length, 1).setValues(results);
}
