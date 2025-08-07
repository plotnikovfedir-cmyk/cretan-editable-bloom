export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      activities: {
        Row: {
          created_at: string | null
          description: string | null
          difficulty: string | null
          duration: string | null
          gallery_images: string[] | null
          id: string
          image_url: string | null
          max_participants: number | null
          price: number | null
          short_description: string | null
          slug: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          difficulty?: string | null
          duration?: string | null
          gallery_images?: string[] | null
          id?: string
          image_url?: string | null
          max_participants?: number | null
          price?: number | null
          short_description?: string | null
          slug: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          difficulty?: string | null
          duration?: string | null
          gallery_images?: string[] | null
          id?: string
          image_url?: string | null
          max_participants?: number | null
          price?: number | null
          short_description?: string | null
          slug?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      admin_users: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          role: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          role?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          role?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      blog_categories: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      blog_post_categories: {
        Row: {
          category_id: string
          post_id: string
        }
        Insert: {
          category_id: string
          post_id: string
        }
        Update: {
          category_id?: string
          post_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_post_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "blog_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_post_categories_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_post_tags: {
        Row: {
          post_id: string
          tag_id: string
        }
        Insert: {
          post_id: string
          tag_id: string
        }
        Update: {
          post_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_post_tags_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_post_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "blog_tags"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          author_name: string | null
          content: string
          created_at: string | null
          excerpt: string | null
          featured_image_url: string | null
          id: string
          is_published: boolean | null
          meta_description: string | null
          meta_keywords: string[] | null
          published_at: string | null
          read_time_minutes: number | null
          slug: string
          title: string
          updated_at: string | null
        }
        Insert: {
          author_name?: string | null
          content: string
          created_at?: string | null
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          is_published?: boolean | null
          meta_description?: string | null
          meta_keywords?: string[] | null
          published_at?: string | null
          read_time_minutes?: number | null
          slug: string
          title: string
          updated_at?: string | null
        }
        Update: {
          author_name?: string | null
          content?: string
          created_at?: string | null
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          is_published?: boolean | null
          meta_description?: string | null
          meta_keywords?: string[] | null
          published_at?: string | null
          read_time_minutes?: number | null
          slug?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      blog_tags: {
        Row: {
          created_at: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      bookings: {
        Row: {
          booking_date: string | null
          created_at: string | null
          customer_email: string
          customer_name: string
          customer_phone: string | null
          id: string
          number_of_people: number | null
          reference_id: string | null
          special_requests: string | null
          status: string | null
          total_price: number | null
          type: string
          updated_at: string | null
        }
        Insert: {
          booking_date?: string | null
          created_at?: string | null
          customer_email: string
          customer_name: string
          customer_phone?: string | null
          id?: string
          number_of_people?: number | null
          reference_id?: string | null
          special_requests?: string | null
          status?: string | null
          total_price?: number | null
          type: string
          updated_at?: string | null
        }
        Update: {
          booking_date?: string | null
          created_at?: string | null
          customer_email?: string
          customer_name?: string
          customer_phone?: string | null
          id?: string
          number_of_people?: number | null
          reference_id?: string | null
          special_requests?: string | null
          status?: string | null
          total_price?: number | null
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      cart_items: {
        Row: {
          created_at: string
          id: string
          product_id: string
          quantity: number
          session_id: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          product_id: string
          quantity?: number
          session_id: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          product_id?: string
          quantity?: number
          session_id?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_reviews: {
        Row: {
          created_at: string
          id: string
          is_approved: boolean
          product_id: string | null
          rating: number
          review_text: string
          updated_at: string
          user_email: string
          user_name: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_approved?: boolean
          product_id?: string | null
          rating: number
          review_text: string
          updated_at?: string
          user_email: string
          user_name: string
        }
        Update: {
          created_at?: string
          id?: string
          is_approved?: boolean
          product_id?: string | null
          rating?: number
          review_text?: string
          updated_at?: string
          user_email?: string
          user_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "customer_reviews_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          created_at: string | null
          description: string | null
          event_date: string | null
          id: string
          image_url: string | null
          location: string | null
          max_attendees: number | null
          price: number | null
          short_description: string | null
          slug: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          event_date?: string | null
          id?: string
          image_url?: string | null
          location?: string | null
          max_attendees?: number | null
          price?: number | null
          short_description?: string | null
          slug: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          event_date?: string | null
          id?: string
          image_url?: string | null
          location?: string | null
          max_attendees?: number | null
          price?: number | null
          short_description?: string | null
          slug?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      hero_slides: {
        Row: {
          created_at: string | null
          cta_link: string | null
          cta_text: string | null
          id: string
          image_url: string
          is_active: boolean | null
          order_position: number | null
          subtitle: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          cta_link?: string | null
          cta_text?: string | null
          id?: string
          image_url: string
          is_active?: boolean | null
          order_position?: number | null
          subtitle?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          cta_link?: string | null
          cta_text?: string | null
          id?: string
          image_url?: string
          is_active?: boolean | null
          order_position?: number | null
          subtitle?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      instagram_gallery: {
        Row: {
          alt_text: string | null
          caption: string | null
          created_at: string
          id: string
          image_url: string
          is_active: boolean
          link_url: string | null
          order_position: number | null
          updated_at: string
        }
        Insert: {
          alt_text?: string | null
          caption?: string | null
          created_at?: string
          id?: string
          image_url: string
          is_active?: boolean
          link_url?: string | null
          order_position?: number | null
          updated_at?: string
        }
        Update: {
          alt_text?: string | null
          caption?: string | null
          created_at?: string
          id?: string
          image_url?: string
          is_active?: boolean
          link_url?: string | null
          order_position?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      locations: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          latitude: number
          location_type: string
          longitude: number
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          latitude: number
          location_type?: string
          longitude: number
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          latitude?: number
          location_type?: string
          longitude?: number
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          is_active: boolean
          preferences: Json | null
          subscribed_at: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_active?: boolean
          preferences?: Json | null
          subscribed_at?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_active?: boolean
          preferences?: Json | null
          subscribed_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      order_items: {
        Row: {
          created_at: string
          id: string
          order_id: string
          product_id: string
          quantity: number
          total_price: number
          unit_price: number
        }
        Insert: {
          created_at?: string
          id?: string
          order_id: string
          product_id: string
          quantity: number
          total_price: number
          unit_price: number
        }
        Update: {
          created_at?: string
          id?: string
          order_id?: string
          product_id?: string
          quantity?: number
          total_price?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string
          customer_email: string
          customer_name: string
          customer_phone: string
          id: string
          notes: string | null
          order_number: string
          payment_method: string
          shipping_address: string
          status: string
          total_amount: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          customer_email: string
          customer_name: string
          customer_phone: string
          id?: string
          notes?: string | null
          order_number: string
          payment_method: string
          shipping_address: string
          status?: string
          total_amount: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          customer_email?: string
          customer_name?: string
          customer_phone?: string
          id?: string
          notes?: string | null
          order_number?: string
          payment_method?: string
          shipping_address?: string
          status?: string
          total_amount?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          in_stock: boolean | null
          latitude: number | null
          longitude: number | null
          name: string
          price: number | null
          slug: string
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          in_stock?: boolean | null
          latitude?: number | null
          longitude?: number | null
          name: string
          price?: number | null
          slug: string
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          in_stock?: boolean | null
          latitude?: number | null
          longitude?: number | null
          name?: string
          price?: number | null
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      settings: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          id: string
          is_public: boolean
          setting_key: string
          setting_type: string
          setting_value: string | null
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean
          setting_key: string
          setting_type?: string
          setting_value?: string | null
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean
          setting_key?: string
          setting_type?: string
          setting_value?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          created_at: string
          customer_image_url: string | null
          customer_location: string | null
          customer_name: string
          id: string
          is_active: boolean
          is_featured: boolean
          order_position: number | null
          rating: number | null
          testimonial_text: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_image_url?: string | null
          customer_location?: string | null
          customer_name: string
          id?: string
          is_active?: boolean
          is_featured?: boolean
          order_position?: number | null
          rating?: number | null
          testimonial_text: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_image_url?: string | null
          customer_location?: string | null
          customer_name?: string
          id?: string
          is_active?: boolean
          is_featured?: boolean
          order_position?: number | null
          rating?: number | null
          testimonial_text?: string
          updated_at?: string
        }
        Relationships: []
      }
      website_images: {
        Row: {
          alt_text: string | null
          created_at: string
          file_size: number | null
          filename: string
          id: string
          is_active: boolean
          mime_type: string | null
          original_path: string
          public_url: string
          updated_at: string
          usage_type: string
        }
        Insert: {
          alt_text?: string | null
          created_at?: string
          file_size?: number | null
          filename: string
          id?: string
          is_active?: boolean
          mime_type?: string | null
          original_path: string
          public_url: string
          updated_at?: string
          usage_type?: string
        }
        Update: {
          alt_text?: string | null
          created_at?: string
          file_size?: number | null
          filename?: string
          id?: string
          is_active?: boolean
          mime_type?: string | null
          original_path?: string
          public_url?: string
          updated_at?: string
          usage_type?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_order_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      is_admin: {
        Args: { user_id?: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
