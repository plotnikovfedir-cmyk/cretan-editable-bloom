import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

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
    // Use the provided Mapbox token directly
    const mapboxToken = 'pk.eyJ1Ijoid29sZnNzdHVuZGUiLCJhIjoiY21lMWc2Z3V4MGZhcDJsc2F4OXIxM3hnaiJ9.-bIR01o8OIl80c1X5-mJ0w'
    
    return new Response(
      JSON.stringify({ token: mapboxToken }),
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