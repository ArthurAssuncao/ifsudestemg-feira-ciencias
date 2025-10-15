import { GoogleSheet } from "@/service/GoogleSheet";
import { ANO_EVENTO, DIA_EVENTO, MES_EVENTO } from "@/service/GoogleSheet/data";
import { GoogleSheetData } from "@/service/GoogleSheet/GoogleSheet";
import { differenceInDays, format } from "date-fns";
import { CSSProperties, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import styles from "./FeiraCienciasResultado.module.css";
import GeradorResultadoFeiraCiencias, {
  ResultadoTrabalho,
} from "./GeradorResultadoFeiraCiencias";

const override: CSSProperties = {};

const TEMPO_REEXEC_MIN = 3 * 60 * 1000; // 5 minutos em ms
const NUMERO_COMPONENTES_NOTA = 5;

const FeiraCienciasResultado = () => {
  const [loading, setLoading] = useState(true);
  const [csvDataMerged, setCsvDataMerged] = useState<GoogleSheetData[]>([]);
  const [csvDataFormGoogle, setCsvDataFormGoogle] = useState<GoogleSheetData[]>(
    []
  );
  const [csvDataFormExterno, setCsvDataFormExterno] = useState<
    GoogleSheetData[]
  >([]);
  const [updateTime, setUpdateTime] = useState(0);
  const [resultadoPorTrabalho, setResultadoPorTrabalho] = useState<
    ResultadoTrabalho[]
  >([]);
  const timeReexecMin = TEMPO_REEXEC_MIN; // 5 minutos em ms
  const [hidePublic, setHidePublic] = useState(false);
  const eventDate = new Date(ANO_EVENTO, MES_EVENTO, DIA_EVENTO);
  const today = new Date();
  const daysFromEvent = differenceInDays(eventDate, today);
  const numDaysToHide = 3; //Esconde após o evento
  console.log("Faltam ", daysFromEvent, " dias para o evento");

  useEffect(() => {
    if (daysFromEvent < -numDaysToHide) {
      setHidePublic(true);
    }
    const fetchCSVFormGoogle = async () => {
      console.log("CSV obtendo...");
      setLoading(true);
      GoogleSheet.fetchCSVDataFormGoogle(setCsvDataFormGoogle);
      console.log("CSV form google obtido");
      setUpdateTime(timeReexecMin / 1000); // Inicia em segundos
    };
    const fetchCSVFormExterno = async () => {
      console.log("CSV obtendo...");
      setLoading(true);
      GoogleSheet.fetchCSVDataFormExterno(setCsvDataFormExterno);
      console.log("CSV for externo obtido");
      setUpdateTime(timeReexecMin / 1000); // Inicia em segundos
    };

    fetchCSVFormGoogle();

    fetchCSVFormExterno();

    if (!hidePublic) {
      const intervalID = setInterval(() => {
        console.log("Intervalo de atualização de dados ativo");
        fetchCSVFormGoogle();
        fetchCSVFormExterno();
      }, timeReexecMin);

      // Limpeza do intervalo
      return () => clearInterval(intervalID);
    }
  }, [daysFromEvent, hidePublic, timeReexecMin]);

  useEffect(() => {
    const generateResults = () => {
      console.log("Dados sendo atualizados...");
      let resultados =
        GeradorResultadoFeiraCiencias.calcularResultados(csvDataMerged);
      if (hidePublic) {
        resultados = resultados.sort((a, b) => {
          if (a.titulo < b.titulo) {
            return -1;
          }
          if (a.titulo > b.titulo) {
            return 1;
          }
          return 0;
        });
      }
      setResultadoPorTrabalho(resultados);
      setLoading(false);
      console.log("Dados atualizados");
    };

    generateResults();
  }, [csvDataMerged, hidePublic]);

  useEffect(() => {
    const mergeData = () => {
      console.log("Unindo dados dos CSVs ...");

      const csvDataMerged = csvDataFormGoogle.concat(csvDataFormExterno);
      setCsvDataMerged(csvDataMerged);
      console.log("Dados unidos");
    };
    mergeData();
  }, [csvDataFormGoogle, csvDataFormExterno]);

  useEffect(() => {
    const intervalID = setInterval(() => {
      setUpdateTime((prevTime) => Math.max(prevTime - 1, 0)); // Decrementa segundos
    }, 1000);

    return () => clearInterval(intervalID);
  }, []);

  if (loading) {
    return (
      <div className={styles.loading}>
        <ClipLoader
          color="#279D4B"
          loading={loading}
          cssOverride={override}
          size={300}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  const sortByMedia = (a: ResultadoTrabalho, b: ResultadoTrabalho) => {
    if (a.media < b.media) {
      return 1;
    }
    if (a.media > b.media) {
      return -1;
    }
    return 0;
  };

  return (
    <>
      <table className={styles.table}>
        <thead className={styles.tableHeader}>
          <tr className={styles.row}>
            <th className={styles.cell}>Título do Trabalho</th>
            <th className={styles.cell}>Média Final</th>
            <th className={styles.cell}>Média Final (em 10)</th>
            <th
              className={[
                styles.cell,
                hidePublic && styles.cellHidePublic,
              ].join(" ")}
            >
              Colocação
            </th>
            <th
              className={[
                styles.cell,
                hidePublic && styles.cellHidePublic,
              ].join(" ")}
            >
              Número de
              <br />
              Avaliações
            </th>
          </tr>
        </thead>
        <tbody>
          {resultadoPorTrabalho.sort(sortByMedia).map((trabalho, index) => (
            <tr key={index} className={styles.row}>
              <td className={styles.cell}>{trabalho.titulo}</td>
              <td className={styles.cell}>{trabalho.media.toFixed(2)}</td>
              <td className={styles.cell}>
                {(trabalho.media / NUMERO_COMPONENTES_NOTA).toFixed(2)}
              </td>
              <td
                className={[
                  styles.cell,
                  hidePublic && styles.cellHidePublic,
                ].join(" ")}
              >
                {trabalho.colocacao}
              </td>
              <td
                className={[
                  styles.cell,
                  hidePublic && styles.cellHidePublic,
                ].join(" ")}
              >
                {trabalho.numeroAvaliacoes}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={[styles.updateText, styles.hidePublic].join(" ")}>
        Próxima atualização em {format(updateTime * 1000, "mm:ss")}
      </div>
    </>
  );
};

export { FeiraCienciasResultado };
