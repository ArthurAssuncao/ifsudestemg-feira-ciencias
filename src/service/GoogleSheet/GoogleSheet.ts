import axios from "axios"; // Import Axios
import PapaParse from "papaparse";
import { Dispatch, SetStateAction } from "react";

/*export interface GoogleSheetDataNumerical {
  "Cumprimento da proposta e organização da equipe - insira uma nota de 0 a 2": string;
  "Domínio do tema - insira uma nota de 0 a 2": string;
  "Exposição oral e integração da equipe - insira uma nota de 0 a 2": string;
  "Inovação e criatividade - insira uma nota de 0 a 2": string;
  "Uso dos recursos empregados e qualidade do material - insira uma nota de 0 a 2": string;
}*/

export interface GoogleSheetDataNumerical {
  "Cumprimento da proposta e organização da equipe": string;
  "Domínio do tema": string;
  "Exposição oral e integração da equipe": string;
  "Inovação e criatividade": string;
  "Uso dos recursos empregados e qualidade do material": string;
}

export interface GoogleSheetData extends GoogleSheetDataNumerical {
  // "Carimbo de data/hora"?: string;
  "Título do trabalho": string;
  // "Nome de usuário"?: string;
  // "Nome do avaliador(a)"?: string;
  // "Número da Equipe - inserir número presente na mesa da equipe"?: string;
  // "Observações adicionais (ausência de aluno, observação sobre apresentação etc.)?"?: string;
  // "Pontuação total"?: string;
  [key: string]: string;
}

function parseCSVinJson(csvData: PapaParse.ParseResult<unknown>) {
  const data = csvData.data as string[][];
  const keys = data[0];
  const newData: GoogleSheetData[] = [];

  data.slice(1).forEach((item) => {
    const newItem: GoogleSheetData = {
      "Título do trabalho": "",
      "Cumprimento da proposta e organização da equipe": "0",
      "Domínio do tema": "0",
      "Exposição oral e integração da equipe": "0",
      "Inovação e criatividade": "0",
      "Uso dos recursos empregados e qualidade do material": "0",
    };
    const keysLength = keys.length;

    for (let i = 0; i < keysLength; i++) {
      const key = (keys as string[])[i];
      newItem[key] = item[i];
    }
    newData.push(newItem);
  });
  return newData;
}

const GoogleSheet = {
  fetchCSVData: (setCsvData: Dispatch<SetStateAction<GoogleSheetData[]>>) => {
    /*const csvUrl =
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vTHX-RmHukxE1Y-OyGbrf-TFO7TvVKd9hNt8l3S1HXxAAnaC_cBjCVVNl-X1eP_CiQ5bngVlnciwrlY/pub?output=csv";*/
    const csvUrl =
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vSWhwhV_WuD_CQ9hL2l77NXO7zR_W8QdwfK4ibms352iFfE5GyjnZUsoRfbHItFCFBfgfwHv_HmlJRs/pub?gid=1128947235&single=true&output=csv";

    axios
      .get(csvUrl) // Use Axios to fetch the CSV data
      .then((response) => {
        const options = {}; // dummy options
        const parsedCsvData = PapaParse.parse(response.data, options);
        const parsedCsvInJson = parseCSVinJson(parsedCsvData);
        // Parse the CSV data into an array of objects
        setCsvData(parsedCsvInJson); // Set the fetched data in the component's state
        // console.log(parsedCsvInJson); // Now you can work with 'csvData' in your component's state.
      })
      .catch((error) => {
        console.error("Error fetching CSV data:", error);
      });
  }, // Fetch the CSV data when the component mounts
};

export { GoogleSheet };
