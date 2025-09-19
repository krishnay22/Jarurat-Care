import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, Users, Shield, Clock } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Heart className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Welcome to <span className="text-primary">Jarurat Care</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Professional patient records management system designed for
            healthcare providers. Secure, efficient, and user-friendly patient
            data management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/patients">View Patients</Link>
            </Button>
            <Button asChild size="lg" className="text-lg px-8 bg-gray-400">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Patient Management</CardTitle>
              <CardDescription>
                Comprehensive patient records with easy search and filtering
                capabilities
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Secure & Compliant</CardTitle>
              <CardDescription>
                HIPAA-compliant security measures to protect sensitive patient
                information
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Real-time Access</CardTitle>
              <CardDescription>
                Instant access to patient records with real-time updates and
                synchronization
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center  rounded-lg p-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to streamline your patient management?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Join healthcare providers who trust Jarurat Care for their patient
            records management needs.
          </p>
          <Button asChild size="lg" className="text-lg px-8">
            <Link href="/patients">Get Started</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
