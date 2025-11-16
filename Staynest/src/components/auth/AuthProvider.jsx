import React, { createContext, useState, useContext } from "react"
import { jwtDecode } from "jwt-decode" 

// Create context with default structure
export const AuthContext = createContext({
  user: null,
  handleLogin: () => {},
  handleLogout: () => {},
})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const handleLogin = (token) => {
    try {
      const decodedUser = jwtDecode(token)
      localStorage.setItem("userId", decodedUser.sub)
      localStorage.setItem("userRole", decodedUser.roles)
      localStorage.setItem("token", token)
      setUser(decodedUser)
    } catch (error) {
      console.error("Invalid JWT token:", error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("userId")
    localStorage.removeItem("userRole")
    localStorage.removeItem("token")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use auth context
export const useAuth = () => {
  return useContext(AuthContext)
}
