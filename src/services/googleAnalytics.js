// Simple Google Analytics service for basic visitor tracking
class GoogleAnalyticsService {
  constructor() {
    this.GA_MEASUREMENT_ID = 'G-Q59D8YQ7NF';
    this.isInitialized = false;
    this.init();
  }

  // Initialize Google Analytics
  init() {
    if (typeof window !== 'undefined' && window.gtag) {
      this.isInitialized = true;
      console.log('Google Analytics initialized for basic tracking');
    }
  }

  // Track page views (basic tracking only)
  trackPageView(path, title) {
    if (!this.isInitialized || typeof window === 'undefined' || !window.gtag) {
      return;
    }

    window.gtag('config', this.GA_MEASUREMENT_ID, {
      page_path: path,
      page_title: title,
    });
  }
}

// Export singleton instance
export default new GoogleAnalyticsService();