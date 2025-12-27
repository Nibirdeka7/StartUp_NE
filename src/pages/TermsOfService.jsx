import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Scale, AlertTriangle, CheckCircle, XCircle, User, Building, Globe, Shield, Mail } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';

export default function TermsOfService() {
  const effectiveDate = "December 27, 2024";
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 mb-6">
            <Scale className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4 font-montserrat">
            Terms of Service
          </h1>
          <p className="text-lg text-slate-600">
            Legal agreement between you and Startup Northeast
          </p>
          <div className="mt-4 text-sm text-slate-500">
            Effective Date: {effectiveDate}
          </div>
        </div>

        <div className="space-y-8">
          {/* Important Notice */}
          <Card className="bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-8 h-8 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-yellow-800 mb-2">Important Notice</h2>
                  <p className="text-yellow-700">
                    By accessing or using Startup Northeast, you agree to be bound by these Terms of Service. 
                    Please read them carefully. If you do not agree, you may not use our services.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Summary */}
          <Card className="border-slate-200">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Quick Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-medium">You can:</span>
                  </div>
                  <ul className="space-y-2 text-slate-700 pl-8">
                    <li>• List your startup for free</li>
                    <li>• Connect with investors</li>
                    <li>• Access resources and events</li>
                    <li>• Update your profile anytime</li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <XCircle className="w-5 h-5 text-red-600" />
                    <span className="font-medium">You cannot:</span>
                  </div>
                  <ul className="space-y-2 text-slate-700 pl-8">
                    <li>• Post false or misleading information</li>
                    <li>• Violate others' intellectual property</li>
                    <li>• Spam or harass other users</li>
                    <li>• Use the service for illegal purposes</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="prose prose-lg max-w-none">
            <Card className="border-slate-200">
              <CardContent className="p-8">
                <div className="space-y-10">
                  {/* 1. Agreement to Terms */}
                  <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                      <FileText className="w-6 h-6 text-blue-600" />
                      1. Agreement to Terms
                    </h2>
                    <p className="text-slate-700">
                      These Terms of Service constitute a legally binding agreement made between you, 
                      whether personally or on behalf of an entity ("you") and Startup Northeast ("we," "us," or "our"), 
                      concerning your access to and use of the startupnortheast.com website as well as any 
                      related applications (the "Site").
                    </p>
                    <p className="text-slate-700">
                      You agree that by accessing the Site, you have read, understood, and agree to be 
                      bound by all of these Terms of Service. If you do not agree with all of these 
                      Terms of Service, then you are expressly prohibited from using the Site and you 
                      must discontinue use immediately.
                    </p>
                  </section>

                  {/* 2. User Representations */}
                  <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">2. User Representations</h2>
                    <p className="text-slate-700 mb-4">
                      By using the Site, you represent and warrant that:
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                        <User className="w-5 h-5 text-slate-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-slate-900 mb-1">Age Requirement</h3>
                          <p className="text-slate-700">
                            You are at least 18 years of age and have the legal capacity to enter into these Terms
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                        <Building className="w-5 h-5 text-slate-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-slate-900 mb-1">Startup Information</h3>
                          <p className="text-slate-700">
                            All information provided about your startup is accurate, truthful, and not misleading
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                        <Shield className="w-5 h-5 text-slate-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-slate-900 mb-1">Legal Compliance</h3>
                          <p className="text-slate-700">
                            You will not use the Site for any illegal or unauthorized purpose
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* 3. Startup Listings */}
                  <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Startup Listings</h2>
                    <div className="space-y-6">
                      <div className="p-6 bg-gradient-to-r from-green-50 to-white rounded-lg border border-green-200">
                        <h3 className="text-xl font-semibold text-slate-900 mb-3">Approval Process</h3>
                        <p className="text-slate-700 mb-3">
                          All startup submissions undergo review by our team. We reserve the right to:
                        </p>
                        <ul className="space-y-2 text-slate-700">
                          <li>• Approve or reject any startup application at our sole discretion</li>
                          <li>• Request additional information or documentation</li>
                          <li>• Remove listings that violate our guidelines</li>
                          <li>• Feature selected startups in promotional materials</li>
                        </ul>
                      </div>
                      
                      <div className="p-6 bg-gradient-to-r from-red-50 to-white rounded-lg border border-red-200">
                        <h3 className="text-xl font-semibold text-slate-900 mb-3">Content Guidelines</h3>
                        <p className="text-slate-700 mb-3">Your startup listing must not contain:</p>
                        <ul className="space-y-2 text-slate-700">
                          <li>• False, misleading, or deceptive information</li>
                          <li>• Content that infringes on intellectual property rights</li>
                          <li>• Hate speech, harassment, or discriminatory content</li>
                          <li>• Illegal or prohibited business activities</li>
                          <li>• Spam or promotional content unrelated to your startup</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  {/* 4. Intellectual Property */}
                  <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Intellectual Property Rights</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 bg-white border border-slate-200 rounded-lg">
                        <h3 className="font-semibold text-slate-900 mb-3">Our Intellectual Property</h3>
                        <p className="text-slate-700 text-sm">
                          The Site and its original content, features, and functionality are owned by 
                          Startup Northeast and are protected by international copyright, trademark, 
                          patent, trade secret, and other intellectual property laws.
                        </p>
                      </div>
                      
                      <div className="p-6 bg-white border border-slate-200 rounded-lg">
                        <h3 className="font-semibold text-slate-900 mb-3">Your Content</h3>
                        <p className="text-slate-700 text-sm">
                          You retain ownership of all content you submit to the Site. By submitting content, 
                          you grant us a worldwide, non-exclusive, royalty-free license to use, display, 
                          and distribute your content for the purpose of operating the Site.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* 5. User Data and Privacy */}
                  <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">5. User Data and Privacy</h2>
                    <div className="p-6 bg-gradient-to-r from-blue-50 to-white rounded-lg border border-blue-200">
                      <div className="flex items-start gap-4">
                        <Shield className="w-12 h-12 text-blue-600 flex-shrink-0" />
                        <div>
                          <p className="text-slate-700 mb-4">
                            We care about data privacy and security. Please review our{' '}
                            <Link to="/privacy" className="text-blue-600 hover:text-blue-700 font-semibold">
                              Privacy Policy
                            </Link>
                            . By using the Site, you agree to be bound by our Privacy Policy, which is 
                            incorporated into these Terms of Service.
                          </p>
                          <p className="text-slate-700">
                            You are responsible for maintaining the confidentiality of your login information 
                            and are fully responsible for all activities that occur under your account.
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* 6. Prohibited Activities */}
                  <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Prohibited Activities</h2>
                    <div className="p-6 bg-gradient-to-r from-red-50 to-white rounded-lg border border-red-200">
                      <p className="text-slate-700 mb-4">
                        You may not access or use the Site for any purpose other than that for which we 
                        make the Site available. The Site may not be used in connection with any 
                        commercial endeavors except those that are specifically endorsed or approved by us.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-semibold text-red-800 mb-2">As a user, you agree not to:</h3>
                          <ul className="space-y-2 text-slate-700">
                            <li>• Systematically retrieve data from the Site</li>
                            <li>• Trick, defraud, or mislead us or other users</li>
                            <li>• Circumvent, disable, or interfere with security features</li>
                            <li>• Disparage, tarnish, or otherwise harm us or the Site</li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-semibold text-red-800 mb-2">Specifically prohibited:</h3>
                          <ul className="space-y-2 text-slate-700">
                            <li>• Uploading viruses or malicious code</li>
                            <li>• Using automated systems to access the Site</li>
                            <li>• Collecting users' information without consent</li>
                            <li>• Interfering with the Site's functionality</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* 7. Third-Party Websites and Content */}
                  <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Third-Party Websites and Content</h2>
                    <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-lg">
                      <Globe className="w-8 h-8 text-slate-600 flex-shrink-0" />
                      <div>
                        <p className="text-slate-700">
                          The Site may contain links to third-party websites or services that are not 
                          owned or controlled by Startup Northeast. We have no control over, and assume 
                          no responsibility for, the content, privacy policies, or practices of any 
                          third-party websites or services.
                        </p>
                        <p className="text-slate-700 mt-3">
                          You acknowledge and agree that Startup Northeast shall not be responsible or 
                          liable, directly or indirectly, for any damage or loss caused or alleged to be 
                          caused by or in connection with use of or reliance on any such content, goods, 
                          or services available on or through any such websites or services.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* 8. Modifications and Interruptions */}
                  <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Modifications and Interruptions</h2>
                    <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-slate-700 mb-3">
                        We reserve the right to change, modify, or remove the contents of the Site at 
                        any time or for any reason at our sole discretion without notice. However, we 
                        have no obligation to update any information on our Site.
                      </p>
                      <p className="text-slate-700">
                        We cannot guarantee the Site will be available at all times. We may experience 
                        hardware, software, or other problems or need to perform maintenance related to 
                        the Site, resulting in interruptions, delays, or errors.
                      </p>
                    </div>
                  </section>

                  {/* 9. Governing Law */}
                  <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Governing Law</h2>
                    <div className="p-6 bg-white border border-slate-200 rounded-lg">
                      <p className="text-slate-700">
                        These Terms shall be governed by and defined following the laws of India. 
                        Startup Northeast and yourself irrevocably consent that the courts of Guwahati, 
                        Assam shall have exclusive jurisdiction to resolve any dispute which may arise 
                        in connection with these terms.
                      </p>
                    </div>
                  </section>

                  {/* 10. Contact Information */}
                  <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Contact Information</h2>
                    <div className="p-6 bg-gradient-to-r from-slate-50 to-white rounded-lg border border-slate-200">
                      <div className="flex items-start gap-4">
                        <Mail className="w-8 h-8 text-slate-600 flex-shrink-0" />
                        <div>
                          <p className="text-slate-700 mb-2">
                            For any questions or concerns regarding these Terms of Service, please contact us at:
                          </p>
                          <div className="space-y-2">
                            <p className="font-semibold text-slate-900">Email: <a href="mailto:legal@startupnortheast.com" className="text-blue-600 hover:text-blue-700">legal@startupnortheast.com</a></p>
                            <p className="font-semibold text-slate-900">Address: Guwahati, Assam, India - 781001</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Acceptance Section */}
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Acceptance of Terms</h2>
                <p className="text-slate-700 mb-6">
                  By using Startup Northeast, you acknowledge that you have read, understood, 
                  and agree to be bound by these Terms of Service.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-gradient-to-r from-green-600 to-green-800">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    I Understand and Accept
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/">Back to Home</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}