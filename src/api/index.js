const API_BASE_URL = process.env.NODE_ENV !== 'production' 
  ? import.meta.env.VITE_REACT_APP_API_URL
  : 'http://localhost:8000/api';

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

// Works API
export const fetchLatestWorks = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/v1/works-latest`);
        if (!response.ok) {
            throw new Error('Failed to fetch latest works');
        }
        const data = await response.json();
        return data.success ? data.data : [];
    } catch (error) {
        console.error('Error fetching works:', error);
        return [];
    }
};

// Work Detail API - Returns both work details and related works
export const fetchWorkDetail = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/v1/works-detail/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch work detail');
        }
        const data = await response.json();
        return data.success ? {
            work: data.data,
            relatedWorks: data.related_works || []
        } : { work: null, relatedWorks: [] };
    } catch (error) {
        console.error('Error fetching work detail:', error);
        throw error;
    }
};

// Related Works API
export const fetchRelatedWorks = async (id, options = {}) => {
    try {
        const params = new URLSearchParams();
        if (options.limit) params.append('limit', options.limit);
        if (options.sort_by) params.append('sort_by', options.sort_by);
        if (options.sort_direction) params.append('sort_direction', options.sort_direction);
        
        const queryString = params.toString();
        const url = `${API_BASE_URL}/v1/works-related/${id}${queryString ? `?${queryString}` : ''}`;
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch related works');
        }
        const data = await response.json();
        return data.success ? data.data : [];
    } catch (error) {
        console.error('Error fetching related works:', error);
        return [];
    }
};

// Works List API with filtering and pagination
export const fetchWorksList = async (filters = {}) => {
    try {
        const params = new URLSearchParams();
        
        // Add filters to query params
        if (filters.search) params.append('search', filters.search);
        if (filters.category) params.append('category', filters.category);
        if (filters.tags && filters.tags.length > 0) {
            filters.tags.forEach(tag => params.append('tags[]', tag));
        }
        if (filters.year) params.append('year', filters.year);
        if (filters.client) params.append('client', filters.client);
        if (filters.sort_by) params.append('sort_by', filters.sort_by);
        if (filters.sort_direction) params.append('sort_direction', filters.sort_direction);
        if (filters.page) params.append('page', filters.page);
        if (filters.per_page) params.append('per_page', filters.per_page);
        
        const queryString = params.toString();
        const url = `${API_BASE_URL}/v1/works-list${queryString ? `?${queryString}` : ''}`;
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch works list');
        }
        const data = await response.json();
        return data.success ? data : { data: [], meta: {}, filters: {}, applied_filters: {} };
    } catch (error) {
        console.error('Error fetching works list:', error);
        return { data: [], meta: {}, filters: {}, applied_filters: {} };
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

// New Contact Submissions API with reCAPTCHA
export const submitContactForm = async (formData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/contact-submissions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        
        const result = await response.json();
        
        if (!response.ok) {
            // Handle validation errors
            if (response.status === 422 && result.errors) {
                const error = new Error('Validation failed');
                error.errors = result.errors;
                error.status = 422;
                throw error;
            }
            
            // Handle other errors
            throw new Error(result.message || 'Failed to submit form');
        }
        
        return result;
    } catch (error) {
        console.error('Error submitting contact form:', error);
        throw error;
    }
};