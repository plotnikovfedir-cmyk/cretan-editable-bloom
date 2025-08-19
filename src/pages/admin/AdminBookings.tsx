import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from '@/components/ui/alert-dialog';
import { ArrowLeft, Calendar, User, CheckCircle, XCircle, Clock, MoreVertical, Trash2, Search, Filter } from 'lucide-react';
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
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.log('No user found, redirecting to admin login');
        navigate('/admin/login');
        return;
      }

      console.log('Checking admin access for user:', user.id);
      const { data: adminCheck, error } = await supabase
        .rpc('is_admin', { user_id: user.id });
      
      if (error) {
        console.error('Error checking admin status:', error);
        toast({
          title: "Access Error",
          description: "Could not verify admin status",
          variant: "destructive",
        });
        navigate('/admin/login');
        return;
      }
      
      console.log('Admin check result:', adminCheck);
      if (!adminCheck) {
        console.log('User is not admin, redirecting');
        toast({
          title: "Access Denied",
          description: "You don't have admin privileges",
          variant: "destructive",
        });
        navigate('/admin/login');
        return;
      }
      
      console.log('Admin access confirmed, loading bookings');
      loadBookings();
    } catch (error) {
      console.error('Error in admin access check:', error);
      navigate('/admin/login');
    }
  };

  const loadBookings = async () => {
    setLoading(true);
    try {
      console.log('Loading bookings...');
      
      // First get all bookings
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (bookingsError) throw bookingsError;
      
      console.log('Bookings loaded:', bookingsData?.length || 0);

      // Process each booking to get additional activity/event data
      const processedBookings = await Promise.all((bookingsData || []).map(async (booking) => {
        // If we have reference_id and no activity_title, try to get it from activities or events
        if (booking.reference_id && !booking.activity_title) {
          try {
            if (booking.type === 'activity') {
              const { data: activityData } = await supabase
                .from('activities')
                .select('title')
                .eq('id', booking.reference_id)
                .maybeSingle();
              
              if (activityData?.title) {
                booking.activity_title = activityData.title;
              }
            } else if (booking.type === 'event') {
              const { data: eventData } = await supabase
                .from('events')
                .select('title')
                .eq('id', booking.reference_id)
                .maybeSingle();
              
              if (eventData?.title) {
                booking.activity_title = eventData.title;
              }
            }
          } catch (err) {
            console.log('Could not fetch activity/event title for booking:', booking.id, err);
          }
        }
        
        // Fallback display name if no activity_title
        if (!booking.activity_title) {
          booking.activity_title = booking.type === 'taxi' ? 'Taxi Service' : 
                                   booking.type === 'activity' ? 'Unknown Activity' : 
                                   booking.type === 'event' ? 'Unknown Event' : 
                                   'Unknown Service';
        }
        
        return booking;
      }));
      
      console.log('Processed bookings:', processedBookings.length);
      setBookings(processedBookings);
      setFilteredBookings(processedBookings);
    } catch (error) {
      console.error('Error loading bookings:', error);
      toast({
        title: "Error",
        description: "Failed to load bookings. Please try again.",
        variant: "destructive",
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

  const deleteBooking = async (bookingId: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', bookingId);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Booking deleted successfully"
      });
      
      loadBookings();
    } catch (error) {
      console.error('Error deleting booking:', error);
      toast({
        title: "Error",
        description: "Failed to delete booking",
        variant: "destructive"
      });
    }
  };

  // Filter bookings based on search and filters
  useEffect(() => {
    let filtered = bookings;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(booking => 
        booking.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.customer_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.activity_title?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(booking => booking.status === statusFilter);
    }

    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(booking => booking.type === typeFilter);
    }

    setFilteredBookings(filtered);
  }, [bookings, searchTerm, statusFilter, typeFilter]);

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
            onClick={() => navigate('/admin/dashboard')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Manage Bookings</h1>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by customer name, email, or activity..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="activity">Activity</SelectItem>
            <SelectItem value="event">Event</SelectItem>
            <SelectItem value="taxi">Taxi</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Bookings List */}
      <div className="grid gap-4">
        {filteredBookings.map((booking) => (
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
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-lg font-semibold text-foreground">
                      €{Number(booking.total_price || 0).toFixed(2)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {booking.number_of_people} people
                    </p>
                  </div>
                  
                  {/* Actions Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      {booking.status === 'pending' && (
                        <DropdownMenuItem onClick={() => updateBookingStatus(booking.id, 'confirmed')}>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Confirm Booking
                        </DropdownMenuItem>
                      )}
                      {booking.status === 'confirmed' && (
                        <DropdownMenuItem onClick={() => updateBookingStatus(booking.id, 'completed')}>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Mark as Completed
                        </DropdownMenuItem>
                      )}
                      {booking.status !== 'cancelled' && (
                        <DropdownMenuItem onClick={() => updateBookingStatus(booking.id, 'cancelled')}>
                          <XCircle className="mr-2 h-4 w-4" />
                          Cancel Booking
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Booking
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the booking for {booking.customer_name}.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteBooking(booking.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
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

            </CardContent>
          </Card>
        ))}

        {filteredBookings.length === 0 && bookings.length > 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Filter className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No bookings match your filters</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria or filters.</p>
            </CardContent>
          </Card>
        )}

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