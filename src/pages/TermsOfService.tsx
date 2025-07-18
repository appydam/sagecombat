
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ScrollText, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const TermsOfService = () => {
  const lastUpdated = "March 15, 2023";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <Link to="/">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div className="text-sm text-muted-foreground">
                Last Updated: {lastUpdated}
              </div>
            </div>

            <div className="flex items-center mb-8">
              <ScrollText className="h-10 w-10 text-primary mr-4" />
              <h1 className="font-display text-4xl font-bold">Terms of Service</h1>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="lead">
                Welcome to SageCombat. By accessing or using our platform, you agree to be bound by these Terms of Service. Please read these terms carefully before using SageCombat.
              </p>

              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing or using SageCombat, you agree to be bound by these Terms of Service, our Privacy Policy, and any additional terms that may apply. If you do not agree to these terms, please do not use SageCombat.
              </p>

              <h2>2. Eligibility</h2>
              <p>
                You must be at least 18 years old to use SageCombat. By using SageCombat, you represent and warrant that you are at least 18 years old and have the legal capacity to enter into these terms.
              </p>
              <p>
                SageCombat is available only in jurisdictions where competitive skill-based gaming is legal as per rules of skill based gaming given by supreme court of India. It is your responsibility to determine whether your use of SageCombat complies with applicable laws in your jurisdiction.
              </p>

              <h2>3. User Accounts</h2>
              <p>
                To use certain features of SageCombat, you must create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
              </p>
              <p>
                You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
              </p>
              <p>
                We reserve the right to suspend or terminate your account if any information provided during the registration process or thereafter proves to be inaccurate, not current, or incomplete.
              </p>

              <h2>4. User Conduct</h2>
              <p>
                You agree not to:
              </p>
              <ul>
                <li>Use SageCombat for any illegal purpose or in violation of any laws</li>
                <li>Manipulate or attempt to manipulate competitions or leaderboards</li>
                <li>Use multiple accounts to gain unfair advantages</li>
                <li>Engage in any activity that interferes with or disrupts SageCombat</li>
                <li>Attempt to access areas of SageCombat that you are not authorized to access</li>
                <li>Harass, threaten, or intimidate other users</li>
                <li>Post or transmit any content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable</li>
              </ul>

              <h2>5. Competitions and Prizes</h2>
              <p>
                SageCombat offers various competitions with virtual currency and real-money prizes. Entry fees and prize distributions for each competition are clearly stated in the competition details.
              </p>
              <p>
                We reserve the right to cancel, modify, or suspend any competition at our sole discretion. In the event of a cancellation, entry fees will be refunded to participants.
              </p>
              <p>
                Prizes are awarded based on the final rankings at the conclusion of each competition. All decisions regarding competition results and prize distributions are final.
              </p>

              <h2>6. Deposits and Withdrawals</h2>
              <p>
                You may deposit funds into your SageCombat account using the available payment methods. All deposits must be made using funds that belong to you.
              </p>
              <p>
                Withdrawal requests are processed within 1-3 business days. We reserve the right to request additional verification information before processing withdrawals.
              </p>
              <p>
                We reserve the right to withhold withdrawals if we suspect fraudulent activity or violations of these Terms of Service.
              </p>

              <h2>7. Intellectual Property</h2>
              <p>
                All content, features, and functionality of SageCombat, including but not limited to text, graphics, logos, and software, are owned by SageCombat or its licensors and are protected by copyright, trademark, and other intellectual property laws.
              </p>
              <p>
                You are granted a limited, non-exclusive, non-transferable license to access and use SageCombat for your personal, non-commercial use.
              </p>

              <h2>8. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by applicable law, SageCombat and its affiliates, officers, employees, agents, partners, and licensors shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, or goodwill, arising out of or in connection with your use of SageCombat.
              </p>

              <h2>9. Disclaimer of Warranties</h2>
              <p>
                SageCombat is provided on an "as is" and "as available" basis. SageCombat makes no warranties, expressed or implied, regarding the reliability, availability, timeliness, or accuracy of SageCombat or its content.
              </p>

              <h2>10. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms of Service at any time. We will provide notice of significant changes by posting the new Terms of Service on SageCombat and updating the "Last Updated" date.
              </p>
              <p>
                Your continued use of SageCombat after any changes to these Terms of Service constitutes your acceptance of the revised terms.
              </p>

              <h2>11. Governing Law</h2>
              <p>
                These Terms of Service shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
              </p>

              <h2>12. Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <p>
                <strong>Email:</strong> support@SageCombat.com<br />
                <strong>Address:</strong> SageCombat Headquarters, 123 Trading Street, Bangalore, Karnataka, India
              </p>
            </div>

            <div className="mt-10 border-t border-border pt-6">
              <div className="flex justify-between items-center">
                <Link to="/privacy">
                  <Button variant="outline">View Privacy Policy</Button>
                </Link>
                <Link to="/help">
                  <Button variant="outline">Help Center</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfService;
