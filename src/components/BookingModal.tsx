import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'activity' | 'event' | 'taxi';
  title: string;
  price?: string;
  referenceId?: string;
}

const BookingModal = ({ isOpen, onClose, type, title, price, referenceId }: BookingModalProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    number_of_people: '1',
    special_requests: '',
    pickup_location: '',
    destination: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.customer_name || !formData.customer_email || !formData.customer_phone || !date) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      

      // Validate referenceId if provided - it should be a UUID or null
      if (referenceId) {
        const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!uuidPattern.test(referenceId)) {
          // Invalid format, will be set to null below
        }
      }

      const bookingData = {
        type,
        customer_name: formData.customer_name,
        customer_email: formData.customer_email,
        customer_phone: formData.customer_phone,
        booking_date: date.toISOString(),
        number_of_people: parseInt(formData.number_of_people),
        special_requests: formData.special_requests || null,
        reference_id: (referenceId && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(referenceId)) ? referenceId : null,
        total_price: price ? parseFloat(price.replace('€', '').replace(' per person', '')) * parseInt(formData.number_of_people) : null,
        activity_title: title,
        pickup_location: formData.pickup_location || null,
        destination: formData.destination || null
      };

      

      // Insert booking into database
      const { data: booking, error } = await supabase
        .from('bookings')
        .insert([bookingData])
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Send confirmation email
      try {
        const emailData = {
          template_name: 'booking_confirmation',
          to_email: formData.customer_email,
          template_data: {
            customer_name: formData.customer_name,
            title: title,
            type: type,
            booking_date: date.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }),
            number_of_people: formData.number_of_people,
            total_price: bookingData.total_price?.toFixed(2) || 'TBD',
            special_requests: formData.special_requests || ''
          }
        };

        await supabase.functions.invoke('send-notification-email', {
          body: emailData
        });

      } catch (emailError) {
        // Don't fail the booking if email fails
      }

      // Show confirmation dialog
      toast({
        title: "Booking Confirmed!",
        description: "Your booking request has been successfully submitted. We'll contact you shortly to confirm the details.",
        duration: 5000
      });

      onClose();
      setFormData({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        number_of_people: '1',
        special_requests: '',
        pickup_location: '',
        destination: ''
      });
      setDate(undefined);

    } catch (error: any) {
      
      
      let errorMessage = "Failed to create booking. Please try again.";
      if (error.message?.includes('row-level security policy')) {
        errorMessage = "Authentication issue. Please refresh the page and try again.";
      } else if (error.code === '23505') {
        errorMessage = "A booking with these details already exists.";
      } else if (error.message?.includes('Invalid input syntax')) {
        errorMessage = "Invalid booking data. Please check your inputs.";
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book {title}</DialogTitle>
          <DialogDescription>
            Fill in your details to make a reservation. We'll contact you to confirm.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="customer_name">Full Name *</Label>
            <Input
              id="customer_name"
              name="customer_name"
              value={formData.customer_name}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="customer_email">Email *</Label>
            <Input
              id="customer_email"
              name="customer_email"
              type="email"
              value={formData.customer_email}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="customer_phone">Phone Number *</Label>
            <Input
              id="customer_phone"
              name="customer_phone"
              type="tel"
              value={formData.customer_phone}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label>Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {type !== 'taxi' && (
            <div>
              <Label htmlFor="number_of_people">Number of People</Label>
              <Input
                id="number_of_people"
                name="number_of_people"
                type="number"
                min="1"
                max="15"
                value={formData.number_of_people}
                onChange={handleInputChange}
              />
            </div>
          )}

          {type === 'taxi' && (
            <>
              <div>
                <Label htmlFor="pickup_location">Pickup Location</Label>
                <Input
                  id="pickup_location"
                  name="pickup_location"
                  value={formData.pickup_location}
                  onChange={handleInputChange}
                  placeholder="Enter pickup address"
                />
              </div>
              <div>
                <Label htmlFor="destination">Destination</Label>
                <Input
                  id="destination"
                  name="destination"
                  value={formData.destination}
                  onChange={handleInputChange}
                  placeholder="Enter destination"
                />
              </div>
            </>
          )}

          <div>
            <Label htmlFor="special_requests">Special Requests</Label>
            <Textarea
              id="special_requests"
              name="special_requests"
              value={formData.special_requests}
              onChange={handleInputChange}
              placeholder="Any special requirements or requests..."
            />
          </div>

          {price && (
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span>Total Price:</span>
                <span className="font-bold text-lg">
                  €{(parseFloat(price.replace('€', '').replace(' per person', '')) * parseInt(formData.number_of_people)).toFixed(2)}
                </span>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Booking...' : 'Confirm Booking'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;