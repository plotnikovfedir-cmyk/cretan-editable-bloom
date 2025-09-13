import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-8">
              Privacy Policy
            </h1>
            
            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Introduction</h2>
                <p className="text-muted-foreground leading-relaxed">
                  At Cretan Guru, we are committed to protecting your privacy and ensuring the security of your personal information. 
                  This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website or use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Information We Collect</h2>
                <div className="space-y-4 text-muted-foreground">
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">Personal Information</h3>
                    <p>We may collect personal information you provide directly, including:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Name and contact information (email, phone number)</li>
                      <li>Shipping and billing addresses</li>
                      <li>Payment information (processed securely through third-party providers)</li>
                      <li>Account credentials and preferences</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">Usage Information</h3>
                    <p>We automatically collect certain information about your use of our website:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>IP address and browser type</li>
                      <li>Pages visited and time spent on our site</li>
                      <li>Referring website and search terms used</li>
                      <li>Device information and operating system</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">How We Use Your Information</h2>
                <div className="text-muted-foreground space-y-2">
                  <p>We use your information for the following purposes:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Processing orders and delivering products and services</li>
                    <li>Communicating with you about your orders and account</li>
                    <li>Improving our website and customer experience</li>
                    <li>Sending marketing communications (with your consent)</li>
                    <li>Preventing fraud and ensuring website security</li>
                    <li>Complying with legal obligations</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Information Sharing</h2>
                <div className="text-muted-foreground space-y-4">
                  <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>With service providers who assist in our operations (payment processors, shipping companies)</li>
                    <li>When required by law or to protect our legal rights</li>
                    <li>In connection with a business transfer or merger</li>
                    <li>With your explicit consent</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement appropriate security measures to protect your personal information against unauthorized access, 
                  alteration, disclosure, or destruction. This includes encryption, secure servers, and regular security assessments.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Your Rights</h2>
                <div className="text-muted-foreground space-y-2">
                  <p>You have the right to:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Access, update, or delete your personal information</li>
                    <li>Opt-out of marketing communications</li>
                    <li>Request data portability</li>
                    <li>Withdraw consent for data processing</li>
                    <li>File a complaint with relevant authorities</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Cookies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, 
                  and personalize content. You can manage your cookie preferences through your browser settings.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
                <div className="text-muted-foreground space-y-2">
                  <p>If you have questions about this Privacy Policy or our data practices, please contact us:</p>
                  <ul className="space-y-1">
                    <li>Email: hello@cretan.guru</li>
                    <li>Phone: +49 178 5773846</li>
                    <li>Address: Crete, Greece</li>
                  </ul>
                </div>
              </section>

              <section className="border-t pt-8">
                <p className="text-sm text-muted-foreground">
                  This Privacy Policy was last updated on January 13, 2025. We may update this policy from time to time, 
                  and any changes will be posted on this page.
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

export default PrivacyPolicy;