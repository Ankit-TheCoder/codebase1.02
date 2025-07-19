
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
    const { email } = await req.json()

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Check if admin user exists
    const { data: adminUser, error: selectError } = await supabaseClient
      .from('admin_users')
      .select('id, email')
      .eq('email', email)
      .single()

    if (selectError || !adminUser) {
      // Don't reveal if email exists or not for security
      return new Response(
        JSON.stringify({ success: true, message: 'If the email exists, a reset link has been sent.' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      )
    }

    // Generate a temporary reset token (valid for 1 hour)
    const resetToken = crypto.randomUUID()
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000) // 1 hour from now

    // Store reset token in a simple way (you might want to create a separate table for this)
    // For now, we'll use the admin_notes field in contact_submissions as a temporary storage
    const { error: insertError } = await supabaseClient
      .from('contact_submissions')
      .insert({
        name: 'Password Reset',
        email: email,
        message: `Reset token: ${resetToken}`,
        admin_notes: `Expires: ${expiresAt.toISOString()}`,
        status: 'password_reset'
      })

    if (insertError) {
      console.error('Error storing reset token:', insertError)
      return new Response(
        JSON.stringify({ error: 'Failed to process request' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500 
        }
      )
    }

    // In a real application, you would send an email here
    // For now, we'll just log the reset token (in production, use a proper email service)
    console.log(`Password reset requested for ${email}. Reset token: ${resetToken}`)
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'If the email exists, a reset link has been sent.',
        // In development, show the token (remove this in production)
        resetToken: resetToken
      }),
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
