import { GoogleSheetData } from "@/service/GoogleSheet/GoogleSheet";

import { titleCase } from "title-case";

interface MediaPorTrabalho {
  titulo: string;
  media: number;
  numeroAvaliacoes: number;
}

export interface ResultadoTrabalho extends MediaPorTrabalho {
  colocacao: number;
}

interface Colocacoes {
  [key: string]: number;
}

const adicionarColocacao = (
  mediasPorTrabalhoOrdenado: MediaPorTrabalho[]
): ResultadoTrabalho[] => {
  let posicaoEntreIguais = 1;
  let posicao = 1;
  let mediaAnterior = -1;
  const colocacoes: Colocacoes = {};

  mediasPorTrabalhoOrdenado.forEach((trabalho) => {
    if (mediaAnterior === -1 || mediaAnterior === trabalho.media) {
      colocacoes[trabalho.titulo] = posicaoEntreIguais;
    } else {
      posicaoEntreIguais++;
      colocacoes[trabalho.titulo] = posicaoEntreIguais;
    }
    mediaAnterior = trabalho.media;
    posicao = posicao + 1;
  });

  const resultados = mediasPorTrabalhoOrdenado.map((trabalho) => ({
    titulo: trabalho.titulo,
    media: trabalho.media,
    colocacao: colocacoes[trabalho.titulo],
    numeroAvaliacoes: trabalho.numeroAvaliacoes,
  }));

  return resultados;
};

interface SomaPorTrabalho {
  [key: string]: number;
}

interface ContagemPorTrabalho {
  [key: string]: number;
}

const GeradorResultadoFeiraCiencias = {
  calcularResultados: (dados: GoogleSheetData[]) => {
    // Usando type assertion para corrigir o erro de tipo
    const camposNotas = [
      "Cumprimento da proposta e organização da equipe",
      "Domínio do tema",
      "Exposição oral e integração da equipe",
      "Inovação e criatividade",
      "Uso dos recursos empregados e qualidade do material",
    ];
    console.log(camposNotas);

    const somaPorTrabalho: SomaPorTrabalho = {};
    const contagemPorTrabalho: ContagemPorTrabalho = {};
    const maxAvaliacoes = 2;

    dados.forEach((avaliacao) => {
      const titulo = titleCase(avaliacao["Título do trabalho"]);

      if (!somaPorTrabalho[titulo]) {
        somaPorTrabalho[titulo] = 0;
        contagemPorTrabalho[titulo] = 0;
      }

      camposNotas.forEach((campo) => {
        // console.log(avaliacao[campo]);
        let avaliacaoNota = Number(
          avaliacao[campo].replace(" ", "").replace(",", ".")
        );
        if (avaliacaoNota > 10 && avaliacaoNota < 100) {
          avaliacaoNota = avaliacaoNota % 10;
        } else if (avaliacaoNota >= 100 && avaliacaoNota <= 100) {
          avaliacaoNota = avaliacaoNota % 100;
        }

        if (contagemPorTrabalho[titulo] < maxAvaliacoes) {
          somaPorTrabalho[titulo] = somaPorTrabalho[titulo] + avaliacaoNota;
        }
      });

      if (contagemPorTrabalho[titulo] < maxAvaliacoes) {
        contagemPorTrabalho[titulo]++;
      }
    });

    const mediasPorTrabalho: MediaPorTrabalho[] = Object.entries(
      somaPorTrabalho
    ).map(([titulo, soma]) => ({
      titulo,
      media: soma / contagemPorTrabalho[titulo],
      numeroAvaliacoes: contagemPorTrabalho[titulo],
    }));

    const mediasPorTrabalhoOrdenado = [...mediasPorTrabalho].sort(
      (a, b) => b.media - a.media
    );

    const resultados = adicionarColocacao(mediasPorTrabalhoOrdenado);

    // console.log(resultados);
    return resultados;
  },
};

export default GeradorResultadoFeiraCiencias;
