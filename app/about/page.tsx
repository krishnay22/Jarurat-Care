import { Navigation } from "@/components/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, Shield, Users, Clock, Award, Globe } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Heart className="h-16 w-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            About <span className="text-primary">Jarurat Care</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            We are dedicated to revolutionizing healthcare management through
            innovative technology solutions that prioritize patient care, data
            security, and healthcare provider efficiency.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">
            Our Mission
          </h2>
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8">
              <p className="text-lg text-muted-foreground text-center leading-relaxed">
                To empower healthcare providers with cutting-edge patient
                management solutions that enhance care quality, streamline
                operations, and ensure the highest standards of data security
                and compliance.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Our Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Security First</CardTitle>
                <CardDescription>
                  HIPAA-compliant security measures protect sensitive patient
                  data with enterprise-grade encryption
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Patient-Centered</CardTitle>
                <CardDescription>
                  Every feature is designed with patient care and healthcare
                  provider efficiency in mind
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Real-Time Access</CardTitle>
                <CardDescription>
                  Instant access to patient records with real-time
                  synchronization across all devices
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Excellence</CardTitle>
                <CardDescription>
                  Committed to delivering the highest quality healthcare
                  management solutions
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Accessibility</CardTitle>
                <CardDescription>
                  Designed to be accessible and user-friendly for healthcare
                  providers of all technical levels
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Compassion</CardTitle>
                <CardDescription>
                  Technology solutions built with empathy and understanding of
                  healthcare challenges
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Platform Features
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">
                Patient Management
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Comprehensive patient profiles with medical history</li>
                <li>• Advanced search and filtering capabilities</li>
                <li>• Real-time patient data synchronization</li>
                <li>• Secure document and image storage</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">
                Security & Compliance
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• HIPAA-compliant data handling</li>
                <li>• End-to-end encryption</li>
                <li>• Audit trails and access logging</li>
                <li>• Role-based access control</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">
                User Experience
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Intuitive and responsive design</li>
                <li>• Mobile-first approach</li>
                <li>• Customizable dashboards</li>
                <li>• Offline capability</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">
                Integration
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• EMR/EHR system integration</li>
                <li>• API-first architecture</li>
                <li>• Third-party service compatibility</li>
                <li>• Data import/export capabilities</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center shadow-blue-100 shadow-sm rounded-lg p-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Get in Touch
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Ready to transform your healthcare practice? Contact us to learn
            more about how Jarurat Care can help streamline your patient
            management processes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="text-sm text-muted-foreground">
              <strong>Email:</strong> contact@jaruratcare.com
            </div>
            <div className="text-sm text-muted-foreground">
              <strong>Phone:</strong> +1 (555) 000-CARE
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
