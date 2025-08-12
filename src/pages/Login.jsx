"use client"

import { useState } from "react"
import { LoginForm } from "@/components/login-form"

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" })

  const handleSubmit = (data) => {
    console.log("Login data submitted:", data)
    // 🔹 Example: call your API here
    // fetch("/api/login", { method: "POST", body: JSON.stringify(data) })
  }

  return (
    <div className="flex w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}
