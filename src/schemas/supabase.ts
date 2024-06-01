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
      contractor_has_service_type: {
        Row: {
          created_at: string;
          custom_calendar_color: string | null;
          duration_minutes: number;
          id_contractor: string;
          id_service_type: string;
          picture_link: string | null;
          price: number;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          custom_calendar_color?: string | null;
          duration_minutes: number;
          id_contractor: string;
          id_service_type: string;
          picture_link?: string | null;
          price: number;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          custom_calendar_color?: string | null;
          duration_minutes?: number;
          id_contractor?: string;
          id_service_type?: string;
          picture_link?: string | null;
          price?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'contractor_has_service_type_id_contractor_fkey';
            columns: ['id_contractor'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'contractor_has_service_type_id_service_type_fkey';
            columns: ['id_service_type'];
            isOneToOne: false;
            referencedRelation: 'service_type';
            referencedColumns: ['id'];
          },
        ];
      };
      custom_day_of_work: {
        Row: {
          away: boolean;
          created_at: string;
          end_time: string;
          id: string;
          id_contractor: string;
          start_time: string;
          updated_at: string;
        };
        Insert: {
          away: boolean;
          created_at?: string;
          end_time: string;
          id?: string;
          id_contractor: string;
          start_time: string;
          updated_at?: string;
        };
        Update: {
          away?: boolean;
          created_at?: string;
          end_time?: string;
          id?: string;
          id_contractor?: string;
          start_time?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'custom_day_of_work_id_contractor_fkey';
            columns: ['id_contractor'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      organization: {
        Row: {
          created_at: string;
          description: string | null;
          document: string;
          full_address: string;
          id: string;
          id_contractor_owner: string;
          latitude: string | null;
          longitude: string | null;
          name: string;
          picture: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          document: string;
          full_address: string;
          id?: string;
          id_contractor_owner: string;
          latitude?: string | null;
          longitude?: string | null;
          name: string;
          picture?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          document?: string;
          full_address?: string;
          id?: string;
          id_contractor_owner?: string;
          latitude?: string | null;
          longitude?: string | null;
          name?: string;
          picture?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'organization_id_contractor_owner_fkey';
            columns: ['id_contractor_owner'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      previous_service: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          id_contractor: string;
          id_service_type: string;
          picture_link: string[] | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: string;
          id_contractor: string;
          id_service_type: string;
          picture_link?: string[] | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          id_contractor?: string;
          id_service_type?: string;
          picture_link?: string[] | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'previous_service_id_contractor_fkey';
            columns: ['id_contractor'];
            isOneToOne: false;
            referencedRelation: 'users';
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
      profile: {
        Row: {
          avatar_url: string | null;
          created_at: string;
          full_name: string | null;
          id: string;
          social_medias: Json | null;
          updated_at: string;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          full_name?: string | null;
          id: string;
          social_medias?: Json | null;
          updated_at?: string;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string;
          full_name?: string | null;
          id?: string;
          social_medias?: Json | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'profile_id_fkey';
            columns: ['id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      schedule: {
        Row: {
          additional_information: string | null;
          allow_notifications: boolean;
          client_name: string;
          client_phone: string | null;
          created_at: string;
          end_time: string;
          id: string;
          id_contractor: string;
          id_service_type: string;
          start_time: string;
          status: string;
          updated_at: string;
        };
        Insert: {
          additional_information?: string | null;
          allow_notifications: boolean;
          client_name: string;
          client_phone?: string | null;
          created_at?: string;
          end_time: string;
          id?: string;
          id_contractor: string;
          id_service_type: string;
          start_time: string;
          status: string;
          updated_at?: string;
        };
        Update: {
          additional_information?: string | null;
          allow_notifications?: boolean;
          client_name?: string;
          client_phone?: string | null;
          created_at?: string;
          end_time?: string;
          id?: string;
          id_contractor?: string;
          id_service_type?: string;
          start_time?: string;
          status?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'schedule_id_contractor_fkey';
            columns: ['id_contractor'];
            isOneToOne: false;
            referencedRelation: 'users';
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
          created_at: string;
          id: string;
          name: string;
          picture_link: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name: string;
          picture_link?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          picture_link?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      work_day: {
        Row: {
          created_at: string;
          enabled: boolean;
          end_time: string;
          id_contractor: string;
          start_time: string;
          updated_at: string;
          week_day: Database['public']['Enums']['week_day_enum'];
        };
        Insert: {
          created_at?: string;
          enabled?: boolean;
          end_time: string;
          id_contractor: string;
          start_time: string;
          updated_at?: string;
          week_day: Database['public']['Enums']['week_day_enum'];
        };
        Update: {
          created_at?: string;
          enabled?: boolean;
          end_time?: string;
          id_contractor?: string;
          start_time?: string;
          updated_at?: string;
          week_day?: Database['public']['Enums']['week_day_enum'];
        };
        Relationships: [
          {
            foreignKeyName: 'work_day_id_contractor_fkey';
            columns: ['id_contractor'];
            isOneToOne: false;
            referencedRelation: 'users';
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
