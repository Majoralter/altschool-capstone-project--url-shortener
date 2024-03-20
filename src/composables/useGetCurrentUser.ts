import { supabase } from "@/lib/supabaseClient"

export const useGetCurrentUser = async () => {
    let currentUser;

    await supabase.auth.getUser()
    .then((res) => currentUser = res.data.user)
    .catch((error) => console.error(error.message))

    return currentUser
}