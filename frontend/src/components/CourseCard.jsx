import React from 'react';

const CourseCard = ({ course, onEnroll }) => {
  return (
    <div style={{
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      overflow: 'hidden',
      backgroundColor: 'white',
      boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
      transition: 'transform 0.2s',
      height: '100%'
    }}
    onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
    onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      {/* Course Image Placeholder */}
      <div style={{
        height: '160px',
        background: 'linear-gradient(135deg, #1e40af, #3b82f6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '14px'
      }}>
        Course Image
      </div>

      <div style={{ padding: '20px' }}>
        <div style={{
          backgroundColor: '#e0f2fe',
          color: '#0369a1',
          padding: '4px 12px',
          borderRadius: '20px',
          display: 'inline-block',
          fontSize: '13px',
          marginBottom: '12px'
        }}>
          {course.category}
        </div>

        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', lineHeight: '1.3' }}>
          {course.title}
        </h3>

        <p style={{ 
          color: '#6b7280', 
          fontSize: '14px', 
          lineHeight: '1.5',
          marginBottom: '20px',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {course.description}
        </p>

        <button 
          onClick={() => onEnroll(course._id)}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#1e40af',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Enroll Now
        </button>
      </div>
    </div>
  );
};

export default CourseCard;