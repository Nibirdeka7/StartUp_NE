import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, Eye, UserCheck, Database, Mail, Phone, FileText } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';

export default function PrivacyPolicy() {
  const lastUpdated = "December 27, 2024";
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-red-100 to-red-200 mb-6">
            <Shield className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4 font-montserrat">
            Privacy Policy
          </h1>
          <p className="text-lg text-slate-600">
            How we collect, use, and protect your information
          </p>
          <div className="mt-4 text-sm text-slate-500">
            Last updated: {lastUpdated}
          </div>
        </div>

        <div className="space-y-8">
          {/* Quick Links */}
          <Card className="bg-gradient-to-r from-red-50 to-white border-red-200">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <FileText className="w-6 h-6 text-red-600" />
                Quick Navigation
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a href="#data-collection" className="block p-4 bg-white rounded-lg border border-slate-200 hover:border-red-300 hover:shadow-md transition-all">
                  <Database className="w-5 h-5 text-red-600 mb-2" />
                  <h3 className="font-semibold text-slate-900">Data Collection</h3>
                </a>
                <a href="#data-usage" className="block p-4 bg-white rounded-lg border border-slate-200 hover:border-red-300 hover:shadow-md transition-all">
                  <Eye className="w-5 h-5 text-red-600 mb-2" />
                  <h3 className="font-semibold text-slate-900">How We Use Data</h3>
                </a>
                <a href="#your-rights" className="block p-4 bg-white rounded-lg border border-slate-200 hover:border-red-300 hover:shadow-md transition-all">
                  <UserCheck className="w-5 h-5 text-red-600 mb-2" />
                  <h3 className="font-semibold text-slate-900">Your Rights</h3>
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="prose prose-lg max-w-none space-y-8">
            <Card className="border-slate-200">
              <CardContent className="p-8">
                <div className="space-y-8">
                  {/* Introduction */}
                  <section id="introduction">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                      <Lock className="w-6 h-6 text-red-600" />
                      1. Introduction
                    </h2>
                    <p className="text-slate-700">
                      Welcome to Startup Northeast ("we," "our," or "us"). We operate the website 
                      <strong> startupnortheast.com</strong> (the "Service"). This Privacy Policy explains how we collect, use, 
                      disclose, and safeguard your information when you use our Service.
                    </p>
                    <p className="text-slate-700">
                      We are committed to protecting your personal information and your right to privacy. 
                      If you have any questions or concerns about this privacy policy or our practices 
                      with regard to your personal information, please contact us at 
                      <a href="mailto:privacy@startupnortheast.com" className="text-red-600 hover:text-red-700 ml-1">
                        privacy@startupnortheast.com
                      </a>.
                    </p>
                  </section>

                  {/* Information We Collect */}
                  <section id="data-collection">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Information We Collect</h2>
                    
                    <div className="space-y-6">
                      <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                        <h3 className="text-xl font-semibold text-slate-900 mb-3">Personal Information</h3>
                        <p className="text-slate-700 mb-4">When you register or use our Service, we collect:</p>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3">
                            <UserCheck className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                            <span><strong>Account Information:</strong> Name, email address, phone number, profile picture</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <Database className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                            <span><strong>Startup Information:</strong> Company name, description, sector, stage, valuation, team details</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <FileText className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                            <span><strong>Documents:</strong> DPIIT certificates, pitch decks, company logos</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <Mail className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                            <span><strong>Contact Information:</strong> Email addresses, phone numbers, social media links</span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                        <h3 className="text-xl font-semibold text-slate-900 mb-3">Automatically Collected Information</h3>
                        <ul className="space-y-2">
                          <li><strong>Device Information:</strong> IP address, browser type, operating system</li>
                          <li><strong>Usage Data:</strong> Pages visited, time spent, features used</li>
                          <li><strong>Location Data:</strong> Approximate location based on IP address</li>
                          <li><strong>Cookies and Tracking:</strong> See our <Link to="/cookies" className="text-red-600 hover:text-red-700">Cookies Policy</Link></li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  {/* How We Use Your Information */}
                  <section id="data-usage">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">3. How We Use Your Information</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-red-50 to-white p-6 rounded-lg border border-red-100">
                        <h3 className="text-lg font-semibold text-slate-900 mb-3">Service Operation</h3>
                        <ul className="space-y-2 text-slate-700">
                          <li>• Create and manage your account</li>
                          <li>• Process startup applications</li>
                          <li>• Display startup profiles in directory</li>
                          <li>• Send administrative emails</li>
                          <li>• Provide customer support</li>
                        </ul>
                      </div>
                      
                      <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-lg border border-blue-100">
                        <h3 className="text-lg font-semibold text-slate-900 mb-3">Improvement & Communication</h3>
                        <ul className="space-y-2 text-slate-700">
                          <li>• Improve our Service and user experience</li>
                          <li>• Send notifications about your startup status</li>
                          <li>• Share relevant opportunities and events</li>
                          <li>• Conduct research and analysis</li>
                          <li>• Prevent fraud and ensure security</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  {/* Data Sharing */}
                  <section id="data-sharing">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Data Sharing and Disclosure</h2>
                    <p className="text-slate-700 mb-4">
                      We <strong>do not sell</strong> your personal information. We may share your information only in these circumstances:
                    </p>
                    
                    <div className="space-y-4">
                      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <h3 className="font-semibold text-yellow-800 mb-2">With Your Consent</h3>
                        <p className="text-yellow-700">When you choose to make your startup profile public</p>
                      </div>
                      
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h3 className="font-semibold text-blue-800 mb-2">Service Providers</h3>
                        <p className="text-blue-700">Trusted third parties who assist in operating our Service (email services, hosting, analytics)</p>
                      </div>
                      
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <h3 className="font-semibold text-green-800 mb-2">Legal Requirements</h3>
                        <p className="text-green-700">When required by law or to protect our legal rights</p>
                      </div>
                      
                      <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                        <h3 className="font-semibold text-purple-800 mb-2">Business Transfers</h3>
                        <p className="text-purple-700">In connection with a merger, acquisition, or sale of assets</p>
                      </div>
                    </div>
                  </section>

                  {/* Data Security */}
                  <section id="data-security">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Data Security</h2>
                    <div className="bg-gradient-to-r from-green-50 to-white p-6 rounded-lg border border-green-200">
                      <div className="flex items-start gap-4">
                        <Shield className="w-12 h-12 text-green-600 flex-shrink-0" />
                        <div>
                          <p className="text-slate-700 mb-3">
                            We implement appropriate technical and organizational security measures to protect 
                            your personal information. However, no method of transmission over the Internet or 
                            electronic storage is 100% secure.
                          </p>
                          <ul className="space-y-2 text-slate-700">
                            <li>• Encryption of data in transit (SSL/TLS)</li>
                            <li>• Secure password hashing</li>
                            <li>• Regular security audits</li>
                            <li>• Access controls and authentication</li>
                            <li>• Secure data backup procedures</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Your Rights */}
                  <section id="your-rights">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Your Privacy Rights</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="p-4 bg-white border border-slate-200 rounded-lg hover:border-red-300 transition-colors">
                          <h3 className="font-semibold text-slate-900 mb-2">Access & Correction</h3>
                          <p className="text-slate-700 text-sm">
                            Access your personal data and correct inaccurate information
                          </p>
                        </div>
                        
                        <div className="p-4 bg-white border border-slate-200 rounded-lg hover:border-red-300 transition-colors">
                          <h3 className="font-semibold text-slate-900 mb-2">Data Portability</h3>
                          <p className="text-slate-700 text-sm">
                            Request a copy of your data in a structured, machine-readable format
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="p-4 bg-white border border-slate-200 rounded-lg hover:border-red-300 transition-colors">
                          <h3 className="font-semibold text-slate-900 mb-2">Deletion</h3>
                          <p className="text-slate-700 text-sm">
                            Request deletion of your personal data under certain conditions
                          </p>
                        </div>
                        
                        <div className="p-4 bg-white border border-slate-200 rounded-lg hover:border-red-300 transition-colors">
                          <h3 className="font-semibold text-slate-900 mb-2">Opt-Out</h3>
                          <p className="text-slate-700 text-sm">
                            Opt-out of marketing communications and certain data processing
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-6 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-slate-700">
                        To exercise any of these rights, please contact us at{' '}
                        <a href="mailto:privacy@startupnortheast.com" className="text-red-600 hover:text-red-700 font-semibold">
                          privacy@startupnortheast.com
                        </a>
                      </p>
                    </div>
                  </section>

                  {/* Contact Information */}
                  <section id="contact">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Contact Us</h2>
                    <div className="bg-gradient-to-r from-slate-50 to-white p-6 rounded-lg border border-slate-200">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold text-slate-900 mb-2">Data Protection Officer</h3>
                          <p className="text-slate-700">Startup Northeast Privacy Team</p>
                        </div>
                        
                        <div>
                          <h3 className="font-semibold text-slate-900 mb-2">Email</h3>
                          <a href="mailto:privacy@startupnortheast.com" className="text-red-600 hover:text-red-700">
                            privacy@startupnortheast.com
                          </a>
                        </div>
                        
                        <div>
                          <h3 className="font-semibold text-slate-900 mb-2">Address</h3>
                          <p className="text-slate-700">
                            Startup Northeast<br />
                            Guwahati, Assam, India<br />
                            PIN: 781001
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Changes to Policy */}
                  <section id="changes">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Changes to This Privacy Policy</h2>
                    <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-slate-700">
                        We may update this Privacy Policy from time to time. We will notify you of any changes 
                        by posting the new Privacy Policy on this page and updating the "Last updated" date.
                      </p>
                      <p className="text-slate-700 mt-3">
                        You are advised to review this Privacy Policy periodically for any changes. 
                        Changes to this Privacy Policy are effective when they are posted on this page.
                      </p>
                    </div>
                  </section>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Footer Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-8 border-t border-slate-200">
            <div className="text-sm text-slate-600">
              Need help? Contact our privacy team
            </div>
            <div className="flex gap-4">
              <Button variant="outline" asChild>
                <Link to="/terms">Terms of Service</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/cookies">Cookies Policy</Link>
              </Button>
              <Button className="bg-gradient-to-r from-red-600 to-red-800" asChild>
                <a href="mailto:privacy@startupnortheast.com">Contact Privacy Team</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}