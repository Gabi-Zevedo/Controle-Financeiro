import { Categoria } from "./categoria";
import { Month } from "./Month";

export class Ganho {
  ganhoId: number;
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
