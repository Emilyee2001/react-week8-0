const baseUrl = import.meta.env.VITE_BASE_URL
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

import Toast from '../components/admin/toast'

import { showToast } from '../redux/slice/toastSlice'

function LoginPage() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  // 處理輸入帳號密碼
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // 處理登入
  const onSubmit = handleSubmit(({ username, password }) => {
    const account = {
      username,
      password
    }
    accountLogin(account);
  });

  // 登入API
  const accountLogin = async (account) => {
    setIsLoading(true);
    try {
      const res = await axios.post(`${baseUrl}/v2/admin/signin`, account)
      const { token, expired } = res.data;
      document.cookie = `eToken=${token}; expires=${new Date(expired)}`;
      axios.defaults.headers.common['Authorization'] = token;
      navigate('/admin');
    } catch (error) {
      dispatch(showToast({
        text: error.response.data.message,
        status: 'error'
      }))
    } finally {
      setIsLoading(false);
    }
  }

  const checkUserLogin = useCallback(async () => {
    setIsLoading(true);
    try {
      await axios.post(`${baseUrl}/v2/api/user/check`);
      navigate('/admin');
    } catch {
      console.error('請重新登入');
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);


  useEffect(() => {
    const authToken = document.cookie.replace(
      /(?:(?:^|.*;\s*)eToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1",
    );
    axios.defaults.headers.common['Authorization'] = authToken;
    checkUserLogin();
  }, [checkUserLogin]);

  return (<>
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="mb-5">請先登入</h1>
      <form onSubmit={onSubmit} className="d-flex flex-column gap-3">
        <div className="form-floating mb-3">
          <input
            {
            ...register('username', {
              required: '此欄位必填',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Email格式錯誤',
              }
            })
            }
            className={`form-control ${errors.username && 'is-invalid'}`}
            type="text" id="username" placeholder="name@example.com" name="username" />
          <label htmlFor="username">Email address</label>
        </div>
        <div className="form-floating">
          <input
            {
            ...register('password', {
              required: '此欄位必填',
            })
            }
            className={`form-control ${errors.password && 'is-invalid'}`}
            type="password" id="password" placeholder="Password" name="password" />
          <label htmlFor="password">Password</label>
        </div>
        <button className={`btn btn-primary ${isLoading && 'disabled'}`}>登入</button>
      </form>
      <p className="mt-5 mb-3 text-muted">&copy; 2024~∞ - 六角學院</p>
    </div>
    <Toast />
  </>)
}

export default LoginPage;