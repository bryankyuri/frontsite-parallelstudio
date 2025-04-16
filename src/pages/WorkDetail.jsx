import React from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from '../styles/WorkDetail.module.scss';

const WorkDetail = () => {
  const { workId } = useParams();
  
  // Mock data - in a real app, you would fetch this based on the workId
  const work = {
    id: workId,
    title: 'Video Title',
    client: 'Client Name',
    credits: [
      { role: 'Director', name: 'Your Name' },
      { role: 'Producer', name: 'Your Name' },
      { role: 'DOP', name: 'Your Name' },
      { role: 'Colorist', name: 'Your Name' },
      { role: 'Visual Effect', name: 'Your Name' },
      { role: 'Motion Graphic', name: 'Your Name' }
    ],
    images: [
      '/path-to-image-1.jpg',
      '/path-to-image-2.jpg',
      '/path-to-image-3.jpg',
      '/path-to-image-4.jpg',
      '/path-to-image-5.jpg',
      '/path-to-image-6.jpg',
      '/path-to-image-7.jpg',
      '/path-to-image-8.jpg',
      '/path-to-image-9.jpg',
      '/path-to-image-10.jpg'
    ],
    relatedWorks: [
      {
        id: 1,
        title: 'Project 1',
        imageUrl: '/path-to-related-1.jpg',
        client: 'Client 1'
      },
      {
        id: 2,
        title: 'Project 2',
        imageUrl: '/path-to-related-2.jpg',
        client: 'Client 2'
      },
      {
        id: 3,
        title: 'Project 3',
        imageUrl: '/path-to-related-3.jpg',
        client: 'Client 3'
      }
    ]
  };

  return (
    <div className={styles.workDetail}>
      <div className="container mx-auto">
        {/* Main Image Grid */}
        <div className="grid grid-cols-1 gap-4 mb-16">
          {work.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Scene ${index + 1}`}
              className="w-full"
            />
          ))}
        </div>

        {/* Project Details */}
        <div className="mb-16">
          <div className="grid grid-cols-2 gap-8 border-t border-gray-200 py-4">
            <div>
              <span className="text-sm text-gray-500">CLIENT</span>
              <p>{work.client}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">TITLE</span>
              <p>{work.title}</p>
            </div>
          </div>

          {/* Credits */}
          <div className="border-t border-gray-200 py-4">
            <span className="text-sm text-gray-500">CREDITS</span>
            <div className="grid grid-cols-2 gap-8 mt-2">
              {work.credits.map((credit, index) => (
                <div key={index} className="flex justify-between">
                  <span>{credit.name}</span>
                  <span>{credit.role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* More Works */}
        <div className="mb-16">
          <h2 className="text-xl mb-8">MORE WORKS</h2>
          <div className="grid grid-cols-3 gap-8">
            {work.relatedWorks.map((related) => (
              <Link to={`/work/${related.id}`} key={related.id}>
                <div className="relative">
                  <img
                    src={related.imageUrl}
                    alt={related.title}
                    className="w-full aspect-video object-cover"
                  />
                  <div className="mt-2">
                    <p className="text-sm">{related.client} / {related.title}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkDetail;