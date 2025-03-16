"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useSupabase } from "@/components/providers"
import { PersonalIntro } from "@/app/components/personal-intro"
import { PathwaySelection } from "@/app/components/pathway-selection"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Eye, EyeOff, CheckCircle2, Circle, ArrowLeft, ArrowRight, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

function getPasswordStrength(password: string): number {
  let strength = 0
  if (password.length >= 8) strength++
  if (/[A-Z]/.test(password)) strength++
  if (/[a-z]/.test(password)) strength++
  if (/[0-9]/.test(password)) strength++
  if (/[^A-Za-z0-9]/.test(password)) strength++
  return Math.min(4, strength)
}

const signupSchema = z.object({
  // Step 1: Basic Info
  email: z.string().email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  confirmPassword: z.string(),

  // Step 2: Personal Details
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  username: z.string()
    .min(3, "Username must be at least 3 characters")
    .regex(/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, numbers, underscores, and hyphens"),

  // Step 3: Pathway Selection
  pathway: z.enum(["ascender", "neothinker", "immortal"]),

  // Step 4: Profile Completion
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
  interests: z.array(z.string()).optional(),
  goals: z.array(z.string()).optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

type SignupFormData = z.infer<typeof signupSchema>

const formSteps = [
  {
    title: "Create Account",
    description: "Start your journey with Neothink+",
    fields: ["email", "password", "confirmPassword"]
  },
  {
    title: "Personal Details",
    description: "Tell us a bit about yourself",
    fields: ["firstName", "lastName", "username"]
  },
  {
    title: "Choose Your Path",
    description: "Select your primary pathway",
    fields: ["pathway"]
  },
  {
    title: "Complete Profile",
    description: "Share your goals and interests",
    fields: ["bio", "interests", "goals"]
  }
]

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950">
      <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-black" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Sparkles className="mr-2 h-6 w-6" />
            Neothink+
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                "Neothink+ has transformed my life in ways I never imagined possible. The community and knowledge sharing are invaluable."
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
          
          {/* Background pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#1c1c1c_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
          
          {/* Gradient effects */}
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-orange-500/10 to-red-500/10" />
        </div>
        <div className="lg:p-8">
          <SignupContent />
        </div>
      </div>
    </div>
  )
}

function SignupContent() {
  const router = useRouter()
  const { supabase } = useSupabase()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [personalData, setPersonalData] = useState<{ story: string; goals: string[] } | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onChange"
  })

  const validateCurrentStep = async () => {
    const fields = formSteps[currentStep - 1].fields
    const result = await trigger(fields as any)
    return result
  }

  const handleNext = async () => {
    const isStepValid = await validateCurrentStep()
    if (isStepValid) {
      setCurrentStep((prev) => Math.min(prev + 1, formSteps.length))
    }
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const onSubmit = async (data: SignupFormData) => {
    try {
      setIsLoading(true)

      // Create user account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
            username: data.username,
          },
        },
      })

      if (authError) throw authError

      // Create profile
      const { error: profileError } = await supabase
        .from("profiles")
        .insert([
          {
            id: authData.user?.id,
            first_name: data.firstName,
            last_name: data.lastName,
            username: data.username,
            pathway: data.pathway,
            bio: data.bio,
            interests: data.interests,
            goals: personalData?.goals || [],
            story: personalData?.story || "",
            onboarding_completed: true,
          },
        ])

      if (profileError) throw profileError

      toast.success("Account created successfully! Please check your email to verify your account.")
      router.push("/auth/verify")
    } catch (error: any) {
      console.error("Signup error:", error)
      toast.error("An error occurred during signup. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const renderFormStep = () => {
    const step = formSteps[currentStep - 1]
    
    return (
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <div className="text-center">
          <motion.h3 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100"
          >
            {step.title}
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-2 text-zinc-600 dark:text-zinc-400"
          >
            {step.description}
          </motion.p>
        </div>

        <div className="space-y-4">
          {currentStep === 1 && (
            <>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-2"
              >
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...register("email")}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-red-500"
                  >
                    {errors.email.message}
                  </motion.p>
                )}
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-2"
              >
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    {...register("password")}
                    className={errors.password ? "border-red-500" : ""}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {watch("password") && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-2"
                  >
                    <div className="flex gap-1">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ delay: 0.1 * i }}
                          className={`h-1 flex-1 rounded-full transition-all ${
                            getPasswordStrength(watch("password")) > i
                              ? "bg-gradient-to-r from-amber-500 via-orange-500 to-red-500"
                              : "bg-zinc-200 dark:bg-zinc-700"
                          }`}
                        />
                      ))}
                    </div>
                    <ul className="space-y-1 text-sm">
                      {[
                        { check: /[A-Z]/, text: "One uppercase letter" },
                        { check: /[a-z]/, text: "One lowercase letter" },
                        { check: /[0-9]/, text: "One number" },
                        { check: /[^A-Za-z0-9]/, text: "One special character" },
                        { check: /.{8,}/, text: "At least 8 characters" }
                      ].map(({ check, text }) => (
                        <motion.li
                          key={text}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                          className={`flex items-center space-x-2 ${
                            check.test(watch("password"))
                              ? "text-green-500 dark:text-green-400"
                              : "text-zinc-500 dark:text-zinc-400"
                          }`}
                        >
                          {check.test(watch("password")) ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : (
                            <Circle className="h-4 w-4" />
                          )}
                          <span>{text}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
                {errors.password && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-red-500"
                  >
                    {errors.password.message}
                  </motion.p>
                )}
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-2"
              >
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  {...register("confirmPassword")}
                  className={errors.confirmPassword ? "border-red-500" : ""}
                />
                {errors.confirmPassword && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-red-500"
                  >
                    {errors.confirmPassword.message}
                  </motion.p>
                )}
              </motion.div>
            </>
          )}

          {currentStep === 2 && (
            <>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-2"
              >
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="Enter your first name"
                  {...register("firstName")}
                  className={errors.firstName ? "border-red-500" : ""}
                />
                {errors.firstName && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-red-500"
                  >
                    {errors.firstName.message}
                  </motion.p>
                )}
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-2"
              >
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Enter your last name"
                  {...register("lastName")}
                  className={errors.lastName ? "border-red-500" : ""}
                />
                {errors.lastName && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-red-500"
                  >
                    {errors.lastName.message}
                  </motion.p>
                )}
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-2"
              >
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Choose a username"
                  {...register("username")}
                  className={errors.username ? "border-red-500" : ""}
                />
                {errors.username && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-red-500"
                  >
                    {errors.username.message}
                  </motion.p>
                )}
              </motion.div>
            </>
          )}

          {currentStep === 3 && (
            <PathwaySelection
              selectedPathway={watch("pathway")}
              onSelect={(pathway) => setValue("pathway", pathway)}
              error={errors.pathway?.message}
            />
          )}

          {currentStep === 4 && (
            <PersonalIntro
              onComplete={(data) => {
                setPersonalData(data)
                handleSubmit(onSubmit)()
              }}
            />
          )}
        </div>

        <div className="flex justify-between space-x-4">
          {currentStep > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={isLoading}
              className="w-full"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          )}
          
          {currentStep < formSteps.length ? (
            <Button
              type="button"
              onClick={handleNext}
              disabled={isLoading}
              className="w-full"
            >
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Creating Account...
                </>
              ) : (
                <>
                  Complete Signup
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center space-x-2">
          {formSteps.map((_, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`h-2 w-2 rounded-full transition-colors ${
                index + 1 === currentStep
                  ? "bg-gradient-to-r from-amber-500 via-orange-500 to-red-500"
                  : index + 1 < currentStep
                  ? "bg-orange-500"
                  : "bg-zinc-200 dark:bg-zinc-700"
              }`}
            />
          ))}
        </div>
      </motion.div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-lg space-y-6">
      <AnimatePresence mode="wait">
        {renderFormStep()}
      </AnimatePresence>
    </div>
  )
}
