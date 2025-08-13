import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, User, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Booking {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  type: string;
  booking_date: string;
  number_of_people: number;
  total_price: number;
  status: string;
  special_requests: string;
  reference_id: string;
  activity_title?: string;
  pickup_location?: string;
  destination?: string;
  created_at: string;
  updated_at: string;
}

const AdminBookings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAdminAccess();
    loadBookings();
  }, []);

  const checkAdminAccess = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/admin/login');
      return;
    }

    const { data: isAdmin } = await supabase.rpc('is_admin');
    if (!isAdmin) {
      navigate('/');
      return;
    }
  };

  const loadBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error('Error loading bookings:', error);
      toast({
        title: "Error",
        description: "Failed to load bookings",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: newStatus })
        .eq('id', bookingId);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Booking status updated successfully"
      });
      
      loadBookings();
    } catch (error) {
      console.error('Error updating booking status:', error);
      toast({
        title: "Error",
        description: "Failed to update booking status",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'confirmed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'completed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'confirmed': return <CheckCircle className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'activity': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'event': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'tour': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/admin')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Manage Bookings</h1>
        </div>
      </div>

      {/* Bookings List */}
      <div className="grid gap-4">
        {bookings.map((booking) => (
          <Card key={booking.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {booking.customer_name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {booking.customer_email} • {booking.customer_phone}
                    </p>
                    {booking.activity_title && (
                      <p className="text-sm font-medium text-foreground mt-1">
                        {booking.activity_title}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getTypeColor(booking.type)}>
                      {booking.type}
                    </Badge>
                    <Badge className={`${getStatusColor(booking.status)} flex items-center gap-1`}>
                      {getStatusIcon(booking.status)}
                      {booking.status}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-foreground">
                    €{Number(booking.total_price || 0).toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {booking.number_of_people} people
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Booking Details</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {booking.booking_date ? new Date(booking.booking_date).toLocaleDateString() : 'Date TBD'}
                    </p>
                    <p className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {booking.number_of_people} people
                    </p>
                    {booking.reference_id && (
                      <p>Reference: {booking.reference_id}</p>
                    )}
                    {booking.pickup_location && (
                      <p>Pickup: {booking.pickup_location}</p>
                    )}
                    {booking.destination && (
                      <p>Destination: {booking.destination}</p>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Booking Date</h4>
                  <p className="text-sm text-muted-foreground">
                    Created: {new Date(booking.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {booking.special_requests && (
                <div className="mb-4">
                  <h4 className="font-medium text-foreground mb-2">Special Requests</h4>
                  <p className="text-sm text-muted-foreground">{booking.special_requests}</p>
                </div>
              )}

              <div className="flex gap-2">
                {booking.status === 'pending' && (
                  <Button
                    size="sm"
                    onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                  >
                    Confirm Booking
                  </Button>
                )}
                {booking.status === 'confirmed' && (
                  <Button
                    size="sm"
                    onClick={() => updateBookingStatus(booking.id, 'completed')}
                  >
                    Mark as Completed
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                  className="text-red-600 hover:text-red-700"
                >
                  Cancel Booking
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {bookings.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No bookings found</h3>
              <p className="text-muted-foreground">Bookings will appear here when customers make reservations.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminBookings;