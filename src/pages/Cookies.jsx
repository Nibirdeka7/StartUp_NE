import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, Settings, Eye, Shield, CheckCircle, XCircle, Info, Clock, Database, User } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';

export default function CookiesPolicy() {
  const [cookiesEnabled, setCookiesEnabled] = useState({
    necessary: true,
    analytics: true,
    functional: true,
    marketing: false
  });

  const handleCookieToggle = (type) => {
    setCookiesEnabled(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const savePreferences = () => {
    localStorage.setItem('cookiePreferences', JSON.stringify(cookiesEnabled));
    alert('Cookie preferences saved!');
  };

  const resetPreferences = () => {
    setCookiesEnabled({
      necessary: true,
      analytics: true,
      functional: true,
      marketing: false
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-purple-100 to-purple-200 mb-6">
            <Cookie className="w-10 h-10 text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4 font-montserrat">
            Cookies Policy
          </h1>
          <p className="text-lg text-slate-600">
            How we use cookies and similar technologies
          </p>
          <div className="mt-4 text-sm text-slate-500">
            Last updated: December 27, 2024
          </div>
        </div>

        <div className="space-y-8">
          {/* Cookie Control Center */}
          <Card className="border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Settings className="w-6 h-6 text-purple-600" />
                  <h2 className="text-xl font-bold text-slate-900">Cookie Preferences</h2>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" onClick={resetPreferences}>
                    Reset
                  </Button>
                  <Button size="sm" onClick={savePreferences} className="bg-gradient-to-r from-purple-600 to-purple-800">
                    Save Preferences
                  </Button>
                </div>
              </div>

              <div className="space-y-6">
                {/* Necessary Cookies */}
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-white rounded-lg border border-red-200">
                  <div className="flex items-center gap-4">
                    <Shield className="w-8 h-8 text-red-600" />
                    <div>
                      <h3 className="font-semibold text-slate-900">Strictly Necessary Cookies</h3>
                      <p className="text-sm text-slate-600">Required for the website to function</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-red-600">Always Active</span>
                    <div className="relative">
                      <Switch checked={true} disabled className="data-[state=checked]:bg-red-600" />
                    </div>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-white rounded-lg border border-blue-200">
                  <div className="flex items-center gap-4">
                    <Eye className="w-8 h-8 text-blue-600" />
                    <div>
                      <h3 className="font-semibold text-slate-900">Analytics Cookies</h3>
                      <p className="text-sm text-slate-600">Help us understand how visitors use our site</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-medium ${cookiesEnabled.analytics ? 'text-green-600' : 'text-slate-500'}`}>
                      {cookiesEnabled.analytics ? 'Active' : 'Inactive'}
                    </span>
                    <Switch 
                      checked={cookiesEnabled.analytics} 
                      onCheckedChange={() => handleCookieToggle('analytics')}
                      className="data-[state=checked]:bg-blue-600"
                    />
                  </div>
                </div>

                {/* Functional Cookies */}
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-white rounded-lg border border-green-200">
                  <div className="flex items-center gap-4">
                    <User className="w-8 h-8 text-green-600" />
                    <div>
                      <h3 className="font-semibold text-slate-900">Functional Cookies</h3>
                      <p className="text-sm text-slate-600">Remember your preferences and settings</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-medium ${cookiesEnabled.functional ? 'text-green-600' : 'text-slate-500'}`}>
                      {cookiesEnabled.functional ? 'Active' : 'Inactive'}
                    </span>
                    <Switch 
                      checked={cookiesEnabled.functional} 
                      onCheckedChange={() => handleCookieToggle('functional')}
                      className="data-[state=checked]:bg-green-600"
                    />
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-white rounded-lg border border-yellow-200">
                  <div className="flex items-center gap-4">
                    <Info className="w-8 h-8 text-yellow-600" />
                    <div>
                      <h3 className="font-semibold text-slate-900">Marketing Cookies</h3>
                      <p className="text-sm text-slate-600">Track your browsing for targeted advertising</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-medium ${cookiesEnabled.marketing ? 'text-green-600' : 'text-slate-500'}`}>
                      {cookiesEnabled.marketing ? 'Active' : 'Inactive'}
                    </span>
                    <Switch 
                      checked={cookiesEnabled.marketing} 
                      onCheckedChange={() => handleCookieToggle('marketing')}
                      className="data-[state=checked]:bg-yellow-600"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="prose prose-lg max-w-none">
            <Card className="border-slate-200">
              <CardContent className="p-8">
                <div className="space-y-10">
                  {/* 1. What Are Cookies */}
                  <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">1. What Are Cookies?</h2>
                    <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-lg">
                      <Cookie className="w-8 h-8 text-slate-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-slate-700 mb-3">
                          Cookies are small text files that are placed on your computer or mobile device 
                          when you visit our website. They are widely used to make websites work more 
                          efficiently and provide information to the owners of the site.
                        </p>
                        <p className="text-slate-700">
                          Cookies do lots of different jobs, like letting you navigate between pages 
                          efficiently, remembering your preferences, and generally improving your 
                          browsing experience.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* 2. How We Use Cookies */}
                  <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">2. How We Use Cookies</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-6">
                        <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-lg border border-blue-200">
                          <div className="flex items-center gap-3 mb-3">
                            <Database className="w-6 h-6 text-blue-600" />
                            <h3 className="font-semibold text-slate-900">Essential Cookies</h3>
                          </div>
                          <ul className="space-y-2 text-slate-700 text-sm">
                            <li>• User authentication and security</li>
                            <li>• Remembering login sessions</li>
                            <li>• Load balancing and site performance</li>
                            <li>• Preventing fraudulent activity</li>
                          </ul>
                        </div>
                        
                        <div className="p-6 bg-gradient-to-br from-green-50 to-white rounded-lg border border-green-200">
                          <div className="flex items-center gap-3 mb-3">
                            <User className="w-6 h-6 text-green-600" />
                            <h3 className="font-semibold text-slate-900">Preference Cookies</h3>
                          </div>
                          <ul className="space-y-2 text-slate-700 text-sm">
                            <li>• Remembering your language preferences</li>
                            <li>• Storing your region settings</li>
                            <li>• Customizing content display</li>
                            <li>• Saving form data temporarily</li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        <div className="p-6 bg-gradient-to-br from-purple-50 to-white rounded-lg border border-purple-200">
                          <div className="flex items-center gap-3 mb-3">
                            <Eye className="w-6 h-6 text-purple-600" />
                            <h3 className="font-semibold text-slate-900">Analytics Cookies</h3>
                          </div>
                          <ul className="space-y-2 text-slate-700 text-sm">
                            <li>• Tracking website traffic</li>
                            <li>• Understanding user behavior</li>
                            <li>• Improving website functionality</li>
                            <li>• Measuring campaign effectiveness</li>
                          </ul>
                        </div>
                        
                        <div className="p-6 bg-gradient-to-br from-yellow-50 to-white rounded-lg border border-yellow-200">
                          <div className="flex items-center gap-3 mb-3">
                            <Info className="w-6 h-6 text-yellow-600" />
                            <h3 className="font-semibold text-slate-900">Marketing Cookies</h3>
                          </div>
                          <ul className="space-y-2 text-slate-700 text-sm">
                            <li>• Delivering relevant advertisements</li>
                            <li>• Measuring ad campaign performance</li>
                            <li>• Understanding user interests</li>
                            <li>• Retargeting campaigns</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* 3. Cookie Duration */}
                  <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Cookie Duration</h2>
                    <div className="p-6 bg-gradient-to-r from-slate-50 to-white rounded-lg border border-slate-200">
                      <div className="flex items-start gap-4">
                        <Clock className="w-8 h-8 text-slate-600 flex-shrink-0" />
                        <div>
                          <p className="text-slate-700 mb-4">
                            Cookies can remain on your device for different periods of time:
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="text-center p-4 bg-white rounded-lg border border-slate-200">
                              <div className="text-2xl font-bold text-red-600 mb-2">Session</div>
                              <p className="text-sm text-slate-600">Deleted when you close browser</p>
                            </div>
                            <div className="text-center p-4 bg-white rounded-lg border border-slate-200">
                              <div className="text-2xl font-bold text-blue-600 mb-2">Persistent</div>
                              <p className="text-sm text-slate-600">Remain for set period (days/months)</p>
                            </div>
                            <div className="text-center p-4 bg-white rounded-lg border border-slate-200">
                              <div className="text-2xl font-bold text-green-600 mb-2">Permanent</div>
                              <p className="text-sm text-slate-600">Remain until manually deleted</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* 4. Third-Party Cookies */}
                  <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Third-Party Cookies</h2>
                    <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-slate-700 mb-4">
                        We may also use various third-party cookies to report usage statistics of 
                        the Service, deliver advertisements on and through the Service, and so on.
                      </p>
                      
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-200">
                          <thead>
                            <tr>
                              <th className="px-4 py-3 bg-slate-100 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Service</th>
                              <th className="px-4 py-3 bg-slate-100 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Purpose</th>
                              <th className="px-4 py-3 bg-slate-100 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Privacy Policy</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-slate-200">
                            <tr>
                              <td className="px-4 py-3 text-sm text-slate-900">Google Analytics</td>
                              <td className="px-4 py-3 text-sm text-slate-700">Website analytics and usage tracking</td>
                              <td className="px-4 py-3 text-sm">
                                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                                  View Policy
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 text-sm text-slate-900">Supabase</td>
                              <td className="px-4 py-3 text-sm text-slate-700">Authentication and database services</td>
                              <td className="px-4 py-3 text-sm">
                                <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                                  View Policy
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 text-sm text-slate-900">EmailJS</td>
                              <td className="px-4 py-3 text-sm text-slate-700">Email notification services</td>
                              <td className="px-4 py-3 text-sm">
                                <a href="https://www.emailjs.com/legal/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                                  View Policy
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </section>

                  {/* 5. Managing Cookies */}
                  <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Managing Cookies</h2>
                    
                    <div className="space-y-6">
                      <div className="p-6 bg-gradient-to-r from-green-50 to-white rounded-lg border border-green-200">
                        <h3 className="text-xl font-semibold text-slate-900 mb-4">Browser Settings</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="text-center">
                            <div className="font-bold text-slate-900 mb-2">Chrome</div>
                            <p className="text-sm text-slate-600">Settings → Privacy and Security → Cookies</p>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-slate-900 mb-2">Firefox</div>
                            <p className="text-sm text-slate-600">Options → Privacy & Security → Cookies</p>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-slate-900 mb-2">Safari</div>
                            <p className="text-sm text-slate-600">Preferences → Privacy → Cookies</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-6 bg-gradient-to-r from-blue-50 to-white rounded-lg border border-blue-200">
                        <h3 className="text-xl font-semibold text-slate-900 mb-3">Opt-Out Tools</h3>
                        <p className="text-slate-700 mb-3">
                          You can opt out of certain types of cookies using these tools:
                        </p>
                        <ul className="space-y-2 text-slate-700">
                          <li>
                            • <strong>Google Analytics:</strong>{' '}
                            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                              Google Analytics Opt-out Browser Add-on
                            </a>
                          </li>
                          <li>
                            • <strong>Network Advertising Initiative:</strong>{' '}
                            <a href="http://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                              NAI Consumer Opt-Out
                            </a>
                          </li>
                          <li>
                            • <strong>Digital Advertising Alliance:</strong>{' '}
                            <a href="http://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                              DAA Consumer Choice
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  {/* 6. Your Choices */}
                  <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Your Choices</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 bg-white border border-green-200 rounded-lg">
                        <div className="flex items-center gap-3 mb-3">
                          <CheckCircle className="w-6 h-6 text-green-600" />
                          <h3 className="font-semibold text-slate-900">Accept All Cookies</h3>
                        </div>
                        <p className="text-slate-700 text-sm">
                          By continuing to use our website without changing your settings, you consent 
                          to our use of cookies as described in this policy.
                        </p>
                      </div>
                      
                      <div className="p-6 bg-white border border-red-200 rounded-lg">
                        <div className="flex items-center gap-3 mb-3">
                          <XCircle className="w-6 h-6 text-red-600" />
                          <h3 className="font-semibold text-slate-900">Reject All Cookies</h3>
                        </div>
                        <p className="text-slate-700 text-sm">
                          You can set your browser to refuse all cookies. However, some features of 
                          our website may not function properly without cookies.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* 7. Updates to This Policy */}
                  <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Updates to This Policy</h2>
                    <div className="p-6 bg-gradient-to-r from-purple-50 to-white rounded-lg border border-purple-200">
                      <p className="text-slate-700">
                        We may update this Cookies Policy from time to time to reflect changes in our 
                        practices or for other operational, legal, or regulatory reasons. We will post 
                        any updates on this page with a new "Last updated" date.
                      </p>
                      <p className="text-slate-700 mt-3">
                        We encourage you to review this policy periodically to stay informed about how 
                        we use cookies.
                      </p>
                    </div>
                  </section>

                  {/* 8. Contact Us */}
                  <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Contact Us</h2>
                    <div className="p-6 bg-gradient-to-r from-slate-50 to-white rounded-lg border border-slate-200">
                      <p className="text-slate-700 mb-4">
                        If you have any questions about our use of cookies or this Cookies Policy, 
                        please contact us:
                      </p>
                      <div className="space-y-2">
                        <p className="font-semibold text-slate-900">
                          Email: <a href="mailto:privacy@startupnortheast.com" className="text-blue-600 hover:text-blue-700">privacy@startupnortheast.com</a>
                        </p>
                        <p className="font-semibold text-slate-900">
                          Address: Guwahati, Assam, India - 781001
                        </p>
                      </div>
                    </div>
                  </section>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Footer Actions */}
          <div className="flex flex-col md:flex-row gap-6 justify-between items-center pt-8 border-t border-slate-200">
            <div className="text-sm text-slate-600">
              Your privacy preferences are important to us
            </div>
            <div className="flex gap-4">
              <Button variant="outline" asChild>
                <Link to="/privacy">Privacy Policy</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/terms">Terms of Service</Link>
              </Button>
              <Button className="bg-gradient-to-r from-purple-600 to-purple-800" onClick={savePreferences}>
                Save My Cookie Preferences
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}