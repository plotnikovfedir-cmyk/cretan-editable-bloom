import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-8">
              Terms of Service
            </h1>
            
            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Agreement to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using the Cretan Guru website and services, you agree to be bound by these Terms of Service 
                  and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited 
                  from using or accessing our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Products and Services</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>Cretan Guru offers:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Authentic Cretan food products (olive oil, herbs, specialty items)</li>
                    <li>Activity bookings and experiences</li>
                    <li>Transportation services (taxi, delivery)</li>
                    <li>Tours and wine tastings</li>
                    <li>Cultural events and workshops</li>
                  </ul>
                  <p>
                    All product descriptions, pricing, and availability are subject to change without notice. 
                    We strive to provide accurate information but cannot guarantee complete accuracy.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Orders and Payment</h2>
                <div className="text-muted-foreground space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">Order Processing</h3>
                    <p>
                      Orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order 
                      for any reason, including but not limited to product availability, errors in pricing or product information, 
                      or suspected fraudulent activity.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">Payment Terms</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Payment is due at the time of order placement</li>
                      <li>We accept major credit cards and secure payment methods</li>
                      <li>All prices are in Euros unless otherwise specified</li>
                      <li>Prices include applicable taxes where required</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Shipping and Delivery</h2>
                <div className="text-muted-foreground space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">Shipping Policy</h3>
                    <p>
                      We ship products within Crete and internationally where permitted. Shipping costs and delivery times 
                      vary based on destination and shipping method selected. International orders may be subject to 
                      customs duties and taxes.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">Risk of Loss</h3>
                    <p>
                      Risk of loss and title for products pass to you upon delivery to the carrier. We are not responsible 
                      for delays or damages caused by shipping carriers.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Cancellations and Refunds</h2>
                <div className="text-muted-foreground space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">Product Orders</h3>
                    <p>
                      Product orders may be cancelled within 24 hours of placement. Refunds for defective or damaged products 
                      will be processed upon return of the items in their original condition.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">Activity and Service Bookings</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Cancellations made 48+ hours in advance: Full refund</li>
                      <li>Cancellations made 24-48 hours in advance: 50% refund</li>
                      <li>Cancellations made less than 24 hours: No refund</li>
                      <li>Weather-related cancellations: Full refund or rescheduling</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">User Conduct</h2>
                <div className="text-muted-foreground space-y-2">
                  <p>You agree not to:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Use our services for any illegal or unauthorized purpose</li>
                    <li>Interfere with or disrupt our website or servers</li>
                    <li>Attempt to gain unauthorized access to our systems</li>
                    <li>Submit false or misleading information</li>
                    <li>Violate any applicable local, state, national, or international law</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Intellectual Property</h2>
                <p className="text-muted-foreground leading-relaxed">
                  All content on this website, including text, graphics, logos, images, and software, is the property of 
                  Cretan Guru or its content suppliers and is protected by international copyright laws. You may not reproduce, 
                  distribute, or create derivative works from our content without written permission.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To the maximum extent permitted by law, Cretan Guru shall not be liable for any indirect, incidental, 
                  special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly 
                  or indirectly, or any loss of data, use, goodwill, or other intangible losses.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Governing Law</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These terms shall be governed by and construed in accordance with the laws of Greece. Any disputes 
                  arising under these terms shall be subject to the exclusive jurisdiction of the courts of Crete, Greece.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Information</h2>
                <div className="text-muted-foreground space-y-2">
                  <p>For questions about these Terms of Service, please contact us:</p>
                  <ul className="space-y-1">
                    <li>Email: hello@cretan.guru</li>
                    <li>Phone: +49 178 5773846</li>
                    <li>Address: Crete, Greece</li>
                  </ul>
                </div>
              </section>

              <section className="border-t pt-8">
                <p className="text-sm text-muted-foreground">
                  These Terms of Service were last updated on January 13, 2025. We reserve the right to update these terms 
                  at any time, and any changes will be posted on this page.
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

export default TermsOfService;