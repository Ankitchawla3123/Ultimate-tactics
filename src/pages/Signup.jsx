import React from "react"
import { SignupForm } from "../components/SignupForm"

export default function Signup() {
  const [formData, setFormData] = React.useState({
    username: "",
    email: "",
    password: "",
  })

  const handleSignup = (data) => {
    console.log("Signup data:", data)
  }

  return (
    
    <div className="flex w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSignup}
        />
      </div>
    </div>
  )
}
