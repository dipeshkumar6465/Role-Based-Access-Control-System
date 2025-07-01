import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Alert, Card, Container } from 'react-bootstrap';
import api from '../api/axios';

const PostForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [initialValues, setInitialValues] = useState({
    title: '',
    content: '',
  });

  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit) {
      const fetchPost = async () => {
        try {
          const response = await api.get(`/posts/${id}`);
          setInitialValues({
            title: response.data.title,
            content: response.data.content,
          });
        } catch (err) {
          console.error(err);
          navigate('/');
        }
      };
      fetchPost();
    }
  }, [id, isEdit, navigate]);

  const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
    content: Yup.string().required('Required'),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      if (isEdit) {
        await api.put(`/posts/${id}`, values);
      } else {
        await api.post('/posts', values);
      }
      navigate('/');
    } catch (err) {
      setError('Failed to save post');
      setSubmitting(false);
    }
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">{isEdit ? 'Edit Post' : 'Create Post'}</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <Field type="text" name="title" className="form-control" />
                  <ErrorMessage name="title" component="div" className="text-danger" />
                </div>
                <div className="mb-3">
                  <label htmlFor="content" className="form-label">Content</label>
                  <Field as="textarea" name="content" className="form-control" rows={5} />
                  <ErrorMessage name="content" component="div" className="text-danger" />
                </div>
                <Button type="submit" disabled={isSubmitting} className="me-2">
                  {isSubmitting ? 'Saving...' : 'Save'}
                </Button>
                <Button variant="secondary" onClick={() => navigate('/')}>
                  Cancel
                </Button>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PostForm;