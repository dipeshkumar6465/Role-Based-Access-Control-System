import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Alert, Card, Container, FormCheck } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Required'),
  });

 const onSubmit = async (values, { setSubmitting }) => {
  try {
    const result = await register(
      values.name,
      values.email,
      values.password,
      values.role
    );
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message || 'Registration failed');
    }
  } catch (err) {
    console.error('Registration error:', err);
    setError('An unexpected error occurred during registration');
  } finally {
    setSubmitting(false);
  }
};
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '400px' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Register</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting, values }) => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <Field type="text" name="name" className="form-control" />
                  <ErrorMessage name="name" component="div" className="text-danger" />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <Field type="email" name="email" className="form-control" />
                  <ErrorMessage name="email" component="div" className="text-danger" />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <Field type="password" name="password" className="form-control" />
                  <ErrorMessage name="password" component="div" className="text-danger" />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <Field type="password" name="confirmPassword" className="form-control" />
                  <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                </div>
                <div className="mb-3">
                  <FormCheck
                    type="switch"
                    id="role-switch"
                    label="Register as admin"
                    checked={values.role === 'admin'}
                    onChange={(e) => {
                      values.role = e.target.checked ? 'admin' : 'user';
                    }}
                  />
                </div>
                <Button type="submit" disabled={isSubmitting} className="w-100">
                  {isSubmitting ? 'Registering...' : 'Register'}
                </Button>
              </Form>
            )}
          </Formik>
          <div className="text-center mt-3">
            Already have an account? <a href="/login">Login</a>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;