import jwtDecode from 'jwt-decode';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import UserInfo from '../models/userInfo';
import { apiService } from '../services/apiService';

type LoginFormInputs = {
    email: string;
    password: string;
};

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
        apiService.post('auth/login', data).then(({ token }) => {
            localStorage.setItem('jwt', token);
            const userInfo: UserInfo = jwtDecode<UserInfo>(token);
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            userInfo.role === 'admin' ? navigate('/admin/products')
                : navigate('/shop/products');
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form">
            <h1 className="form__title">Login</h1>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    {...register('email', { required: 'Email is required' })}
                />
                {errors.email && <span className="error-message">{errors.email.message}</span>}
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    {...register('password', { required: 'Password is required' })}
                />
                {errors.password && <span className="error-message">{errors.password.message}</span>}
            </div>
            <div className="btn-block">
                <button type="submit" className="btn">Login</button>
                <div>You're new? <Link to="/register">Register here.</Link></div>
            </div>

        </form>
    );
};

export default Login;