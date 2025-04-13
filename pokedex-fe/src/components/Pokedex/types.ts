export type FilterParams = {
  type?: string;
  sort?: "asc" | "desc";
  search?: string;
};
export type Pokemon = {
  number: number;
  name: string;
  type_one: string;
  type_two?: string;
  total: number;
  hit_points: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
  generation: number;
  legendary: boolean;
  captured?: boolean;
  image_path: string;
};
