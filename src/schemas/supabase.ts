export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      barber: {
        Row: {
          accept_schedules_automatically: boolean | null;
          id: string;
          id_external_user: string | null;
          name: string | null;
        };
        Insert: {
          accept_schedules_automatically?: boolean | null;
          id?: string;
          id_external_user?: string | null;
          name?: string | null;
        };
        Update: {
          accept_schedules_automatically?: boolean | null;
          id?: string;
          id_external_user?: string | null;
          name?: string | null;
        };
        Relationships: [];
      };
      barber_has_service_type: {
        Row: {
          duration_minutes: number | null;
          id_barber: string | null;
          id_service_type: string | null;
          price: number | null;
        };
        Insert: {
          duration_minutes?: number | null;
          id_barber?: string | null;
          id_service_type?: string | null;
          price?: number | null;
        };
        Update: {
          duration_minutes?: number | null;
          id_barber?: string | null;
          id_service_type?: string | null;
          price?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'barber_has_service_type_id_barber_fkey';
            columns: ['id_barber'];
            isOneToOne: false;
            referencedRelation: 'barber';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'barber_has_service_type_id_service_type_fkey';
            columns: ['id_service_type'];
            isOneToOne: false;
            referencedRelation: 'service_type';
            referencedColumns: ['id'];
          },
        ];
      };
      barbershop: {
        Row: {
          description: string | null;
          document: string | null;
          id: string;
          id_owner: string | null;
          latitude: string | null;
          location: string | null;
          longitude: string | null;
          name: string | null;
          picture: string | null;
        };
        Insert: {
          description?: string | null;
          document?: string | null;
          id?: string;
          id_owner?: string | null;
          latitude?: string | null;
          location?: string | null;
          longitude?: string | null;
          name?: string | null;
          picture?: string | null;
        };
        Update: {
          description?: string | null;
          document?: string | null;
          id?: string;
          id_owner?: string | null;
          latitude?: string | null;
          location?: string | null;
          longitude?: string | null;
          name?: string | null;
          picture?: string | null;
        };
        Relationships: [];
      };
      custom_day_of_work: {
        Row: {
          away: boolean | null;
          end_time: string | null;
          id: string;
          id_barber: string | null;
          start_time: string | null;
        };
        Insert: {
          away?: boolean | null;
          end_time?: string | null;
          id?: string;
          id_barber?: string | null;
          start_time?: string | null;
        };
        Update: {
          away?: boolean | null;
          end_time?: string | null;
          id?: string;
          id_barber?: string | null;
          start_time?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'custom_day_of_work_id_barber_fkey';
            columns: ['id_barber'];
            isOneToOne: false;
            referencedRelation: 'barber';
            referencedColumns: ['id'];
          },
        ];
      };
      previous_service: {
        Row: {
          description: string | null;
          id: string;
          id_barber: string | null;
          id_service_type: string | null;
          picture: string | null;
        };
        Insert: {
          description?: string | null;
          id?: string;
          id_barber?: string | null;
          id_service_type?: string | null;
          picture?: string | null;
        };
        Update: {
          description?: string | null;
          id?: string;
          id_barber?: string | null;
          id_service_type?: string | null;
          picture?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'previous_service_id_barber_fkey';
            columns: ['id_barber'];
            isOneToOne: false;
            referencedRelation: 'barber';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'previous_service_id_service_type_fkey';
            columns: ['id_service_type'];
            isOneToOne: false;
            referencedRelation: 'service_type';
            referencedColumns: ['id'];
          },
        ];
      };
      schedule: {
        Row: {
          additional_information: string | null;
          allow_notifications: boolean | null;
          end_time: string | null;
          id: string;
          id_barber: string | null;
          id_service_type: string | null;
          start_time: string | null;
          status: string | null;
          user_name: string | null;
          user_phone: string | null;
        };
        Insert: {
          additional_information?: string | null;
          allow_notifications?: boolean | null;
          end_time?: string | null;
          id?: string;
          id_barber?: string | null;
          id_service_type?: string | null;
          start_time?: string | null;
          status?: string | null;
          user_name?: string | null;
          user_phone?: string | null;
        };
        Update: {
          additional_information?: string | null;
          allow_notifications?: boolean | null;
          end_time?: string | null;
          id?: string;
          id_barber?: string | null;
          id_service_type?: string | null;
          start_time?: string | null;
          status?: string | null;
          user_name?: string | null;
          user_phone?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'schedule_id_barber_fkey';
            columns: ['id_barber'];
            isOneToOne: false;
            referencedRelation: 'barber';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'schedule_id_service_type_fkey';
            columns: ['id_service_type'];
            isOneToOne: false;
            referencedRelation: 'service_type';
            referencedColumns: ['id'];
          },
        ];
      };
      service_type: {
        Row: {
          id: string;
          name: string | null;
        };
        Insert: {
          id?: string;
          name?: string | null;
        };
        Update: {
          id?: string;
          name?: string | null;
        };
        Relationships: [];
      };
      work_day: {
        Row: {
          end_time: string | null;
          id_barber: string | null;
          start_time: string | null;
          week_day: Database['public']['Enums']['week_day_enum'] | null;
        };
        Insert: {
          end_time?: string | null;
          id_barber?: string | null;
          start_time?: string | null;
          week_day?: Database['public']['Enums']['week_day_enum'] | null;
        };
        Update: {
          end_time?: string | null;
          id_barber?: string | null;
          start_time?: string | null;
          week_day?: Database['public']['Enums']['week_day_enum'] | null;
        };
        Relationships: [
          {
            foreignKeyName: 'work_day_id_barber_fkey';
            columns: ['id_barber'];
            isOneToOne: false;
            referencedRelation: 'barber';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      week_day_enum:
        | 'MONDAY'
        | 'TUESDAY'
        | 'WEDNESDAY'
        | 'THURSDAY'
        | 'FRIDAY'
        | 'SATURDAY'
        | 'SUNDAY';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;
