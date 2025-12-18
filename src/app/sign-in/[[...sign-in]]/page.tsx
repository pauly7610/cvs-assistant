import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cvs-surface">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-cvs-red">CVS Care Companion</h1>
          <p className="text-sm text-gray-600 mt-2">Sign in to access your health dashboard</p>
        </div>
        <SignIn 
          appearance={{
            elements: {
              formButtonPrimary: "bg-cvs-red hover:bg-cvs-red/90",
              footerActionLink: "text-cvs-red hover:text-cvs-red/80",
            },
          }}
        />
      </div>
    </div>
  );
}
