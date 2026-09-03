import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const path = request.nextUrl.pathname

  // ১. প্রোটেক্টেড পথের জন্য লগইন চেক
  if (path.startsWith('/dashboard') || path.startsWith('/super-admin')) {
    const { data: { user } } = await supabase.auth.getUser()

    // লগইন না থাকলে → /login এ পাঠান
    if (!user) {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }

    // ২. Super Admin প্যানেল → শুধু Super Admin
    if (path.startsWith('/super-admin')) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      // role 'super_admin' না হলে → /dashboard এ পাঠান
      if (profile?.role !== 'super_admin') {
        const url = request.nextUrl.clone()
        url.pathname = '/dashboard'
        return NextResponse.redirect(url)
      }
    }

    // ৩. Dashboard প্যানেল → Admin বা Super Admin
    if (path.startsWith('/dashboard')) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      // রোল না থাকলে বা ভুল হলে → /login এ পাঠান
      if (!profile || (profile.role !== 'admin' && profile.role !== 'super_admin')) {
        const url = request.nextUrl.clone()
        url.pathname = '/login'
        return NextResponse.redirect(url)
      }
    }
  }

  // লগইন পেজ বা পাবলিক পেজে কোনো ইন্টারফেরেন্স করবে না
  return supabaseResponse
}

export const config = {
  matcher: ['/dashboard/:path*', '/super-admin/:path*'],
}
