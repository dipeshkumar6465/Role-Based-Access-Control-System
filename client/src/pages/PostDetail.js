import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button, Card, Container, Alert } from 'react-bootstrap';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/posts/${id}`);
        setPost(response.data);
      } catch (err) {
        console.error(err);
        setError('Post not found');
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    try {
      await api.delete(`/posts/${id}`);
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Failed to delete post');
    }
  };

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!post) {
    return <Container className="mt-4">Loading...</Container>;
  }

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Text>{post.content}</Card.Text>
          <Card.Text className="text-muted">
            Author: {post.author?.name || 'Unknown'}
          </Card.Text>
          <div className="d-flex gap-2">
            <Link to="/" className="btn btn-secondary">
              Back
            </Link>
            {user && (user.role === 'admin' || user._id === post.author?._id) && (
              <>
                <Link to={`/posts/${post._id}/edit`} className="btn btn-primary">
                  Edit
                </Link>
                <Button variant="danger" onClick={handleDelete}>
                  Delete
                </Button>
              </>
            )}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PostDetail;