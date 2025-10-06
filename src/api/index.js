const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? import.meta.env.VITE_REACT_APP_API_URL
  : 'http://127.0.0.1:8000/api';

export const fetchData = async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export const postData = async (endpoint, data) => {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

// Video Banners API
export const fetchVideoBanners = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/v1/video-banners`);
        if (!response.ok) {
            throw new Error('Failed to fetch video banners');
        }
        const data = await response.json();
        return data.success ? data.data : [];
    } catch (error) {
        console.error('Error fetching video banners:', error);
        return [];
    }
};

// Works API
export const fetchWorks = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/v1/works`);
        if (!response.ok) {
            throw new Error('Failed to fetch works');
        }
        const data = await response.json();
        return data.success ? data.data : [];
    } catch (error) {
        console.error('Error fetching works:', error);
        return [];
    }
};

// Contact API
export const submitContact = async (contactData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/v1/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contactData),
        });
        
        if (!response.ok) {
            throw new Error('Failed to submit contact form');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error submitting contact form:', error);
        throw error;
    }
};