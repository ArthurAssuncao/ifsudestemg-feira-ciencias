import { GoogleSheet } from "@/service/GoogleSheet";
import { GoogleSheetData } from "@/service/GoogleSheet/GoogleSheet";
import { format } from "date-fns";
import { CSSProperties, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import styles from "./FeiraCienciasResultado.module.css";
import GeradorResultadoFeiraCiencias, {
  ResultadoTrabalho,
} from "./GeradorResultadoFeiraCiencias";

const override: CSSProperties = {};

const FeiraCienciasResultado = () => {
  const [loading, setLoading] = useState(true);
  const [csvData, setCsvData] = useState<GoogleSheetData[]>([]);
  const [updateTime, setUpdateTime] = useState(0);
  const [resultadoPorTrabalho, setResultadoPorTrabalho] = useState<
    ResultadoTrabalho[]
  >([]);
  const timeReexecMin = 3 * 60 * 1000; // 5 minutos em ms

  useEffect(() => {
    const fetchCSV = async () => {
      console.log("CSV obtendo...");
      setLoading(true);
      GoogleSheet.fetchCSVData(setCsvData);
      console.log("CSV obtido");
      setUpdateTime(timeReexecMin / 1000); // Inicia em segundos
    };

    fetchCSV();

    const intervalID = setInterval(() => {
      fetchCSV();
    }, timeReexecMin);

    return () => clearInterval(intervalID); // Limpeza do intervalo
  }, [timeReexecMin]);

  useEffect(() => {
    const generateResults = () => {
      console.log("Dados sendo atualizados...");
      const resultados =
        GeradorResultadoFeiraCiencias.calcularResultados(csvData);
      setResultadoPorTrabalho(resultados);
      setLoading(false);
      console.log("Dados atualizados");
    };

    generateResults();
  }, [csvData]);

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

  return (
    <>
      <table className={styles.table}>
        <thead className={styles.tableHeader}>
          <tr className={styles.row}>
            <th className={styles.cell}>Título do Trabalho</th>
            <th className={styles.cell}>Média Final</th>
            <th className={styles.cell}>Colocação</th>
            <th className={styles.cell}>
              Número de
              <br />
              Avaliações
            </th>
          </tr>
        </thead>
        <tbody>
          {resultadoPorTrabalho.map((trabalho, index) => (
            <tr key={index} className={styles.row}>
              <td className={styles.cell}>{trabalho.titulo}</td>
              <td className={styles.cell}>{trabalho.media.toFixed(2)}</td>
              <td className={styles.cell}>{trabalho.colocacao}</td>
              <td className={styles.cell}>{trabalho.numeroAvaliacoes}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.updateText}>
        Próxima atualização em {format(updateTime * 1000, "mm:ss")}
      </div>
    </>
  );
};

export { FeiraCienciasResultado };
