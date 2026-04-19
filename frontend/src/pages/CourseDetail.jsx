import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    api.get(`/courses/${id}`)
      .then(res => setCourse(res.data))
      .catch(() => navigate('/courses'));
  }, [id]);

  const handleEnroll = async () => {
    try {
      await api.post(`/enroll/${id}`);
      alert('🎉 Enrolled! Check My Courses');
      navigate('/my-courses');
    } catch (err) {
      alert('Already enrolled or error occurred');
    }
  };

  if (!course) return <div>Loading course...</div>;

  return (
    <Container maxW="1200px" py={10}>
      <Box bg="white" borderRadius="2xl" p={10} boxShadow="2xl">
        <Badge colorScheme="purple" mb={4}>{course.category}</Badge>
        <Heading size="2xl" mb={4}>{course.title}</Heading>
        <Text fontSize="lg" color="gray.600" mb={8}>{course.description}</Text>

        <HStack>
          <Button colorScheme="blue" size="lg" onClick={handleEnroll}>
            Enroll Now - Free
          </Button>
          <Button variant="outline" size="lg" onClick={() => navigate('/courses')}>
            Back to Courses
          </Button>
        </HStack>
      </Box>
    </Container>
  );
};

export default CourseDetail;