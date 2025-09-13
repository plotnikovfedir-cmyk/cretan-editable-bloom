import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const CookiePolicy = () => {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-8">
              Cookie Policy
            </h1>
            
            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">What Are Cookies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Cookies are small text files that are placed on your device when you visit our website. They help us provide 
                  you with a better browsing experience by remembering your preferences and analyzing how you use our site.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Types of Cookies We Use</h2>
                <div className="space-y-6 text-muted-foreground">
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-3">Essential Cookies</h3>
                    <p className="mb-2">These cookies are necessary for our website to function properly and cannot be disabled:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Session cookies for shopping cart functionality</li>
                      <li>Authentication cookies for user login</li>
                      <li>Security cookies for fraud prevention</li>
                      <li>Load balancing cookies for site performance</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-3">Analytics Cookies</h3>
                    <p className="mb-2">These cookies help us understand how visitors interact with our website:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Google Analytics for traffic analysis</li>
                      <li>Page view tracking and user behavior</li>
                      <li>Site performance monitoring</li>
                      <li>Error tracking and debugging</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-3">Functional Cookies</h3>
                    <p className="mb-2">These cookies enhance your browsing experience:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Language and region preferences</li>
                      <li>Theme selection (dark/light mode)</li>
                      <li>Recently viewed products</li>
                      <li>Customized content and recommendations</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-3">Marketing Cookies</h3>
                    <p className="mb-2">These cookies are used to deliver personalized advertisements:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Social media integration cookies</li>
                      <li>Advertising network cookies</li>
                      <li>Retargeting and remarketing cookies</li>
                      <li>Conversion tracking cookies</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Third-Party Cookies</h2>
                <div className="text-muted-foreground space-y-4">
                  <p>We may use third-party services that place cookies on your device:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Google Analytics:</strong> Web analytics service to analyze website traffic and user behavior</li>
                    <li><strong>Facebook Pixel:</strong> Advertising tool for measuring ad effectiveness and targeting</li>
                    <li><strong>Instagram Integration:</strong> Displaying Instagram content and enabling social sharing</li>
                    <li><strong>Payment Processors:</strong> Secure payment processing for transactions</li>
                    <li><strong>Shipping Partners:</strong> Tracking and logistics functionality</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Cookie Duration</h2>
                <div className="text-muted-foreground space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">Session Cookies</h3>
                    <p>These cookies are temporary and are deleted when you close your browser. They are used for essential site functionality.</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">Persistent Cookies</h3>
                    <p>These cookies remain on your device for a set period or until you delete them. They help us remember your preferences between visits.</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Managing Your Cookie Preferences</h2>
                <div className="text-muted-foreground space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">Browser Settings</h3>
                    <p>You can control cookies through your browser settings:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Block all cookies or specific types</li>
                      <li>Delete existing cookies</li>
                      <li>Set preferences for future cookie handling</li>
                      <li>Receive notifications before cookies are stored</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">Opt-Out Links</h3>
                    <p>You can opt out of certain third-party cookies:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Google Analytics: <a href="https://tools.google.com/dlpage/gaoptout" className="text-primary hover:underline">Google Analytics Opt-out</a></li>
                      <li>Facebook: Adjust your ad preferences in Facebook settings</li>
                      <li>General advertising: <a href="http://www.aboutads.info/choices/" className="text-primary hover:underline">AdChoices</a></li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Impact of Disabling Cookies</h2>
                <div className="text-muted-foreground space-y-2">
                  <p>Disabling certain cookies may affect your experience on our website:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Shopping cart functionality may not work properly</li>
                    <li>User preferences will not be saved</li>
                    <li>Some features may become unavailable</li>
                    <li>Personalized content and recommendations will be limited</li>
                    <li>Site performance tracking will be affected</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Cookie Consent</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By continuing to use our website, you consent to our use of cookies as described in this policy. 
                  You can withdraw your consent at any time by adjusting your browser settings or contacting us directly.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Updates to This Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Cookie Policy from time to time to reflect changes in our practices or for legal reasons. 
                  We encourage you to review this policy periodically for any changes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
                <div className="text-muted-foreground space-y-2">
                  <p>If you have questions about our use of cookies or this policy, please contact us:</p>
                  <ul className="space-y-1">
                    <li>Email: hello@cretan.guru</li>
                    <li>Phone: +49 178 5773846</li>
                    <li>Address: Crete, Greece</li>
                  </ul>
                </div>
              </section>

              <section className="border-t pt-8">
                <p className="text-sm text-muted-foreground">
                  This Cookie Policy was last updated on January 13, 2025.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CookiePolicy;