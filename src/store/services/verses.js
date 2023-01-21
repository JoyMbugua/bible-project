const VERSES = [
  `JER.29.11`,
  `PSA.23`,
  `1COR.4.4-8`,
  `PHP.4.13`,
  `JHN.3.16`,
  `ROM.8.28`,
  `ISA.41.10`,
  `PSA.46.1`,
  `GAL.5.22-23`,
  `HEB.11.1`,
  `2TI.1.7`,
  `1COR.10.13`,
  `PRO.22.6`,
  `ISA.40.31`,
  `JOS.1.9`,
  `HEB.12.2`,
  `MAT.11.28`,
  `ROM.10.9-10`,
  `PHP.2.3-4`,
  `MAT.5.43-44`,
  `LUK.10.20`,
  `PSA.55.22`,
  `EPH.2.8`,
  `LUK.6.23`,
  `ROM.8.37`,
  `NEH.8.10`,
  `PROV.16.3`,
  `2CHR.15.7`,
  `JHN.1.16`,
  `PSA.118.24`,
  `ISA.40.31`,
  `PSA.27.1`,

];

const verseIdx = new Date().getDate();
const verseOfTheDay = VERSES[verseIdx];

export default verseOfTheDay;
