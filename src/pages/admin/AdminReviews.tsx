import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Star, Check, X, Eye, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CustomerReview {
  id: string;
  user_name: string;
  user_email: string;
  review_text: string;
  rating: number;
  is_approved: boolean;
  product_id: string;
  created_at: string;
  updated_at: string;
}

const AdminReviews = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [reviews, setReviews] = useState<CustomerReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAdminAccess();
    loadReviews();
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

  const loadReviews = async () => {
    try {
      // Use the admin access to get all reviews (approved and unapproved)
      const { data, error } = await supabase
        .from('customer_reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error loading reviews:', error);
      toast({
        title: "Error",
        description: "Failed to load reviews",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateReviewStatus = async (reviewId: string, isApproved: boolean) => {
    try {
      const reviewToUpdate = reviews.find(r => r.id === reviewId);
      
      const { error } = await supabase
        .from('customer_reviews')
        .update({ is_approved: isApproved })
        .eq('id', reviewId);

      if (error) throw error;

      // Log admin action for audit trail
      try {
        await supabase.rpc('log_admin_action', {
          p_action: `Review ${isApproved ? 'approved' : 'rejected'}`,
          p_table_name: 'customer_reviews',
          p_record_id: reviewId,
          p_old_values: { is_approved: reviewToUpdate?.is_approved },
          p_new_values: { is_approved: isApproved }
        });
      } catch (auditError) {
        console.error('Error logging admin action:', auditError);
      }
      
      toast({
        title: "Success",
        description: `Review ${isApproved ? 'approved' : 'rejected'} successfully`
      });
      
      loadReviews();
    } catch (error) {
      console.error('Error updating review status:', error);
      toast({
        title: "Error",
        description: "Failed to update review status",
        variant: "destructive"
      });
    }
  };

  const deleteReview = async (reviewId: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;

    try {
      const reviewToDelete = reviews.find(r => r.id === reviewId);
      
      const { error } = await supabase
        .from('customer_reviews')
        .delete()
        .eq('id', reviewId);

      if (error) throw error;

      // Log admin action for audit trail
      try {
        await supabase.rpc('log_admin_action', {
          p_action: 'Review deleted',
          p_table_name: 'customer_reviews',
          p_record_id: reviewId,
          p_old_values: reviewToDelete ? {
            user_name: reviewToDelete.user_name,
            rating: reviewToDelete.rating,
            review_text: reviewToDelete.review_text
          } : null
        });
      } catch (auditError) {
        console.error('Error logging admin action:', auditError);
      }
      
      toast({
        title: "Success",
        description: "Review deleted successfully"
      });
      
      loadReviews();
    } catch (error) {
      console.error('Error deleting review:', error);
      toast({
        title: "Error",
        description: "Failed to delete review",
        variant: "destructive"
      });
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const getStatusColor = (isApproved: boolean) => {
    return isApproved 
      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const pendingReviews = reviews.filter(review => !review.is_approved);
  const approvedReviews = reviews.filter(review => review.is_approved);

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
          <h1 className="text-3xl font-bold text-foreground">Manage Reviews</h1>
        </div>
      </div>

      {/* Pending Reviews Section */}
      {pendingReviews.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Pending Reviews ({pendingReviews.length})
          </h2>
          <div className="grid gap-4">
            {pendingReviews.map((review) => (
              <Card key={review.id} className="border-yellow-200 dark:border-yellow-800">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-foreground">{review.user_name}</h3>
                        <div className="flex">{renderStars(review.rating)}</div>
                        <Badge className={getStatusColor(review.is_approved)}>
                          {review.is_approved ? 'Approved' : 'Pending'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{review.user_email}</p>
                      <p className="text-foreground">{review.review_text}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        {new Date(review.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => updateReviewStatus(review.id, true)}
                      className="flex items-center gap-1"
                    >
                      <Check className="h-4 w-4" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateReviewStatus(review.id, false)}
                      className="flex items-center gap-1 text-red-600 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                      Reject
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteReview(review.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Approved Reviews Section */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Approved Reviews ({approvedReviews.length})
        </h2>
        <div className="grid gap-4">
          {approvedReviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-foreground">{review.user_name}</h3>
                      <div className="flex">{renderStars(review.rating)}</div>
                      <Badge className={getStatusColor(review.is_approved)}>
                        Approved
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{review.user_email}</p>
                    <p className="text-foreground">{review.review_text}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">
                      {new Date(review.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateReviewStatus(review.id, false)}
                    className="flex items-center gap-1 text-yellow-600 hover:text-yellow-700"
                  >
                    <Eye className="h-4 w-4" />
                    Unapprove
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteReview(review.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {reviews.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No reviews found</h3>
            <p className="text-muted-foreground">Customer reviews will appear here when submitted.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminReviews;