/**
 * Patatoïde V2 — Code.js
 * SDIS 66 — Dimensionnement ISP par secteur
 */
const SPREADSHEET_ID = "1qQLn77TD0hrFADlN18XnvrX8rtEOmN52bl0PTHoqCAM";

function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Patatoïde V2 — Dimensionnement ISP SDIS 66')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getData() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  
  // Lire onglet "cis"
  const shCis = ss.getSheetByName("cis");
  const cisDat = shCis.getDataRange().getValues();
  const cisList = [];
  for (let i = 1; i < cisDat.length; i++) {
    const nom = String(cisDat[i][0] || "").trim();
    const ville = String(cisDat[i][1] || "").trim();
    if (nom) cisList.push({ nom, ville });
  }
  
  // Lire onglet "listing isp"
  const shIsp = ss.getSheetByName("listing isp");
  const ispDat = shIsp.getDataRange().getValues();
  const ispList = [];
  for (let i = 1; i < ispDat.length; i++) {
    const nom = String(ispDat[i][0] || "").trim();
    const centrePrincipal = String(ispDat[i][1] || "").trim();
    const centreSecondaire = String(ispDat[i][2] || "").trim();
    if (nom) ispList.push({ nom, centrePrincipal, centreSecondaire });
  }
  
  return { cis: cisList, isp: ispList };
}
