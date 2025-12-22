// src/components/AdminRoute.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";

export function AdminRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      // Get current user
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) return navigate("/login");

      // Fetch role from your users table
      const { data, error: roleError } = await supabase
        .from("users")
        .select("role")
        .eq("id", user.id)
        .single();

      if (roleError || data.role !== "admin") {
        navigate("/"); // redirect non-admins
      } else {
        setIsAdmin(true);
      }
      setLoading(false);
    };

    checkAdmin();
  }, [navigate]);

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return isAdmin ? children : null;
}
