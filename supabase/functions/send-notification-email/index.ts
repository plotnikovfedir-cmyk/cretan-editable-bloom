import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailData {
  template_name: string;
  to_email: string;
  subject_data?: Record<string, any>;
  template_data: Record<string, any>;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const emailData: EmailData = await req.json();
    console.log("Received email request:", emailData);

    // Create Supabase client
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Get email template
    const { data: template, error: templateError } = await supabase
      .from("email_templates")
      .select("*")
      .eq("template_name", emailData.template_name)
      .single();

    if (templateError || !template) {
      console.error("Template not found:", templateError);
      throw new Error(`Email template '${emailData.template_name}' not found`);
    }

    // Simple template replacement function
    const replaceTemplate = (content: string, data: Record<string, any>): string => {
      let result = content;
      for (const [key, value] of Object.entries(data)) {
        const regex = new RegExp(`{{${key}}}`, 'g');
        result = result.replace(regex, String(value || ''));
      }
      // Handle conditional blocks (basic implementation)
      result = result.replace(/{{#(\w+)}}(.*?){{\/\1}}/gs, (match, key, content) => {
        return data[key] ? content : '';
      });
      return result;
    };

    // Replace template placeholders
    const subject = replaceTemplate(template.subject, { ...emailData.template_data, ...emailData.subject_data });
    const htmlContent = replaceTemplate(template.html_content, emailData.template_data);
    const textContent = template.text_content ? replaceTemplate(template.text_content, emailData.template_data) : undefined;

    console.log("Sending email to:", emailData.to_email);
    console.log("Subject:", subject);

    // Send email using Resend
    const emailResponse = await resend.emails.send({
      from: "Cretan Guru <hello@cretanguru.com>",
      to: [emailData.to_email],
      subject: subject,
      html: htmlContent,
      text: textContent,
      // Also send copy to admin
      bcc: ["hello@cretanguru.com"]
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailId: emailResponse.data?.id }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "Failed to send email" 
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
});