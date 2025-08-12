-- Create email notification templates table for better email management
CREATE TABLE IF NOT EXISTS public.email_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_name TEXT NOT NULL UNIQUE,
  subject TEXT NOT NULL,
  html_content TEXT NOT NULL,
  text_content TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;

-- Admin can manage email templates
CREATE POLICY "Admins can manage email templates" ON public.email_templates
FOR ALL
USING (is_admin());

-- Insert default email templates
INSERT INTO public.email_templates (template_name, subject, html_content, text_content) VALUES
(
  'booking_confirmation',
  'Booking Confirmation - {{title}}',
  '<h1>Booking Confirmation</h1>
   <p>Dear {{customer_name}},</p>
   <p>Thank you for your booking! We are excited to confirm your reservation for <strong>{{title}}</strong>.</p>
   <h3>Booking Details:</h3>
   <ul>
     <li><strong>Type:</strong> {{type}}</li>
     <li><strong>Date:</strong> {{booking_date}}</li>
     <li><strong>Number of People:</strong> {{number_of_people}}</li>
     <li><strong>Total Price:</strong> €{{total_price}}</li>
   </ul>
   {{#special_requests}}
   <p><strong>Special Requests:</strong> {{special_requests}}</p>
   {{/special_requests}}
   <p>We will contact you within 24 hours to confirm all details.</p>
   <p>Best regards,<br>Cretan Guru Team</p>',
  'Booking Confirmation - {{title}}

Dear {{customer_name}},

Thank you for your booking! We are excited to confirm your reservation for {{title}}.

Booking Details:
- Type: {{type}}
- Date: {{booking_date}}
- Number of People: {{number_of_people}}
- Total Price: €{{total_price}}

{{#special_requests}}Special Requests: {{special_requests}}{{/special_requests}}

We will contact you within 24 hours to confirm all details.

Best regards,
Cretan Guru Team'
),
(
  'order_confirmation',
  'Order Confirmation - #{{order_number}}',
  '<h1>Order Confirmation</h1>
   <p>Dear {{customer_name}},</p>
   <p>Thank you for your order! We have received your order and will process it shortly.</p>
   <h3>Order Details:</h3>
   <ul>
     <li><strong>Order Number:</strong> #{{order_number}}</li>
     <li><strong>Total Amount:</strong> €{{total_amount}}</li>
     <li><strong>Payment Method:</strong> {{payment_method}}</li>
     <li><strong>Shipping Address:</strong> {{shipping_address}}</li>
   </ul>
   <h3>Items Ordered:</h3>
   <div>{{order_items}}</div>
   {{#notes}}
   <p><strong>Notes:</strong> {{notes}}</p>
   {{/notes}}
   <p>We will contact you with tracking information once your order ships.</p>
   <p>Best regards,<br>Cretan Guru Team</p>',
  'Order Confirmation - #{{order_number}}

Dear {{customer_name}},

Thank you for your order! We have received your order and will process it shortly.

Order Details:
- Order Number: #{{order_number}}
- Total Amount: €{{total_amount}}
- Payment Method: {{payment_method}}
- Shipping Address: {{shipping_address}}

Items Ordered:
{{order_items}}

{{#notes}}Notes: {{notes}}{{/notes}}

We will contact you with tracking information once your order ships.

Best regards,
Cretan Guru Team'
);

-- Create trigger for updating email templates timestamps
CREATE TRIGGER update_email_templates_updated_at
  BEFORE UPDATE ON public.email_templates
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();