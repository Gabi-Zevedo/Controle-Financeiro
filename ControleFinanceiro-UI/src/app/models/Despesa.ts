import { Month } from './Month';

import { Cartao } from './Cartao';
import { Categoria } from './categoria';
export class Despesa {
  despesaId: number;
  cartaoId: number;
  cartao: Cartao;
  descricao: string;
  categoriaId: number;
  categoria: Categoria;
  valor: number;
  day: number;
  monthId: number;
  month: Month;
  year: number;
  userId: string;
}
