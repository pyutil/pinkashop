function getSheet(sheetName) {
  let spreadsheetId = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');  // you need set this in project Settings, Script properties
  let spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  return spreadsheet.getSheetByName(sheetName);
}

function doGet() {
  let htmlOutput = HtmlService.createHtmlOutputFromFile('form').setTitle('Nová objednávka');
  return htmlOutput;
}

function getSortiment() {
  let sortiment = getSheet('Sortiment');
  return sortiment.getRange('A2:J20').getValues();
}

// Function to handle form submission
function addRow(data) {
  let objednavky = getSheet('Objednavky');
  let konstanty = getSheet('Konstanty');
  let bankAccount = konstanty.getRange('B3').getValue();

  let now = new Date().toLocaleString('cs-CZ');
  let paymentCode = getPaymentCode(objednavky);

  let values = [now.substring(0, now.lastIndexOf(':')), "", "", paymentCode, data.objednavka, data.castka, "", data.jmeno, data.prijmeni, data.zasilkovna, data.email, data.telefon];

  // Append new row to the sheet
  objednavky.appendRow(values);
  return {
    bankAccount: bankAccount,
    paymentCode: paymentCode,
    totalPrice: data.castka,
    postFee: data.postFee
  };  // in client script we can capture this with .withSuccessHandler(clientFuncCallBack)
}

// Get VS (Payment Code)
function getPaymentCode(objednavky) {
    let lastRow = objednavky.getLastRow();
    let lastCode = objednavky.getRange('D' + lastRow).getValue(); // the incremental number is in column D
    let intLastCode = parseInt(lastCode);  // for 1st adding we receive NaN (regardless if for null, undefined or string), which leads to usage of initial value
    if (intLastCode) {
      paymentCode = intLastCode + 1;
    } else {
      paymentCode = 100;  // initial value
    }
    return paymentCode;
}

// how to temporary store a value between 2 serverside functions?
//  let propertiesStore = PropertiesService.getUserProperties();  // both functions
//  propertiesStore.setProperty('paymentCode', 127);  // 1st function
//  propertiesStore.getProperty('paymentCode');       // 2nd function
