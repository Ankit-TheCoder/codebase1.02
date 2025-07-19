
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { token, newPassword } = await req.json()

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Find the reset token
    const { data: resetRequest, error: findError } = await supabaseClient
      .from('contact_submissions')
      .select('email, admin_notes, created_at')
      .eq('message', `Reset token: ${token}`)
      .eq('status', 'password_reset')
      .single()

    if (findError || !resetRequest) {
      return new Response(
        JSON.stringify({ error: 'Invalid or expired reset token' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      )
    }

    // Check if token is expired
    const expiresAt = new Date(resetRequest.admin_notes.replace('Expires: ', ''))
    if (new Date() > expiresAt) {
      return new Response(
        JSON.stringify({ error: 'Reset token has expired' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      )
    }

    // Update the admin password
    const { error: updateError } = await supabaseClient
      .from('admin_users')
      .update({ 
        password_hash: supabaseClient.rpc('crypt', { 
          password: newPassword, 
          salt: supabaseClient.rpc('gen_salt', { type: 'bf' }) 
        }) 
      })
      .eq('email', resetRequest.email)

    if (updateError) {
      console.error('Error updating password:', updateError)
      return new Response(
        JSON.stringify({ error: 'Failed to update password' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500 
        }
      )
    }

    // Delete the used reset token
    await supabaseClient
      .from('contact_submissions')
      .delete()
      .eq('message', `Reset token: ${token}`)
      .eq('status', 'password_reset')

    return new Response(
      JSON.stringify({ success: true, message: 'Password updated successfully' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Function error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
