const enum MESES {
  JANEIRO = 0,
  FEVEREIRO = 1,
  MARÇO = 2,
  ABRIL = 3,
  MAIO = 4,
  JUNHO = 5,
  JULHO = 6,
  AGOSTO = 7,
  SETEMBRO = 8,
  OUTUBRO = 9,
  NOVEMBRO = 10,
  DEZEMBRO = 11,
}

export const MAXIMO_DIAS_MESES: Record<MESES, number> = {
  [MESES.JANEIRO]: 31,
  [MESES.FEVEREIRO]: 28,
  [MESES.MARÇO]: 31,
  [MESES.ABRIL]: 30,
  [MESES.MAIO]: 31,
  [MESES.JUNHO]: 30,
  [MESES.JULHO]: 31,
  [MESES.AGOSTO]: 31,
  [MESES.SETEMBRO]: 30,
  [MESES.OUTUBRO]: 31,
  [MESES.NOVEMBRO]: 30,
  [MESES.DEZEMBRO]: 31,
};

export const DIA_EVENTO = 9;
export const MES_EVENTO = MESES.OUTUBRO;
export const ANO_EVENTO = 2025;

export const PLANILHA_LINK_CSV_ABA_RESULTADO_CONDENSSADO =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTsRp0gzLotgqMdydB4KcPWZhiz8iB6EKBj_8ysu8Y2iAwniBZdDZ2k1dficDvF6-b0EhsTiCSH1WND/pub?gid=241112934&single=true&output=csv";
export const PLANILHA_LINK_CSV_ABA_RESULTADO_CONDENSSADO_FORM_EXTERNO =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTsRp0gzLotgqMdydB4KcPWZhiz8iB6EKBj_8ysu8Y2iAwniBZdDZ2k1dficDvF6-b0EhsTiCSH1WND/pub?gid=185502596&single=true&output=csv";
