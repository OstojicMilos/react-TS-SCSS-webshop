import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { apiService } from '../services/apiService';

type RegisterFormInputs = {
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
};

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<RegisterFormInputs>();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<RegisterFormInputs> = (data) => {
        apiService.post('auth/register', data)
            .then(() => navigate('/login'))
            .catch(() => console.log('Registration failed'));
    };

    const password = watch('password', '');

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form">
            <h1 className="form__title">Register</h1>
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
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    {...register('name', { required: 'Name is required' })}
                />
                {errors.name && <span className="error-message">{errors.name.message}</span>}
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    {...register('password', {
                        required: 'Password is required',
                        minLength: {
                            value: 5,
                            message: 'Password must be at least 5 characters long',
                        },
                    })}
                />
                {errors.password && <span className="error-message">{errors.password.message}</span>}
            </div>
            <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    type="password"
                    id="confirmPassword"
                    {...register('confirmPassword', {
                        required: 'Please confirm your password',
                        validate: (value) =>
                            value === password || 'The passwords do not match',
                    })}
                />
                {errors.confirmPassword && (
                    <span className="error-message">{errors.confirmPassword.message}</span>
                )}
            </div>
            <div className="btn-block">
                <button type="submit" className="btn">Register</button>
                <div>You have an account? <Link to="/login">Login here.</Link></div>
            </div>
        </form>
    );
};

export default Register;