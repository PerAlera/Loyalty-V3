import { createClient } from "./supabase";
import prisma from "./prisma";

export async function getServerSession() {
  const supabase = await createClient();
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error || !session?.user) {
    return null;
  }
  
  // session.user.id is the Supabase Auth UUID which is mapped to our public.User.id
  const user = await prisma.user.findUnique({
    where: { id: session.user.id }
  });
  
  if (!user) return null;
  
  return {
    user: {
      id: user.id,
      role: user.role,
      name: user.name,
      surname: user.surname,
      phone: user.phone,
      businessId: user.businessId
    }
  };
}
