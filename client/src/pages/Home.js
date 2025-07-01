import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts');
        setPosts(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      setPosts(posts.filter(post => post._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Blog Posts</h1>
        {user && (
          <Link to="/posts/new">
            <Button variant="primary">Create Post</Button>
          </Link>
        )}
      </div>
      <Row>
        {posts.map(post => (
          <Col key={post._id} md={6} lg={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.content.substring(0, 100)}...</Card.Text>
                <Card.Text className="text-muted">
                  Author: {post.author?.name || 'Unknown'}
                </Card.Text>
                <Link to={`/posts/${post._id}`} className="btn btn-secondary me-2">
                  View
                </Link>
                {user && (user.role === 'admin' || user._id === post.author?._id) && (
                  <>
                    <Link to={`/posts/${post._id}/edit`} className="btn btn-primary me-2">
                      Edit
                    </Link>
                    <Button variant="danger" onClick={() => handleDelete(post._id)}>
                      Delete
                    </Button>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;