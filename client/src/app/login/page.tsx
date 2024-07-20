import dynamic from 'next/dynamic'

const LogInModule = dynamic(() => import('@/modules/auth/pages/Login'))

export default function LoginPage() {
    return <LogInModule />
}
