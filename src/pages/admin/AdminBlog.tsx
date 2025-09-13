// Force rebuild with updated imports
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Plus, Edit, Trash2, Eye, BarChart3, Settings } from "lucide-react";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { FormDialog } from "@/components/admin/FormDialog";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { BlogStats } from "@/components/admin/BlogStats";
import { CategoryManager } from "@/components/admin/CategoryManager";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image_url: string;
  is_published: boolean;
  author_name: string;
  meta_description: string;
  meta_keywords: string[];
  read_time_minutes: number;
  published_at: string;
  created_at: string;
}

const AdminBlog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [activeTab, setActiveTab] = useState("posts");
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    featured_image_url: "",
    is_published: false,
    author_name: "Cretan Guru Team",
    meta_description: "",
    meta_keywords: "",
    read_time_minutes: ""
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAdminAccess();
    loadPosts();
  }, []);

  const checkAdminAccess = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      navigate("/admin");
      return;
    }

    const { data: adminData, error } = await supabase
      .from("admin_users")
      .select("*")
      .eq("user_id", user.id)
      .eq("is_active", true)
      .single();

    if (error || !adminData) {
      navigate("/admin");
      return;
    }
  };

  const loadPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось загрузить статьи",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .trim();
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const postData = {
        title: formData.title,
        slug: formData.slug || generateSlug(formData.title),
        content: formData.content,
        excerpt: formData.excerpt,
        featured_image_url: formData.featured_image_url,
        is_published: formData.is_published,
        author_name: formData.author_name,
        meta_description: formData.meta_description,
        meta_keywords: formData.meta_keywords.split(',').map(k => k.trim()).filter(k => k),
        read_time_minutes: parseInt(formData.read_time_minutes) || calculateReadTime(formData.content),
        published_at: formData.is_published ? new Date().toISOString() : null
      };

      if (editingPost) {
        const { error } = await supabase
          .from("blog_posts")
          .update(postData)
          .eq("id", editingPost.id);

        if (error) throw error;
        
        toast({
          title: "Успех",
          description: "Статья обновлена",
        });
      } else {
        const { error } = await supabase
          .from("blog_posts")
          .insert([postData]);

        if (error) throw error;
        
        toast({
          title: "Успех",
          description: "Статья создана",
        });
      }

      setIsDialogOpen(false);
      setEditingPost(null);
      resetForm();
      loadPosts();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось сохранить статью",
      });
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      content: post.content || "",
      excerpt: post.excerpt || "",
      featured_image_url: post.featured_image_url || "",
      is_published: post.is_published,
      author_name: post.author_name || "Cretan Guru Team",
      meta_description: post.meta_description || "",
      meta_keywords: post.meta_keywords?.join(", ") || "",
      read_time_minutes: post.read_time_minutes?.toString() || ""
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (postId: string) => {
    if (!confirm("Вы уверены, что хотите удалить эту статью?")) return;

    try {
      const { error } = await supabase
        .from("blog_posts")
        .delete()
        .eq("id", postId);

      if (error) throw error;

      toast({
        title: "Успех",
        description: "Статья удалена",
      });
      
      loadPosts();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось удалить статью",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      content: "",
      excerpt: "",
      featured_image_url: "",
      is_published: false,
      author_name: "Cretan Guru Team",
      meta_description: "",
      meta_keywords: "",
      read_time_minutes: ""
    });
  };

  const openCreateDialog = () => {
    resetForm();
    setEditingPost(null);
    setIsDialogOpen(true);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Загрузка...</div>;
  }

  return (
    <div className="min-h-screen bg-muted/50">
      <header className="bg-background border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/admin/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Назад
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Управление блогом</h1>
          </div>
          {activeTab === "posts" && (
            <Button onClick={openCreateDialog}>
              <Plus className="w-4 h-4 mr-2" />
              Добавить статью
            </Button>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="posts" className="flex items-center gap-2">
              <Edit className="w-4 h-4" />
              Статьи
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Статистика
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Категории и теги
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Card key={post.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
                      <div className="flex gap-2">
                        {post.is_published && (
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/blog/${post.slug}`} target="_blank">
                              <Eye className="w-4 h-4" />
                            </Link>
                          </Button>
                        )}
                        <Button variant="outline" size="sm" onClick={() => handleEdit(post)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDelete(post.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {post.featured_image_url && (
                      <img 
                        src={post.featured_image_url} 
                        alt={post.title}
                        className="w-full h-32 object-cover rounded-md mb-4"
                      />
                    )}
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {post.excerpt || post.content?.substring(0, 150) + "..."}
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className={`text-xs px-2 py-1 rounded ${
                          post.is_published 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {post.is_published ? 'Опубликовано' : 'Черновик'}
                        </span>
                        {post.read_time_minutes && (
                          <span className="text-xs text-muted-foreground">
                            {post.read_time_minutes} мин чтения
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Автор: {post.author_name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Слаг: {post.slug}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(post.created_at).toLocaleDateString('ru-RU')}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="stats" className="mt-6">
            <BlogStats />
          </TabsContent>

          <TabsContent value="categories" className="mt-6">
            <CategoryManager />
          </TabsContent>
        </Tabs>
      </main>

      <FormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        title={editingPost ? "Редактировать статью" : "Создать статью"}
        className="max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Заголовок</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Слаг (URL)</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="Автоматически из заголовка"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Краткое описание</Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              rows={2}
              placeholder="Краткое описание статьи для превью"
            />
          </div>

          <RichTextEditor
            label="Содержание"
            value={formData.content}
            onChange={(value) => setFormData({ ...formData, content: value })}
            placeholder="Полный текст статьи"
            height="400px"
          />

          <ImageUploader
            label="Главное изображение"
            currentImage={formData.featured_image_url}
            onImageUploaded={(url) => setFormData({ ...formData, featured_image_url: url })}
            bucket="admin-uploads"
            folder="blog"
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="author_name">Автор</Label>
              <Input
                id="author_name"
                value={formData.author_name}
                onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="read_time_minutes">Время чтения (мин)</Label>
              <Input
                id="read_time_minutes"
                type="number"
                value={formData.read_time_minutes}
                onChange={(e) => setFormData({ ...formData, read_time_minutes: e.target.value })}
                placeholder="Автоматически из текста"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="meta_description">Мета-описание (SEO)</Label>
            <Textarea
              id="meta_description"
              value={formData.meta_description}
              onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
              rows={2}
              placeholder="Описание для поисковых систем (до 160 символов)"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="meta_keywords">Ключевые слова (SEO)</Label>
            <Input
              id="meta_keywords"
              value={formData.meta_keywords}
              onChange={(e) => setFormData({ ...formData, meta_keywords: e.target.value })}
              placeholder="ключевое слово 1, ключевое слово 2, ключевое слово 3"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="is_published"
              checked={formData.is_published}
              onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
            />
            <Label htmlFor="is_published">Опубликовать</Label>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
              Отмена
            </Button>
            <Button type="submit">
              {editingPost ? "Обновить" : "Создать"}
            </Button>
          </div>
        </form>
      </FormDialog>
    </div>
  );
};

export default AdminBlog;