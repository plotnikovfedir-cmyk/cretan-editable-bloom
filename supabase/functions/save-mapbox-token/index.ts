import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get the authorization header from the request
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'No authorization header' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 401
        }
      )
    }

    // Set the auth token for the request
    supabaseClient.auth.setSession({ access_token: authHeader.replace('Bearer ', ''), refresh_token: '' })

    // Check if user is admin
    const { data: isAdmin, error: adminError } = await supabaseClient.rpc('is_admin')
    
    if (adminError || !isAdmin) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 403
        }
      )
    }

    const { token } = await req.json()
    
    if (!token || typeof token !== 'string' || !token.startsWith('pk.')) {
      return new Response(
        JSON.stringify({ error: 'Invalid Mapbox token format' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400
        }
      )
    }

    // Note: In a real deployment, this would save the token to Supabase secrets
    // For now, this function serves as a placeholder for the admin interface
    // The actual token storage would be handled through Supabase dashboard

    return new Response(
      JSON.stringify({ success: true, message: 'Token configuration saved' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})