import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Search, Globe } from "lucide-react";

interface SEOFieldsProps {
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  onMetaTitleChange: (value: string) => void;
  onMetaDescriptionChange: (value: string) => void;
  onMetaKeywordsChange: (keywords: string[]) => void;
}

const SEOFields = ({
  metaTitle = "",
  metaDescription = "",
  metaKeywords = [],
  onMetaTitleChange,
  onMetaDescriptionChange,
  onMetaKeywordsChange,
}: SEOFieldsProps) => {
  const [newKeyword, setNewKeyword] = useState("");

  const addKeyword = () => {
    if (newKeyword.trim() && !metaKeywords.includes(newKeyword.trim())) {
      onMetaKeywordsChange([...metaKeywords, newKeyword.trim()]);
      setNewKeyword("");
    }
  };

  const removeKeyword = (keywordToRemove: string) => {
    onMetaKeywordsChange(metaKeywords.filter(keyword => keyword !== keywordToRemove));
  };

  const handleKeywordKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addKeyword();
    }
  };

  return (
    <div className="space-y-6 p-6 bg-muted/30 rounded-lg border border-border">
      <div className="flex items-center gap-2 mb-4">
        <Search className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">SEO Settings</h3>
        <Globe className="h-4 w-4 text-muted-foreground" />
      </div>

      <div className="grid gap-4">
        {/* Meta Title */}
        <div className="space-y-2">
          <Label htmlFor="metaTitle" className="text-sm font-medium">
            Meta Title
            <span className="text-xs text-muted-foreground ml-2">(Max 60 characters)</span>
          </Label>
          <Input
            id="metaTitle"
            placeholder="Enter SEO title for search engines..."
            value={metaTitle}
            onChange={(e) => onMetaTitleChange(e.target.value)}
            maxLength={60}
            className="w-full"
          />
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">
              Appears in search results and browser tabs
            </span>
            <span className={`${metaTitle.length > 60 ? 'text-destructive' : 'text-muted-foreground'}`}>
              {metaTitle.length}/60
            </span>
          </div>
        </div>

        {/* Meta Description */}
        <div className="space-y-2">
          <Label htmlFor="metaDescription" className="text-sm font-medium">
            Meta Description
            <span className="text-xs text-muted-foreground ml-2">(Max 160 characters)</span>
          </Label>
          <Textarea
            id="metaDescription"
            placeholder="Write a compelling description that appears in search results..."
            value={metaDescription}
            onChange={(e) => onMetaDescriptionChange(e.target.value)}
            maxLength={160}
            rows={3}
            className="w-full resize-none"
          />
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">
              Displayed in search engine results
            </span>
            <span className={`${metaDescription.length > 160 ? 'text-destructive' : 'text-muted-foreground'}`}>
              {metaDescription.length}/160
            </span>
          </div>
        </div>

        {/* Meta Keywords */}
        <div className="space-y-2">
          <Label htmlFor="metaKeywords" className="text-sm font-medium">
            Meta Keywords
            <span className="text-xs text-muted-foreground ml-2">(Separate with Enter)</span>
          </Label>
          <div className="flex gap-2">
            <Input
              id="metaKeywords"
              placeholder="Add relevant keywords..."
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              onKeyPress={handleKeywordKeyPress}
              className="flex-1"
            />
            <Button 
              type="button" 
              onClick={addKeyword} 
              size="sm" 
              variant="outline"
              disabled={!newKeyword.trim()}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Keywords Display */}
          {metaKeywords.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {metaKeywords.map((keyword, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {keyword}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 hover:bg-transparent"
                    onClick={() => removeKeyword(keyword)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          )}
          
          <p className="text-xs text-muted-foreground">
            Add keywords that describe this content for search engines
          </p>
        </div>

        {/* SEO Preview */}
        {(metaTitle || metaDescription) && (
          <div className="mt-6 p-4 bg-background border border-border rounded-lg">
            <h4 className="text-sm font-medium mb-2 text-muted-foreground">Search Preview:</h4>
            <div className="space-y-1">
              <div className="text-lg text-blue-600 underline cursor-pointer hover:text-blue-800">
                {metaTitle || "Untitled Page"}
              </div>
              <div className="text-sm text-green-700">
                https://yoursite.com/page-url
              </div>
              <div className="text-sm text-gray-600">
                {metaDescription || "No description available"}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SEOFields;