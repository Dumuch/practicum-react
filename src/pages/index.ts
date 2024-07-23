export {default as MainPage} from './main/main'
export {default as LoginPage} from './login/login'
export {default as RegisterPage} from './register/register'
export {default as ForgotPasswordPage} from './forgot-password/forgot-password'
export {default as ResetPasswordPage} from './reset-password/reset-password'
export {default as ProfilePage} from './profile/profile'
export {default as IngredientsPage} from './ingredients/ingredients'
export {default as NotFound404Page} from './not-found/not-found'
export {default as FeedPage} from './feed/feed'
export {default as FeedDetailsPage} from './feed-details/feed-details'


export const routes = {
    main: '/',
    login: '/login',
    register: '/register',
    forgotPassword: '/forgot-password',
    resetPassword: '/reset-password',
    profile: {
        main: '/profile',
        orders: 'orders'
    },
    ingredients: '/ingredients',
    feed: '/feed',
}