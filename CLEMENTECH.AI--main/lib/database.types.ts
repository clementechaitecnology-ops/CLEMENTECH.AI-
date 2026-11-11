type Tabla<Row, Insert, Update = Partial<Insert>> = {
  Row: Row;
  Insert: Insert;
  Update: Update;
  Relationships: [];
};

type Pedido = {
  id: string;
  cliente_nombre: string;
  producto_nombre: string;
  transportadora: string;
  estado: string;
  cantidad: number;
  precio_unitario: number;
  total: number;
  created_at: string;
};

type Tarea = {
  id: string;
  titulo: string;
  descripcion: string | null;
  fecha_hora: string | null;
  prioridad: string;
  con_alarma: boolean;
  estado: string;
  created_at: string;
};

export type Database = {
  public: {
    Tables: {
      automatizaciones: Tabla<
        { id: string; titulo: string; descripcion: string; canal: string; activa: boolean },
        { id?: string; titulo?: string; descripcion?: string; canal?: string; activa?: boolean }
      >;
      conexiones: Tabla<
        { id: string; nombre: string; estado: string },
        { id?: string; nombre?: string; estado?: string }
      >;
      devoluciones: Tabla<
        { id: string; pedido_codigo: string; cliente_nombre: string; motivo: string; estado: string; created_at: string },
        { id?: string; pedido_codigo: string; cliente_nombre: string; motivo: string; estado?: string; created_at?: string }
      >;
      frases: Tabla<
        { id: string; texto: string; autor: string },
        { id?: string; texto: string; autor: string }
      >;
      libros_guardados: Tabla<
        { id: string; titulo: string; autor: string; portada_url: string | null; open_library_key: string; estado: string; created_at: string },
        { id?: string; titulo: string; autor: string; portada_url?: string | null; open_library_key: string; estado?: string; created_at?: string }
      >;
      pedidos: Tabla<
        Pedido,
        { id?: string; cliente_nombre: string; producto_nombre: string; transportadora?: string; estado?: string; cantidad?: number; precio_unitario?: number; total?: number; created_at?: string },
        Partial<Pedido>
      >;
      racha: Tabla<
        { id: string; fecha: string; tareas_completadas: number },
        { id?: string; fecha: string; tareas_completadas?: number }
      >;
      tareas: Tabla<
        Tarea,
        { id?: string; titulo: string; descripcion?: string | null; fecha_hora?: string | null; prioridad?: string; con_alarma?: boolean; estado?: string; created_at?: string },
        Partial<Tarea>
      >;
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
