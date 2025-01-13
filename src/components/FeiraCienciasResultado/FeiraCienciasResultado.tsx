import { GoogleSheet } from "@/service/GoogleSheet";
import { GoogleSheetData } from "@/service/GoogleSheet/GoogleSheet";
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
  const [resultadoPorTrabalho, setResultadoPorTrabalho] = useState<
    ResultadoTrabalho[]
  >([]);

  useEffect(() => {
    GoogleSheet.fetchCSVData(setCsvData);
  }, []);

  useEffect(() => {
    const resultados =
      GeradorResultadoFeiraCiencias.calcularResultados(csvData);

    setResultadoPorTrabalho(resultados);
    setLoading(false);
  }, [csvData]);

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
      <tbody className="">
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
  );
};

export { FeiraCienciasResultado };
