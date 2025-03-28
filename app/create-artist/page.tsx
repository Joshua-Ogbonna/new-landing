/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useRef } from "react";
import Link from "next/link";
// import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";
import CloudinaryService from "@/services/cloudinary.services";

export default function SignUp() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string>("");
  const [formData, setFormData] = useState({
    // User registration data
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    // Artist profile data
    artistName: "",
    bio: "",
    image: "",
    instagram: "",
    twitter: "",
    link: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      setError("");
      const imageUrl = await CloudinaryService.uploadFile(file, 'image');
      setUploadedImage(imageUrl);
      setFormData({ ...formData, image: imageUrl });
    } catch (err: any) {
      setError(err.message || "Failed to upload image");
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("All fields are required");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }

    return true;
  };

  const handleSubmitUserDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('this is the request');
    
    if (!validateForm()) return;

    try {
      setLoading(true);
      setError("");

      const response = await fetch(`https://mysounduk-service.com/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          user_type: "artist",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      localStorage.setItem("userId", data?.data?.id);
      setStep(2);
    } catch (err: any) {
      setError(err.message || "An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitArtistProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.artistName) {
      setError("Artist/Band name is required");
      return;
    }

    if (!formData.image) {
      setError("Profile image is required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("User ID not found");
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/artist/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          name: formData.artistName,
          bio: formData.bio,
          image: formData.image,
          instagram: formData.instagram,
          twitter: formData.twitter,
          link: formData.link,
        }),
      });

      const data = await response.json();
        console.log(data);
        
      if (!response.ok) {
        throw new Error(data.message || "Failed to create artist profile");
      }

      localStorage.removeItem("userId");
      router.push("/signin");
    } catch (err: any) {
      setError(err.message || "An error occurred while creating artist profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* <Navbar
        background="#000000"
        color="text-[#515151]"
        hoverColor="#C2EE03"
        logo="/brl.png"
      /> */}
      <div className="max-w-[1400px] mx-auto px-6 py-20">
        <div className="max-w-md mx-auto bg-[#1F1F1F] rounded-xl p-8">
          <h1 className="text-4xl font-bold text-[#C2EE03] mb-8 text-center">
            {step === 1 ? "Create Account" : "Complete Artist Profile"}
          </h1>

          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500 rounded-lg">
              <p className="text-red-500 text-sm text-center">{error}</p>
            </div>
          )}

          {step === 1 ? (
            <form className="space-y-6" onSubmit={handleSubmitUserDetails}>
              <div>
                <label htmlFor="name" className="block text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-[#313133] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2EE03]"
                  placeholder="Enter your full name"
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-[#313133] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2EE03]"
                  placeholder="Enter your email"
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-[#313133] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2EE03]"
                  placeholder="Enter your password"
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-gray-300 mb-2"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-[#313133] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2EE03]"
                  placeholder="Confirm your password"
                  required
                  disabled={loading}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#C2EE03] text-black py-3 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Continue"}
              </button>
            </form>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmitArtistProfile}>
              <div>
                <label
                  htmlFor="artistName"
                  className="block text-gray-300 mb-2"
                >
                  Artist/Band Name
                </label>
                <input
                  type="text"
                  id="artistName"
                  name="artistName"
                  value={formData.artistName}
                  onChange={handleChange}
                  className="w-full bg-[#313133] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2EE03]"
                  placeholder="Enter your artist name"
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label htmlFor="image" className="block text-gray-300 mb-2">
                  Profile Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                  disabled={loading}
                />
                <div className="flex flex-col items-center space-y-4">
                  {uploadedImage && (
                    <img
                      src={uploadedImage}
                      alt="Profile Preview"
                      className="w-32 h-32 object-cover rounded-full"
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-[#313133] text-white rounded-lg hover:bg-[#414143] transition-colors disabled:opacity-50"
                    disabled={loading}
                  >
                    {loading ? "Uploading..." : uploadedImage ? "Change Image" : "Upload Image"}
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="bio" className="block text-gray-300 mb-2">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full bg-[#313133] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2EE03]"
                  placeholder="Tell us about yourself"
                  rows={4}
                  disabled={loading}
                />
              </div>
              <div>
                <label htmlFor="instagram" className="block text-gray-300 mb-2">
                  Instagram Handle
                </label>
                <input
                  type="text"
                  id="instagram"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleChange}
                  className="w-full bg-[#313133] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2EE03]"
                  placeholder="@yourusername"
                  disabled={loading}
                />
              </div>
              <div>
                <label htmlFor="twitter" className="block text-gray-300 mb-2">
                  Twitter Handle
                </label>
                <input
                  type="text"
                  id="twitter"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleChange}
                  className="w-full bg-[#313133] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2EE03]"
                  placeholder="@yourusername"
                  disabled={loading}
                />
              </div>
              <div>
                <label htmlFor="link" className="block text-gray-300 mb-2">
                  Website
                </label>
                <input
                  type="url"
                  id="link"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  className="w-full bg-[#313133] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2EE03]"
                  placeholder="https://yourwebsite.com"
                  disabled={loading}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#C2EE03] text-black py-3 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Creating Profile..." : "Complete Registration"}
              </button>
            </form>
          )}

          <p className="text-gray-400 text-center mt-6">
            Already have an account?{" "}
            <Link href="/signin" className="text-[#C2EE03] hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}