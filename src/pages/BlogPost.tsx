import { useParams, Link, Navigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { sanitizeHtml } from "@/utils/sanitize";
import oliveOilImage from "@/assets/olive-oil-product.jpg";
import herbsImage from "@/assets/herbs-product.jpg";

interface BlogPostData {
  title: string;
  content: string;
  image: string;
  date: string;
  readTime: string;
  tags: string[];
  excerpt: string;
}

const BlogPost = () => {
  const { slug } = useParams();

  const blogPosts: Record<string, BlogPostData> = {
    "cretan-olive-oil": {
      title: "Why Cretan Olive Oil is Unique",
      excerpt: "Explore the health benefits and centuries-old heritage behind our premium olive oils.",
      image: oliveOilImage,
      date: "March 15, 2024",
      readTime: "6 min read",
      tags: ["Olive Oil", "Health", "Tradition"],
      content: `
        <p class="text-lg mb-6">Cretan olive oil has been renowned for its exceptional quality for over 4,000 years. What makes it so special? The answer lies in a perfect combination of climate, soil, traditional methods, and ancient wisdom passed down through generations.</p>

        <h2 class="text-2xl font-bold mb-4 mt-8">The Perfect Mediterranean Climate</h2>
        <p class="mb-6">Crete's unique position in the Mediterranean Sea creates an ideal microclimate for olive cultivation. The island enjoys over 300 days of sunshine per year, combined with gentle sea breezes that provide the perfect balance of warmth and moisture. This climate allows olives to ripen slowly and develop complex flavors that are impossible to replicate elsewhere.</p>

        <h2 class="text-2xl font-bold mb-4 mt-8">Ancient Trees, Ancient Wisdom</h2>
        <p class="mb-6">Many of Crete's olive trees are hundreds, sometimes thousands of years old. These ancient giants have developed deep root systems that tap into mineral-rich soil layers, giving their fruit a distinctive taste profile. Local families have tended these groves for generations, learning exactly when to harvest for optimal flavor and nutritional content.</p>

        <h2 class="text-2xl font-bold mb-4 mt-8">Traditional Cold-Press Methods</h2>
        <p class="mb-6">While modern industrial methods prioritize quantity, Cretan producers still use traditional stone mills and cold-press techniques. This gentle process preserves the oil's natural antioxidants, vitamins, and that distinctive peppery finish that olive oil connoisseurs prize so highly.</p>

        <h2 class="text-2xl font-bold mb-4 mt-8">Health Benefits Beyond Compare</h2>
        <p class="mb-6">Studies have consistently shown that Cretan olive oil contains higher levels of polyphenols and antioxidants compared to oils from other regions. These compounds are linked to reduced inflammation, improved heart health, and even longevity – perhaps explaining why Cretans have one of the highest life expectancies in the world.</p>

        <h2 class="text-2xl font-bold mb-4 mt-8">Supporting Local Communities</h2>
        <p class="mb-6">When you choose authentic Cretan olive oil, you're not just getting a superior product – you're supporting small family farms and traditional practices that have sustained local communities for millennia. Every bottle tells a story of dedication, passion, and respect for the land.</p>

        <p class="text-lg mt-8 p-6 bg-primary/10 rounded-lg">Experience the difference that authentic Cretan olive oil can make in your cooking. Visit our products page to discover our selection of premium, cold-pressed oils sourced directly from family groves across the island.</p>
      `
    },
    "wild-herbs": {
      title: "Top 5 Herbs Growing Wild in Crete",
      excerpt: "Discover which herbs thrive naturally on our island and how local families have used them for generations.",
      image: herbsImage,
      date: "March 10, 2024",
      readTime: "8 min read",
      tags: ["Herbs", "Foraging", "Traditional Medicine"],
      content: `
        <p class="text-lg mb-6">Crete's mountains and hillsides are home to over 2,000 plant species, many of which are endemic to the island. For centuries, local families have foraged these wild herbs for cooking, healing, and daily wellness. Here are the top 5 herbs that capture the essence of Cretan nature.</p>

        <h2 class="text-2xl font-bold mb-4 mt-8">1. Mountain Tea (Malotira)</h2>
        <p class="mb-6">Perhaps the most beloved of all Cretan herbs, malotira grows wild on the island's highest peaks. This caffeine-free tea has been the go-to remedy for everything from common colds to digestive issues. With its delicate, honey-like flavor and powerful antioxidant properties, it's no wonder locals call it "the elixir of life."</p>

        <h2 class="text-2xl font-bold mb-4 mt-8">2. Wild Oregano (Rigani)</h2>
        <p class="mb-6">Cretan oregano is significantly more potent than its cultivated cousins, with an intense aroma that can be detected from meters away. Growing in rocky, sun-baked hillsides, this herb develops exceptional concentrations of essential oils. It's not just a culinary treasure – traditional healers have used it for its antimicrobial and anti-inflammatory properties.</p>

        <h2 class="text-2xl font-bold mb-4 mt-8">3. Wild Thyme (Thymari)</h2>
        <p class="mb-6">The thyme that carpets Crete's mountainsides is a sight to behold when it blooms in spring, turning entire hillsides purple. This hardy herb thrives in the island's arid conditions, developing intense flavors and therapeutic compounds. Local honey made from thyme flowers is considered among the world's finest.</p>

        <h2 class="text-2xl font-bold mb-4 mt-8">4. Sage (Faskomilo)</h2>
        <p class="mb-6">Cretan sage grows abundantly in the island's wild spaces, particularly in areas with good drainage and plenty of sunshine. Its silvery leaves and blue flowers are not just beautiful – they're packed with compounds that support cognitive function and overall wellness. Many locals start their day with sage tea for mental clarity.</p>

        <h2 class="text-2xl font-bold mb-4 mt-8">5. Wild Mint (Dyosmos)</h2>
        <p class="mb-6">Found near water sources and in shaded mountain valleys, Cretan wild mint has a more complex flavor profile than garden varieties. Its cooling properties make it perfect for the island's hot summers, and it's traditionally used in both sweet and savory dishes, as well as refreshing teas.</p>

        <h2 class="text-2xl font-bold mb-4 mt-8">Sustainable Foraging Practices</h2>
        <p class="mb-6">Traditional Cretan foragers follow unwritten rules passed down through generations: never take more than one-third of a plant, always leave the roots intact, and rotate harvesting areas to allow regeneration. These practices ensure that wild herb populations remain healthy and abundant.</p>

        <h2 class="text-2xl font-bold mb-4 mt-8">From Mountain to Table</h2>
        <p class="mb-6">The best time to harvest most herbs is early morning after the dew has dried but before the heat of the day. Each herb has its optimal harvesting season – usually when essential oil content is highest. Proper drying and storage techniques preserve both flavor and therapeutic properties for year-round use.</p>

        <p class="text-lg mt-8 p-6 bg-primary/10 rounded-lg">Join us on one of our herb foraging experiences to learn these traditional techniques firsthand, or explore our selection of wild-harvested herbs, each carefully collected by experienced local foragers who know exactly when and where to find the finest specimens.</p>
      `
    },
    "olive-oil-production": {
      title: "The Ancient Art of Olive Oil Production",
      excerpt: "Journey through time as we explore traditional olive oil production methods preserved on Crete for over 4,000 years.",
      image: oliveOilImage,
      date: "March 5, 2024",
      readTime: "10 min read",
      tags: ["Olive Oil", "Production", "History", "Tradition"],
      content: `
        <p class="text-lg mb-6">The olive oil production methods used in Crete today are remarkably similar to those developed by the Minoans over 4,000 years ago. This ancient art form has been preserved not out of stubbornness to change, but because these time-tested methods produce the highest quality oil possible.</p>

        <h2 class="text-2xl font-bold mb-4 mt-8">The Sacred Timing of Harvest</h2>
        <p class="mb-6">In Crete, olive harvest time is almost sacred. Families plan their entire year around the brief window – usually between October and December – when olives reach perfect ripeness. Master olive farmers can tell just by looking at an olive whether it's ready, judging by subtle changes in color, firmness, and even the way light reflects off its skin.</p>

        <h2 class="text-2xl font-bold mb-4 mt-8">Hand-Picking: The Gentle Approach</h2>
        <p class="mb-6">While mechanized harvesting has taken over in many parts of the world, traditional Cretan producers still hand-pick their olives or use gentle wooden combs to coax them from branches. This painstaking process prevents bruising that can lead to oxidation and off-flavors. Each olive is treated like the precious fruit it is.</p>

        <h2 class="text-2xl font-bold mb-4 mt-8">The 24-Hour Rule</h2>
        <p class="mb-6">One of the most crucial aspects of quality olive oil production is speed. Traditional Cretan producers follow the unwritten "24-hour rule" – olives must be pressed within 24 hours of harvest, and preferably within just a few hours. This rapid processing prevents fermentation and oxidation that can dramatically impact flavor and nutritional value.</p>

        <h2 class="text-2xl font-bold mb-4 mt-8">Stone Mills: Ancient Technology, Perfect Results</h2>
        <p class="mb-6">Many Cretan olive mills still use massive stone wheels, some dating back centuries, to crush olives into paste. These granite stones, weighing several tons each, rotate slowly to avoid generating heat that would damage the oil's delicate compounds. The result is a paste with perfectly balanced texture and moisture content.</p>

        <h2 class="text-2xl font-bold mb-4 mt-8">Cold Pressing: Preserving Nature's Gifts</h2>
        <p class="mb-6">The term "cold-pressed" isn't just marketing – it's a commitment to quality. Traditional hydraulic presses apply pressure gradually, allowing oil to seep out naturally without generating heat. This gentle process preserves the oil's natural antioxidants, vitamins, and that distinctive peppery bite that characterizes premium extra virgin olive oil.</p>

        <h2 class="text-2xl font-bold mb-4 mt-8">The Art of Blending</h2>
        <p class="mb-6">Master oil makers often blend oils from different olive varieties or different harvest times to achieve specific flavor profiles. Like wine blending, this requires years of experience and a palate trained to detect subtle differences in taste, aroma, and mouthfeel.</p>

        <h2 class="text-2xl font-bold mb-4 mt-8">Storage: Protecting Liquid Gold</h2>
        <p class="mb-6">Once pressed, olive oil is stored in dark, temperature-controlled environments. Traditional Cretan producers use stainless steel tanks or dark glass containers that protect the oil from light and air – two of its greatest enemies. Proper storage can preserve oil quality for months or even years.</p>

        <h2 class="text-2xl font-bold mb-4 mt-8">Testing and Tasting</h2>
        <p class="mb-6">Every batch of oil is tested for quality markers like acidity level, peroxide value, and sensory characteristics. Experienced tasters can identify everything from the olive variety to the harvest date just by smell and taste. This quality control ensures that only the finest oil reaches consumers.</p>

        <p class="text-lg mt-8 p-6 bg-primary/10 rounded-lg">Visit one of our partner olive mills during harvest season to witness this ancient art firsthand. Our olive oil tasting experiences let you compare oils from different groves and learn to appreciate the subtle differences that make each bottle unique.</p>
      `
    },
    "seasonal-foraging": {
      title: "Seasonal Guide to Cretan Foraging",
      excerpt: "Learn when and where to find the best wild herbs, greens, and edible plants throughout the changing seasons on the island of Crete.",
      image: herbsImage,
      date: "February 28, 2024",
      readTime: "12 min read",
      tags: ["Foraging", "Seasons", "Wild Plants", "Sustainable Harvesting"],
      content: `
        <p class="text-lg mb-6">Crete's diverse microclimates and varied terrain create a year-round bounty of wild edible plants. From coastal salt-resistant herbs to mountain alpine species, each season brings its own treasures for those who know where and when to look. This guide will take you through the foraging calendar that Cretan families have followed for generations.</p>

        <h2 class="text-2xl font-bold mb-4 mt-8">Spring (March - May): The Awakening</h2>
        <p class="mb-6">Spring is perhaps the most exciting time for foragers in Crete. After winter rains, the island erupts in green as hundreds of plant species emerge from dormancy. This is when you'll find the tender young leaves that are prized in traditional Cretan cuisine.</p>
        
        <h3 class="text-xl font-semibold mb-3 mt-6">What to Forage in Spring:</h3>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Wild Greens (Horta):</strong> Dandelion, wild spinach, and lamb's quarters are at their most tender</li>
          <li><strong>Wild Asparagus:</strong> Found in rocky areas and olive groves, best harvested early morning</li>
          <li><strong>Fennel Shoots:</strong> Young, tender stems perfect for salads and traditional pies</li>
          <li><strong>Wild Artichokes:</strong> Smaller than cultivated varieties but intensely flavored</li>
          <li><strong>Capers:</strong> The flower buds should be picked while still tight and green</li>
        </ul>

        <h2 class="text-2xl font-bold mb-4 mt-8">Summer (June - August): The Abundance</h2>
        <p class="mb-6">Summer brings the peak of aromatic herbs as the Mediterranean heat concentrates essential oils in leaves and flowers. Early morning is the best time to harvest, before the day's heat dissipates the valuable compounds.</p>
        
        <h3 class="text-xl font-semibold mb-3 mt-6">What to Forage in Summer:</h3>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Wild Oregano:</strong> At peak potency, harvest before flowering for leaves, or during flowering for oil production</li>
          <li><strong>Thyme:</strong> Best harvested in early summer when flowers are just beginning to open</li>
          <li><strong>Sage:</strong> Silver-leaved varieties are at their most aromatic during hot, dry periods</li>
          <li><strong>Rosemary:</strong> Can be harvested year-round, but summer growth is most fragrant</li>
          <li><strong>Wild Mint:</strong> Found near water sources, best picked in early morning</li>
        </ul>

        <h2 class="text-2xl font-bold mb-4 mt-8">Autumn (September - November): The Harvest</h2>
        <p class="mb-6">Autumn is when Crete's foragers focus on fruits, seeds, and roots. This is also when many herbs develop their highest concentrations of therapeutic compounds as they prepare for winter dormancy.</p>
        
        <h3 class="text-xl font-semibold mb-3 mt-6">What to Forage in Autumn:</h3>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Wild Pistachios:</strong> Small but incredibly flavorful, found in mountainous areas</li>
          <li><strong>Carob Pods:</strong> Sweet pods used traditionally as a sugar substitute</li>
          <li><strong>Wild Pears:</strong> Small, hard pears that are perfect for preserves</li>
          <li><strong>Pine Nuts:</strong> From the large cones of stone pines, labor-intensive but rewarding</li>
          <li><strong>Juniper Berries:</strong> Used for flavoring and traditional medicine</li>
        </ul>

        <h2 class="text-2xl font-bold mb-4 mt-8">Winter (December - February): The Hidden Treasures</h2>
        <p class="mb-6">While winter might seem like a quiet time for foraging, experienced gatherers know that this season offers unique opportunities. Many medicinal plants are at their most potent, and certain hardy greens thrive in the cooler weather.</p>
        
        <h3 class="text-xl font-semibold mb-3 mt-6">What to Forage in Winter:</h3>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Mountain Tea (Malotira):</strong> Best harvested after the first frost when plants are dormant</li>
          <li><strong>Wild Leeks:</strong> Underground bulbs are at their plumpest during winter months</li>
          <li><strong>Mastic Resin:</strong> Collected from mastic trees during winter cutting season</li>
          <li><strong>Wild Mushrooms:</strong> After winter rains, various edible species emerge</li>
          <li><strong>Citrus Fruits:</strong> Wild oranges and lemons ripen throughout winter</li>
        </ul>

        <h2 class="text-2xl font-bold mb-4 mt-8">Foraging Ethics and Sustainability</h2>
        <p class="mb-6">Traditional Cretan foragers follow strict unwritten rules that ensure plant populations remain healthy for future generations:</p>
        
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li>Never harvest more than one-third of any plant</li>
          <li>Always leave the root system intact unless collecting root vegetables</li>
          <li>Rotate harvesting areas to allow regeneration</li>
          <li>Avoid harvesting from roadside areas where plants may be contaminated</li>
          <li>Learn to properly identify plants to avoid toxic look-alikes</li>
          <li>Respect private property and protected areas</li>
        </ul>

        <h2 class="text-2xl font-bold mb-4 mt-8">Reading the Landscape</h2>
        <p class="mb-6">Successful foraging requires understanding how different plants respond to various environmental conditions. North-facing slopes often harbor different species than south-facing ones. Coastal areas support salt-tolerant plants, while mountain regions host alpine species. Learning to read these environmental cues is key to finding the best specimens.</p>

        <h2 class="text-2xl font-bold mb-4 mt-8">Traditional Preparation Methods</h2>
        <p class="mb-6">Once harvested, proper preparation is crucial. Each plant has its own optimal drying, storing, or immediate processing method. Traditional knowledge includes not just what to pick and when, but how to transform wild plants into foods and medicines that can be preserved year-round.</p>

        <p class="text-lg mt-8 p-6 bg-primary/10 rounded-lg">Join our seasonal foraging tours to learn these traditional skills from experienced local guides. We offer different experiences throughout the year, each focused on the plants and techniques specific to that season. You'll return home not just with foraged treasures, but with knowledge that connects you to thousands of years of Cretan tradition.</p>
      `
    }
  };

  const post = slug ? blogPosts[slug] : null;

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const relatedPosts = Object.entries(blogPosts)
    .filter(([key]) => key !== slug)
    .slice(0, 2)
    .map(([key, post]) => ({ slug: key, ...post }));

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative h-[50vh] overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-end">
          <div className="container mx-auto px-4 pb-16">
            <div className="max-w-4xl">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-white/20 text-white">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 text-white/80">
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link to="/blog" className="text-primary hover:text-primary/80 font-medium">
            ← Back to Blog
          </Link>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <article className="prose prose-lg max-w-none">
              <div 
                className="text-muted-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }}
              />
            </article>

            {/* Social Share */}
            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Share this article</h3>
              <div className="flex gap-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Facebook
                </button>
                <button className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors">
                  Twitter
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  WhatsApp
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Related Posts */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-6">Related Articles</h3>
                <div className="space-y-6">
                  {relatedPosts.map((relatedPost) => (
                    <div key={relatedPost.slug}>
                      <Link to={`/blog/${relatedPost.slug}`}>
                        <img 
                          src={relatedPost.image} 
                          alt={relatedPost.title}
                          className="w-full h-32 object-cover rounded-lg mb-3"
                        />
                        <h4 className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h4>
                      </Link>
                      <p className="text-sm text-muted-foreground mt-2">
                        {relatedPost.date}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">Stay Updated</h3>
                <p className="text-muted-foreground mb-4">
                  Get the latest stories about Cretan culture, traditions, and our products delivered to your inbox.
                </p>
                <div className="space-y-3">
                  <input 
                    type="email" 
                    placeholder="Your email address"
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 rounded-lg font-medium transition-colors">
                    Subscribe
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BlogPost;